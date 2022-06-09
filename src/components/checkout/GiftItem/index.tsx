import { View, Text, Image } from '@tarojs/components'
import { formatMoney } from '@/utils/utils'

const GiftItem = ({ product }: { product: any }) => {
  const { goodsNum } = product
  const { image, price, specs, tags, name } = product.localData

  return (
    <View className="flex flex-row justify-between items-center mt-4 p-2">
      <View style={{ width: '150rpx', height: '150rpx' }}>
        <Image style="width:150rpx; height: 150rpx;border: 1px solid #f0f0f0" lazyLoad src={image} />
      </View>
      <View className="w-full pl-2">
        <View className="font-semibold text-28 ">
          {name}
          <Text className="px-1 text-24 font-normal bg-primary-red text-white ml-1">赠品</Text>
        </View>
        {/* <View>
                    {tags.map((el) => (
                        <View className="text-24 text-gray-400 mt-1">{el}</View>
                    ))}
                </View> */}
        <View className="flex flex-row justify-between items-end mt-4">
          <Text className="text-26 text-primary-red font-semibold">{formatMoney(price)}</Text>
          <Text className="text-22">x {goodsNum}</Text>
        </View>
      </View>
    </View>
  )
}
export default GiftItem
