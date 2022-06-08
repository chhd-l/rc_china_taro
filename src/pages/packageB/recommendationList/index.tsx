import { recommendInfoAtom, recommendProductAtom } from '@/store/subscription'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useAtom } from 'jotai'
import './index.less'

const List = () => {
  const [goodsList] = useAtom(recommendInfoAtom)
  const [recommendProduct, setRecommendProduct] = useAtom(recommendProductAtom)

  console.log('goodsList', goodsList)
  const toDetail = (e, spu) => {
    Taro.navigateTo({
      url: `/pages/packageA/productDetail/index?id=${spu}`,
    })
    e.stopPropagation()
  }
  const chooseRecommendProduct = (good) => {
    console.log('good', good)
    console.info('recommendProductrecommendProduct', recommendProduct)
    // recommendProduct.cycle.cycle
    const { cycleList } = good
    let currentCycle = cycleList[0]
    // let currentCycle = cycleList.find(el => recommendProduct.cycle.cycle === el.cycle)
    let { quantity } = currentCycle
    const { giftList } = goodsList
    const gift = good.giftIdList.map((el) => {
      let goodsVariants = giftList.find((giftItem) => giftItem?.goodsVariants?.[0]?.id === el.giftId)
      let data: any = {}
      if (goodsVariants && el) {
        data = {
          ...goodsVariants,
          subscriptionRecommendRuleId: el.subscriptionRecommendRuleId,
          quantityRule: el.quantityRule,
          quantity: el.quantity,
        }
        switch (data.quantityRule) {
          case 'FIRST_DELIVERY_FIXED_NUMBER':
            // data.quantity = recommenProduct.quantity
            data.quantity = data.quantity
            break

          case 'CALCULATE_BY_FEEDING_DAY':
            data.quantity = quantity
            break

          case 'FIXED_NUMBER':
            data.quantity = data.quantity
            break

          case 'DOUBLE_OF_SKU_NUMBER':
            data.quantity = quantity * 2
            break
        }
      }
      return data
    })
    setRecommendProduct({
      ...recommendProduct,
      ...good,
      discountPrice: cycleList[0].discountPrice,
      giftList: gift,
      cycle: currentCycle,
      quantity,
      originalPrice: cycleList[0].originalPrice,
      cardType: 0,
    })
    Taro.navigateBack({
      delta: 1,
    })
  }
  return (
    <View className="px-1 product-list">
      <View className="product-list-box grid grid-cols-2 gap-2 px-2">
        {goodsList?.goodsList?.map((item) => {
          const product = item.goodsVariantInfo.goodsVariants[0]
          return (
            <View key={product.name} className="col-span-1" onClick={() => chooseRecommendProduct(item)}>
              <View className="border border-solid border-gray-300 rounded-sm pb-2 mb-2 text-center">
                <View style="width:334rpx; height: 334rpx;" className="flex items-center justify-center">
                  <Image className="mx-auto w-full  h-full" mode="widthFix" lazyLoad src={product.defaultImage} />
                </View>
                <View className="text-xs px-2 h-8 text-left  text-overflow">{product.name}</View>
                <View className="flex justify-between px-2 items-center">
                  <View>
                    <View className="origin-price line-through text-gray-400">原价：¥{product.listPrice}</View>
                    <View className="font-medium text-primary-red">¥{product.marketingPrice}</View>
                  </View>
                  <View
                    onClick={(e) => {
                      toDetail(e, item.goodsVariantInfo.id)
                    }}
                    className="buy-button px-2 py-1 bg-white text-primary-red border border-solid border-primary-red rounded-full"
                  >
                    查看详情
                  </View>
                </View>
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}
export default List
