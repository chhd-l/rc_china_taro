import { ProductListItemProps } from '@/framework/types/products'
import { formatMoney } from '@/utils/utils'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
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
            className="col-span-1"
            onClick={() => {
              toDetail(product)
            }}
          >
            <View className="border border-solid border-gray-300 rounded-sm pb-2 mb-2 text-center">
              <View style="width:334rpx; height: 334rpx;" className="flex items-center justify-center">
                <Image className="mx-auto w-full h-full" mode="widthFix" lazyLoad src={product.img} />
              </View>
              <View className="text-xs px-2 h-8 text-left  text-overflow">{product.name}</View>
              <View className="flex justify-between px-2 items-center">
                <View>
                  <View className="origin-price line-through text-gray-400">
                    原价：{formatMoney(Number(product.originalPrice))}
                  </View>
                  <View className="font-medium text-32 text-primary-red">{formatMoney(Number(product.price))}</View>
                </View>
                <View className="buy-button px-2 py-1 bg-white text-primary-red border-2 border-solid border-primary-red rounded-full">
                  立即购买
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
function useReachBottom(arg0: () => void) {
  throw new Error('Function not implemented.')
}
