import { useEffect, useMemo, useState } from 'react'
import { View, RichText, Image } from '@tarojs/components'
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
    if (detailData?.skus?.length) {
      detailData.skus.forEach((sku) => {
        if (detailData?.img) {
          sku.img.push(...detailData.img)
        }
      })
    }
    let selecteds = {}
    detailData.specifications?.map((el) => {
      el.children = el.children.map((e, idx) => {
        if (idx == 0) {
          selecteds[el.id] = e.id
        }
        console.info('.....', el, e)
        // e.able = isAble(e)
        e.able = isAble(el.id, e.id, selecteds, detailData.skus)
        return e
      })
      return el
    })
    // setSelected(selecteds)
    const selectedArr = Object.values(selecteds).filter((el) => el)
    const chooseSku =
      detailData.skus.find((item) => selectedArr.every((selectedStr: string) => item.specIds.includes(selectedStr))) ||
      detailData.skus[0] //兼容都没有值的情况
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
    // const isAble = (el) => {
    //只有一层的情况暂做处理
    return (detailInfo.skus?.length ? detailInfo.skus : skudata).find((el) => el.specIds?.[0] === value)
    // let list = detailInfo.skus || skudata
    // // 深拷贝 避免被影响
    // var copySelectSpec = JSON.parse(JSON.stringify(selecteds))
    // // 用对象的好处就在这了 直接赋值当前验证项
    // copySelectSpec[key] = value
    // // 用数组的 some 方法 效率高 符合条件直接退出循环 skudata兼容最开始detailinfo没有赋值的情况
    // let flag = list.some((item) => {
    //   // 条件判断 核心逻辑判断
    //   // console.log(item)
    //   var i = 0
    //   // 这个for in 循环的逻辑就对底子不深的人来说就看不懂了 原理就是循环已经选中的 和 正在当前对比的数据 和 所有的sku对比 只有当前验证的所有项满足sku中的规格或者其他规格为空时 即满足条件 稍微有点复杂 把注释的调试代码打开就调试下就可以看懂了
    //   for (let k in copySelectSpec) {
    //     //  console.log(copySelectSpec[k])  // 注释的调试看逻辑代码
    //     if (copySelectSpec[k] != '' && item.specIds.includes(copySelectSpec[k])) {
    //       // console.log(item)
    //       i++
    //     } else if (copySelectSpec[k] == '') {
    //       i++
    //     }
    //   }
    //   // 符合下面条件就退出了 不符合会一直循环知道循环结束没有符合的条件就 return false 了
    //   // console.log(i) // 注释的调试看逻辑代码
    //   return i == list.length
    // })
    // // console.log(flag)
    // return flag
  }
  console.info('Taro.getSystemInfoSync().windowWidth', Taro.getSystemInfoSync().windowWidth)
  return (
    <>
      {choosedSku.id ? (
        <View className="product-detail">
          <Detail choosedSku={choosedSku} detailInfo={detailInfo} buyCount={buyCount} handleShowSpec={handleShowSpec} />
          <View>
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
