import { useEffect, useMemo, useState } from 'react'
import { View, Text, RichText, Image, Video } from '@tarojs/components'
import { ProductDetailProps, SkuItemProps } from '@/framework/types/products'
import { AuthLogin } from '@/components/consumer'
import { authLoginOpenedAtom } from '@/components/consumer/AuthLogin'
import { mockDetail } from '@/mock/product'
import ChooseSpec from '@/components/product/ChooseSpec'
import AddCart from '@/components/product/AddCart'
import Detail from '@/components/product/Detail'
import { addToTypeEnum } from '@/framework/types/common'
import cloneDeep from 'lodash.cloneDeep'
import { getProduct } from '@/framework/api/product/get-product'
import Taro, { getCurrentInstance, useShareAppMessage } from '@tarojs/taro'
import { baseSetting } from '@/framework/api/fetcher'
import { useAtom } from 'jotai'
import { cartSunccessToastShowAtom } from '@/store/consumer'
import { AtFloatLayout, AtToast } from 'taro-ui'
import Mock from 'mockjs'
import './index.less'
import NavBar from '@/components/common/Navbar'
import ImgPoster from '@/components/product/ImgPoster'

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
  const [showShareBtn, setShowShareBtn] = useState(false)
  const [showPoster, setShowPoster] = useState(false)
  let type = 1 // 0. 显示直播、预告、商品讲解、回放其中之一的挂件；1. 只显示直播的挂件；2. 只显示预告的挂件；3. 只显示商品讲解的挂件；4. 只显示回放的挂件
  let customParams = encodeURIComponent(JSON.stringify({ path: 'pages/productList/index', pid: 1 })) // 开发者在直播间页面路径上携带自定义参数（如示例中的 path 和pid参数），后续可以在分享卡片链接和跳转至商详页时获取，详见【获取自定义参数】、【直播间到商详页面携带参数】章节（上限600个字符，超过部分会被截断）
  let closePictureInPictureMode = 0 // 是否关闭小窗
  useEffect(() => {
    getList()
  }, [])
  console.info('....location', location)
  useEffect(() => {
    console.log('detailInfo', detailInfo)
  }, [detailInfo.id])
  useShareAppMessage((res) => {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      // title: detailInfo?.name,
      title: '法国皇家官方宠粮订阅商城',
      path: `/pages/packageA/productDetail/index?id=${detailInfo?.id}`,
      imageUrl: choosedSku?.img?.[0],
    }
  })
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
    // debugger
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
        ?.filter((el) => {
          // console.info('el.id !== specification?.goodsSpecificationId', el.id, specification?.goodsSpecificationId)
          // 如果有多个规格，要筛选当前选择的不做置灰处理，处理其他规格
          // return detailData.specifications?.length > 1 ? el.id !== specification?.goodsSpecificationId : el.id
          return el.id !== specification?.goodsSpecificationId
        })
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
      return list.find((el) => el.specIds?.[0] === key)?.stock
    }
    let hasChoosedData = list.filter((el) => el.specIds.find((cel) => cel === key))
    return hasChoosedData.find((el) => el.specIds.find((cel) => cel === value))?.stock
  }
  return (
    <>
      <NavBar navbarTitle="商品详情" isNeedBack />
      {choosedSku.id ? (
        <View className="product-detail">
          <Detail
            choosedSku={choosedSku}
            setShowShareBtn={setShowShareBtn}
            detailInfo={detailInfo}
            buyCount={buyCount}
            handleShowSpec={handleShowSpec}
          />
          {/* <View direction="all" className={`fixed right-2 bottom-28 z-50`} style={{ width: '100px', height: '100px' }}>
            <pendant type={type} customParams={customParams} closePictureInPictureMode={closePictureInPictureMode}></pendant>
          </View> */}
          <View>
            <View className="text-center text-28 flex items-center justify-center py-4">
              {' '}
              <View className="w-1 h-1 rounded-full bg-red-600" />
              <View className="px-1 text-24 font-bold">商品详情</View>
              <View className="w-1 h-1 rounded-full bg-red-600" />
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
          <AddCart handleShowSpec={handleShowSpec} detailInfo={detailInfo} />
          <AuthLogin />
        </View>
      ) : null}
      <ImgPoster
        qrcode={detailInfo?.wxCodeUrl}
        setShowPoster={setShowPoster}
        showPoster={showPoster}
        setShowShareBtn={setShowShareBtn}
        showShareBtn={showShareBtn}
        productInfo={{
          img: choosedSku?.img?.[0],
          name: choosedSku?.name,
          price: choosedSku?.price,
          originalPrice: choosedSku?.originalPrice,
        }}
      />
    </>
  )
}

export default ProductDetail
