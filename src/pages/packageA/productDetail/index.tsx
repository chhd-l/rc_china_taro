import { useEffect, useMemo, useState } from 'react'
import { View, Text, RichText, Image, Video } from '@tarojs/components'
import { ProductDetailProps, SkuItemProps } from '@/framework/types/products'
import { AuthLogin } from '@/components/customer'
import { authLoginOpenedAtom } from '@/components/customer/AuthLogin'
import { mockDetail } from '@/mock/product'
import ChooseSpec from '@/components/product/ChooseSpec'
import AddCart from '@/components/product/AddCart'
import Detail from '@/components/product/Detail'
import { addToTypeEnum } from '@/framework/types/common'
import cloneDeep from 'lodash.cloneDeep'
import { getProduct } from '@/framework/api/product/get-product'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { baseSetting } from '@/framework/api/fetcher'
import { useAtom } from 'jotai'
import { cartSunccessToastShowAtom } from '@/store/customer'
import { AtToast } from 'taro-ui'
import Mock from 'mockjs'
import './index.less'

export interface SelectedProps {
  [x: string]: string
}

let flag = true
// const detailData = Mock.mock(mockDetail)
// console.info('detailData', detailData)
const ProductDetail = () => {
  const [detailInfo, setDetailInfo] = useState<ProductDetailProps>({} as ProductDetailProps)
  const [addToType, setAddToType] = useState(addToTypeEnum.Cart)
  const [buyCount, setBuyCount] = useState<number>(1)
  const [showSpecs, setShowSpecs] = useState<boolean>(false)
  const [selected, setSelected] = useState<SelectedProps>({})
  const [choosedSku, setChoosedSku] = useState<SkuItemProps>({} as SkuItemProps)
  const { router } = getCurrentInstance()
  const [toastShow, setToastShow] = useAtom(cartSunccessToastShowAtom)
  const [, setAuthLoginOpened] = useAtom(authLoginOpenedAtom)
  useEffect(() => {
    getList()
  }, [])
  useEffect(() => {
    console.log('detailInfo', detailInfo)
  }, [detailInfo.id])
  const getList = async () => {
    console.info('router.params', router?.params)
    let goodsId = router?.params?.id || ''
    // if (!goodsId) {
    //   Taro.switchTab({
    //     url: '/pages/productList/index',
    //   })
    //   return
    // }
    let detailData = (await getProduct({ storeId: baseSetting.storeId, goodsId })) || detailInfo
    debugger
    if (detailData?.skus?.length) {
      detailData.skus.forEach((sku) => {
        if (detailData?.img) {
          sku.img.push(...detailData.img)
        }
      })
    }
    let selecteds = {}
    detailData.skus[0]?.goodsSpecificationRel?.map((el) => {
      selecteds[el.goodsSpecificationId] = el.goodsSpecificationDetailId
    })
    //默认选规格
    detailData.skus[0]?.goodsSpecificationRel?.forEach((specification) => {
      detailData.specifications
        ?.filter((el) => el.id !== specification?.goodsSpecificationId)
        ?.map((el) => {
          el.children = el.children.map((e, idx) => {
            // e.able = isAble(e)
            e.able = isAble(specification?.goodsSpecificationDetailId, e.id, selecteds, detailData.skus)
            // e.able = true
            return e
          })
          return el
        })
    })

    // setSelected(selecteds)
    const selectedArr = Object.values(selecteds).filter((el) => el)
    const chooseSku = detailData.skus[0] //默认选择第一个sku
    // const chooseSku =
    //   detailData.skus.find((item) => selectedArr.every((selectedStr: string) => item.specIds.includes(selectedStr))) ||
    //   detailData.skus[0] //兼容都没有值的情况
    chooseSku.video = detailData.video
    console.log('chooseSku', chooseSku)
    chooseSku && setChoosedSku(chooseSku)
    setDetailInfo(detailData)
    setSelected(cloneDeep(selecteds))
  }
  const handleShowSpec = (type: addToTypeEnum) => {
    if (!Taro.getStorageSync('wxLoginRes')) {
      setAuthLoginOpened(true)
      return
    }
    setShowSpecs(true)
    setAddToType(type)
  }
  const isAble = (key, value, selecteds, skudata) => {
    //key 当前选中的detailid; value:循环规格带的detailid
    let list = detailInfo.skus?.length ? detailInfo.skus : skudata
    //只有一层的情况暂做处理
    if (list[0].specIds?.length === 1) {
      return list.find((el) => el.specIds?.[0] === key)
    }
    let hasChoosedData = list.filter((el) => el.specIds.find((cel) => cel === key))
    return hasChoosedData.find((el) => el.specIds.find((cel) => cel === value))
  }
  console.info('Taro.getSystemInfoSync().windowWidth', Taro.getSystemInfoSync().windowWidth)
  return (
    <>
      {choosedSku.id ? (
        <View className="product-detail">
          <Detail choosedSku={choosedSku} detailInfo={detailInfo} buyCount={buyCount} handleShowSpec={handleShowSpec} />
          <View>
            <View className="text-center text-28 flex items-center justify-center">
              {' '}
              <View className="w-1 h-1 rounded-full bg-red-600"></View>
              <View className="px-1">商品详情</View>
              <View className="w-1 h-1 rounded-full bg-red-600"></View>
            </View>
            {choosedSku?.video ? <Video className="w-full" src={choosedSku.video} /> : null}
            {detailInfo.description ? (
              /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(detailInfo.description) ? (
                <Image
                  mode="widthFix"
                  // style={{ height: Taro.getSystemInfoSync().windowWidth }}
                  src={detailInfo.description}
                  className="w-full"
                />
              ) : (
                <Image
                  mode="widthFix"
                  // style={{ height: Taro.getSystemInfoSync().windowWidth }}
                  src={detailInfo.description?.split('"')?.[1]?.split('"')[0]}
                  className="w-full"
                />
              )
            ) : null}
            {/* <RichText className="w-full" nodes={detailInfo.description} /> */}
          </View>
          <ChooseSpec
            isAble={isAble}
            choosedSku={choosedSku}
            setChoosedSku={setChoosedSku}
            showSpecs={showSpecs}
            addToType={addToType}
            detailInfo={detailInfo}
            selected={selected}
            setSelected={setSelected}
            setShowSpecs={setShowSpecs}
            setBuyCount={setBuyCount}
            buyCount={buyCount}
          />
          <AtToast
            text="成功加入购物车"
            icon="check"
            isOpened={toastShow}
            duration={1200}
            onClose={() => setToastShow(false)}
          />
          <View className="h-12"></View>
          <AddCart handleShowSpec={handleShowSpec} />
          <AuthLogin />
        </View>
      ) : null}
    </>
  )
}

export default ProductDetail
