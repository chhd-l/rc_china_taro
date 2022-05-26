import { ProductDetailProps, SkuItemProps, SpecDetail, SpecProps } from '@/framework/types/products'
import { View, Image, Text } from '@tarojs/components'
import { AtFloatLayout, AtInputNumber, AtButton, AtIcon, AtModal } from 'taro-ui'
import cloneDeep from 'lodash.cloneDeep'
import { addToTypeEnum } from '@/framework/types/common'
import Taro from '@tarojs/taro'
import { useEffect, useMemo, useState } from 'react'
import { SelectedProps } from '@/pages/packageA/productDetail'
import { formatMoney } from '@/utils/utils'
import { createCart } from '@/framework/api/cart/cart'
import { getProductBySkuId } from '@/framework/api/product/get-product'
import { normalizeCartData } from '@/framework/api/lib/normalize'
import { baseSetting } from '@/framework/api/fetcher'
import { cartSunccessToastShowAtom } from '@/store/customer'
import { useAtom } from 'jotai'
import routers from '@/routers'
import { getOrderSetting } from '@/framework/api/order/order'
import './index.less'
import { currentCartSpuAtom } from '@/store/product'

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
  const [, setToastShow] = useAtom(cartSunccessToastShowAtom)
  const [maxNum, setMaxNum] = useState(5)
  const [showOutStockTip, setShowOutStockTip] = useState(false)
  const [outStockMsg, setOutStockMsg] = useState('')
  const [currentCartSpu, setCurrentCartSpu] = useAtom(currentCartSpuAtom)

  useEffect(() => {
    let selectedArr = Object.values(selected).filter((el) => el)
    if (selectedArr.length === detailInfo.specifications?.length) {
      handleSku()
      setAddBtnStatus(true)
    } else {
      setAddBtnStatus(false)
    }
    console.log('selectedArr', selectedArr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  const currentNumber = useMemo(
    () =>
      currentCartSpu?.find((el) => {
        console.log(el.goodsVariantID, choosedSku.id, el.goodsVariantID === choosedSku.id)
        return el.goodsVariantID === choosedSku.id
      })?.goodsNum || 0,
    [choosedSku],
  )

  useEffect(() => {
    getMaxNum()
  }, [])

  //獲取
  const getMaxNum = async () => {
    const res = await getOrderSetting()
    const maxNumSetting = res.filter((item) => item.code === 'order_最大购买物品')
    const maxCartNum = maxNumSetting.length > 0 ? Number(maxNumSetting[0].context) : 5
    setMaxNum(maxCartNum)
  }

  const handleSku = () => {
    const selectedArr = Object.values(selected).filter((el) => el)
    const chooseSku =
      detailInfo.skus.find((item) => selectedArr.every((selecteds) => item.specIds.includes(selecteds))) ||
      detailInfo.skus[0] //兼容都没有值的情况
    chooseSku && setChoosedSku(chooseSku)
  }

  const handleChangeSku = (specDetail: SpecDetail, specification: SpecProps) => {
    if (!specDetail.able) {
      return
    }
    console.info('selected', selected)
    selected[specification.id] = selected[specification.id] === specDetail.id ? '' : specDetail.id
    setSelected(cloneDeep(selected))
    //排除当前点击选项处理isalbe
    detailInfo.specifications
      ?.filter((el) => specification.id !== el.id)
      .forEach((item) => {
        item.children.forEach((its) => {
          its.able = isAble(specDetail.id, its.id, selected)
          // its.able = isAble(its)
          // console.log(its.id, its.able)
        })
      })
    setBuyCount(1)
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
    setToastShow(true)
    // setToastShow(true)
    // Taro.switchTab({
    //   url: '/pages/cart/index',
    // })
  }

  const addToCheckout = async () => {
    let data = await getProductBySkuId({ goodsVariantId: choosedSku.id })
    let selectedProduct = normalizeCartData({ goodsNum: buyCount }, data.productBySkuId)
    Taro.setStorage({
      key: 'select-product',
      data: JSON.stringify({ goodsList: [selectedProduct] }),
      complete: (respon) => {
        console.log(respon)
        Taro.navigateTo({ url: routers.checkout })
      },
    })
  }

  const handleComfirm = async () => {
    console.info(choosedSku, 'test add cart')
    if (!choosedSku.stock) {
      setOutStockMsg('库存不足')
      setShowOutStockTip(true)
      return
    }
    if (currentNumber + buyCount > choosedSku.stock) {
      console.log('currentNumber', currentNumber)
      setOutStockMsg('亲，该宝贝加购已达库存上限哦')
      setShowOutStockTip(true)
      return
    }
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
      <View className="flex justify-end">
        <AtIcon value="close" size="26" color="#666" onClick={() => setShowSpecs(false)} />
      </View>
      <View className="px-2 mt-2">
        <View className="flex">
          <Image className="w-24 h-auto" mode="widthFix" src={choosedSku.img?.[0] || ''} />
          <View className="pl-3">
            <View className="text-xs font-bold">{choosedSku.name}</View>
            <View className="pt-1 text-gray-400 text-26">{choosedSku.no ? `商品编号：${choosedSku.no}` : null} </View>
            <View className="pt-4">
              <Text className="text-red-600 pr-4">{formatMoney(choosedSku.price)}</Text>
              <Text className="text-gray-300  text-26 line-through">{formatMoney(choosedSku.originalPrice)}</Text>
            </View>
          </View>
        </View>

        {detailInfo.specifications?.map((specification, idx) => (
          <View key={idx}>
            <View className="text-28 pb-1"> {specification.name}</View>
            <View className="py-1">
              {specification.children?.map((el, index) => (
                <Text
                  key={index}
                  onClick={() => {
                    handleChangeSku(el, specification)
                  }}
                  className={`mr-2 inline-block text-center text-26  border border-solid px-2 rounded-full defalt border-gray-200 text-gray-400
                  ${el.able ? '' : 'disabled'}
                  ${selected[specification.id] === el.id ? 'active textWhite' : ''}`}
                >
                  {el.name}
                  {/* {console.info('selected', selected)}
                  {console.info('specification.id', specification.id)}
                  {console.info('selected[specification.id]', selected[specification.id])}
                  {console.info('el.id', el.id)} */}
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
              max={maxNum}
              step={1}
              type="number"
              value={buyCount}
              onChange={(value) => {
                if (value + currentNumber > choosedSku.stock) {
                  setOutStockMsg('亲，该宝贝加购已达库存上限哦')
                  setShowOutStockTip(true)
                } else {
                  setBuyCount(value)
                }
              }}
            />
          </View>
        </View>
      </View>
      <AtButton
        disabled={!addBtnStatus}
        circle
        className={`${addBtnStatus ? 'active' : 'disabled'}`}
        onClick={handleComfirm}
      >
        确定
      </AtButton>
      <AtModal
        key="orderShipTip"
        isOpened={showOutStockTip}
        title="提示"
        content={outStockMsg}
        confirmText="确定"
        onClose={() => {
          setShowOutStockTip(false)
        }}
        onCancel={() => {
          setShowOutStockTip(false)
        }}
        onConfirm={() => {
          setShowOutStockTip(false)
        }}
        className="out-stock-tip-modal"
      />
    </AtFloatLayout>
  ) : null
}

export default ChooseSpec
