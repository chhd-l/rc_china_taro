import { recommendInfoAtom } from '@/store/subscription'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useAtom } from 'jotai'
import './index.less'


const List = () => {
  const [goodsList] = useAtom(recommendInfoAtom)
  const toDetail = (spu) => {
    Taro.navigateTo({
      url: `/pages/packageA/productDetail/index?id=${spu}`,
    })
  }
  console.log('goodsList', goodsList)
  return (
    <View className="px-1 product-list">
      <View className="product-list-box grid grid-cols-2 gap-2 px-2">
        {goodsList?.goodsList?.map((item) => {
          const product = item.goodsVariantInfo.goodsVariants[0]
          return <View
            key={product.name}
            className="col-span-1"
            onClick={() => { }}
          >
            <View className="border border-solid border-gray-300 rounded-sm pb-2 mb-2 text-center">
              <Image className="mx-auto" style="width:334rpx; height: 334rpx;" lazyLoad src={product.defaultImage} />
              <View className="text-xs px-2 h-8 text-left  text-overflow">{product.name}</View>
              <View className="flex justify-between px-2 items-center">
                <View>
                  <View className="origin-price line-through text-gray-400">原价：¥{product.listPrice}</View>
                  <View className="font-medium text-primary-red">¥{product.marketingPrice}</View>
                </View>
                <View onClick={() => {
                  toDetail(item.goodsVariantInfo.id)
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
