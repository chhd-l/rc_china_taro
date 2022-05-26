import { recommendInfoAtom, recommendProductAtom } from '@/store/subscription'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useAtom } from 'jotai'
import './index.less'


const List = () => {
  const [goodsList] = useAtom(recommendInfoAtom)
  const [recommendProduct, setRecommendProduct] = useAtom(recommendProductAtom)

  const toDetail = (e, spu) => {
    Taro.navigateTo({
      url: `/pages/packageA/productDetail/index?id=${spu}`,
    })
    e.stopPropagation()

  }
  const chooseRecommendProduct = (good) => {
    setRecommendProduct({ ...recommendProduct, ...good })
    Taro.navigateBack({
      delta: 1
    })
  }
  return (
    <View className="px-1 product-list">
      <View className="product-list-box grid grid-cols-2 gap-2 px-2">
        {goodsList?.goodsList?.map((item) => {
          const product = item.goodsVariantInfo.goodsVariants[0]
          return <View
            key={product.name}
            className="col-span-1"
            onClick={() => chooseRecommendProduct(item)}
          >
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
                <View onClick={(e) => {
                  toDetail(e, item.goodsVariantInfo.id)
                }}
                  className="buy-button px-2 py-1 bg-white text-primary-red border border-solid border-primary-red rounded-full">
                  查看详情
                </View>
              </View>
            </View>
          </View>
        })}
      </View>
    </View>
  )
}
export default List
