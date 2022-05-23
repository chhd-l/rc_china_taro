import { ProductListItemProps } from '@/framework/types/products'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

interface ListProps {
  list: ProductListItemProps[]
}
const List = ({ list }: ListProps) => {
  const toDetail = ({ spu }) => {
    Taro.navigateTo({
      url: `/pages/packageA/productDetail/index?id=${spu}`,
    })
  }
  console.info('productList', list)
  return (
    <View className="px-1 product-list">
      <View className="product-list-box grid grid-cols-2 gap-2 px-2">
        {list.map((product) => (
          <View
            key={product.name}
            className="col-span-1"

          >
            <View className="border border-solid border-gray-300 rounded-sm pb-2 mb-2 text-center">
              <Image className="mx-auto" style="width:334rpx; height: 334rpx;" lazyLoad src={product.img} />
              <View className="text-xs px-2 h-8 text-left  text-overflow">{product.name}</View>
              <View className="flex justify-between px-2 items-center">
                <View>
                  <View className="origin-price line-through text-gray-400">原价：¥{product.originalPrice}</View>
                  <View className="font-medium text-primary-red">¥{product.price}</View>
                </View>
                <View onClick={() => {
                  toDetail(product)
                }}
                  className="buy-button px-2 py-1 bg-white text-primary-red border border-solid border-primary-red rounded-full">
                  查看详情
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
export default List
