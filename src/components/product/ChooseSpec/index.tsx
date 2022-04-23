import { ProductDetailProps, SkuItemProps, SpecDetail, SpecProps } from '@/framework/types/products'
import { View, Image, Text } from '@tarojs/components'
import { AtFloatLayout, AtInputNumber } from 'taro-ui'
import cloneDeep from 'lodash.cloneDeep'
import { addToTypeEnum } from '@/framework/types/common'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { SelectedProps } from '@/pages/packageA/productDetail'
import './index.less'
import { formatMoney } from '@/utils/utils'
import { createCart } from '@/framework/api/cart/cart'
import { getProductBySkuId } from '@/framework/api/product/get-product'
import { normalizeCartData } from '@/framework/api/lib/normalize'
import { baseSetting } from '@/framework/api/fetcher'
interface ChooseSpecProps {
  choosedSku: SkuItemProps
  detailInfo: ProductDetailProps
  buyCount: number
  showSpecs: boolean
  addToType: addToTypeEnum
  // isAble: (el: any) => boolean
  isAble: (pid: string, id: string, select: SelectedProps, skudata?: SkuItemProps[]) => boolean
  setSelected: (e: SelectedProps) => void
  selected: SelectedProps
  setShowSpecs: (show: boolean) => void
  setChoosedSku: (e: SkuItemProps) => void
  setBuyCount: (buycount: number) => void
}
const ChooseSpec = ({
  choosedSku,
  showSpecs,
  detailInfo,
  setChoosedSku,
  setShowSpecs,
  addToType,
  setSelected,
  selected,
  setBuyCount,
  isAble,
  buyCount,
}: ChooseSpecProps) => {
  const [addBtnStatus, setAddBtnStatus] = useState(false)
  useEffect(() => {
    let selectedArr = Object.values(selected).filter((el) => el)
    if (selectedArr.length === detailInfo.specifications?.length) {
      handleSku()
      setAddBtnStatus(true)
    } else {
      setAddBtnStatus(false)
    }
  }, [selected])
  const handleSku = () => {
    const selectedArr = Object.values(selected).filter((el) => el)
    const chooseSku =
      detailInfo.skus.find((item) => selectedArr.every((selected) => item.specIds.includes(selected))) ||
      detailInfo.skus[0] //兼容都没有值的情况
    chooseSku && setChoosedSku(chooseSku)
  }
  // useEffect(() => {
  //   if (addBtnStatus) {

  //   }
  // }, [addBtnStatus])

  const handleChangeSku = (specDetail: SpecDetail, specification: SpecProps) => {
    if (!specDetail.able) {
      return
    }
    console.info('selected', selected)
    selected[specification.id] = selected[specification.id] === specDetail.id ? '' : specDetail.id
    setSelected(cloneDeep(selected))
    detailInfo.specifications.forEach((item) => {
      item.children.forEach((its) => {
        its.able = isAble(item.id, its.id, selected)
        // its.able = isAble(its)
        // console.log(its.id, its.able)
      })
    })
  }

  const addToCart = async () => {
    console.info('choosedSkuchoosedSkuchoosedSkuchoosedSku', choosedSku)
    const { id } = choosedSku
    await createCart({
      customerId: baseSetting.customerId,
      // goodsId: '44c5f184-9146-187f-f738-67db27bf0468',
      // goodsVariantId: '00e9ec09-2370-b0f2-896f-7165cfcfd6df',
      goodsId: detailInfo.id,
      goodsVariantId: id,
      goodsNum: buyCount,
      storeId: baseSetting.storeId,
      petId: '',
      petType: '',
      operator: 'test',
    })
    Taro.switchTab({
      url: '/pages/cart/index',
    })
  }

  const addToCheckout = async () => {
    let data = await getProductBySkuId({ goodsVariantId: choosedSku.id })
    let selectedProduct = normalizeCartData({ goodsNum: buyCount }, data.productBySkuId)
    Taro.setStorage({
      key: 'select-product',
      data: JSON.stringify([selectedProduct]),
      complete: (respon) => {
        console.log(respon)
        Taro.navigateTo({ url: '/pages/packageA/checkout/index' })
      },
    })
  }

  const handleComfirm = async () => {
    console.info(choosedSku, 'test add cart')
    switch (addToType) {
      case addToTypeEnum.Cart:
        await addToCart()
        break
      case addToTypeEnum.Checkout:
        await addToCheckout()
        break
    }
    setShowSpecs(false)
  }
  return choosedSku.id ? (
    <AtFloatLayout
      isOpened={showSpecs}
      onClose={() => {
        setShowSpecs(false)
      }}
    >
      <View className="px-2">
        <View className="flex">
          <Image className="w-24 h-auto" mode="widthFix" src={choosedSku.img?.[0] || ''} />
          <View className="pl-1">
            <View>{choosedSku.name}</View>
            <View className="pt-1 text-gray-400 text-26">{choosedSku.no}</View>
            <View className="pt-3">
              <Text className="text-red-600 pr-4">{formatMoney(choosedSku.price)}</Text>
              <Text className="text-gray-300  text-26 line-through">{formatMoney(choosedSku.originalPrice)}</Text>
            </View>
          </View>
        </View>

        {detailInfo.specifications?.map((specification) => (
          <View>
            <View className="text-28"> {specification.name}</View>
            <View className="py-1">
              {specification.children?.map((el) => (
                <Text
                  onClick={() => {
                    handleChangeSku(el, specification)
                  }}
                  className={`mr-2 inline-block w-15 text-center text-26  border border-solid  rounded-full text-gray-400 border-gray-400
                  ${el.able ? '' : 'disabled'}
                  ${selected[specification.id] === el.id ? 'active' : ''}`}
                >
                  {el.name}
                </Text>
              ))}
            </View>
          </View>
        ))}
        <View className="flex py-3 items-center mb-10 justify-between">
          <View>数量</View>
          <View>
            {' '}
            <AtInputNumber
              min={1}
              max={99}
              step={1}
              type="number"
              value={buyCount}
              onChange={(value) => {
                setBuyCount(value)
              }}
            />
          </View>
        </View>
      </View>
      <View
        className={`text-center rounded-full fixed bottom-0 left-0 right-0 mx-2 my-4 py-2
         ${addBtnStatus ? 'active' : 'disabled'}
        `}
        onClick={handleComfirm}
      >
        确定
      </View>
    </AtFloatLayout>
  ) : null
}

export default ChooseSpec
