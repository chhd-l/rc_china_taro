import { View, Text, Image } from '@tarojs/components'
import { formatMoney } from '@/utils/utils'
import './index.less'
import GiftItem from '../GiftItem'

const ProductItem = ({ product }: { product: any }) => {
  const { goodsNum } = product
  const { image, price, specs, tags, name } = product.localData

  return (
    <View className="flex flex-row justify-between items-center mt-4 p-2">
      <View style={{ width: '200rpx', height: '200rpx' }}>
        <Image
          style="width:200rpx; height: 200rpx;border: 1px solid #f0f0f0"
          lazyLoad
          src={image}
        />
      </View>
      <View className="w-full pl-2">
        <View className="font-semibold text-32 text-black">{name}</View>
        <View className="font-semibold text-32 text-black mt-1">{specs}</View>
        {tags.map((el) => (
          <View className="text-24 text-gray-400 mt-1">{el}</View>
        ))}
        <View className="flex flex-row justify-between pr-4 mt-1 items-end">
          <Text className="text-primary-red">{formatMoney(price)}</Text>
          <Text className="text-xs text-gray-400">x {goodsNum}</Text>
        </View>
      </View>
    </View>
  )
}

const TradeItem = ({ tradeItems }: { tradeItems: any[] }) => {
  return (
    <View className="">
      {tradeItems.map((item) => (
        <View>
          <ProductItem product={item} />
          {false ? <GiftItem product={item} /> : null}
        </View>
      ))}
    </View>
  )
}
export default TradeItem
