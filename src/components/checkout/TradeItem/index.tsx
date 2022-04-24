import { View, Text, Image } from '@tarojs/components'
import { formatMoney } from '@/utils/utils'
import './index.less'

const ProductItem = ({ product }: { product: any }) => {
  const { goodsNum } = product
  const { image, price, specs, tags, name } = product.localData

  return (
    <View className="flex flex-row justify-between items-center mt-6 p-6 bg-white rounded">
      <Image src={image} mode="widthFix" className="border" />
      <View className="w-full pl-2">
        <View className="font-semibold text-32 text-black">{name}</View>
        <View className="font-semibold text-32 text-black mt-1">{specs}</View>
        {tags.map((el) => (
          <View className="text-24 text-gray-400 mt-1">{el}</View>
        ))}
        <View className="flex flex-row justify-between pr-4 mt-1">
          <Text className="text-red-500">{formatMoney(price)}</Text>
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
        <ProductItem product={item} />
      ))}
    </View>
  )
}
export default TradeItem
