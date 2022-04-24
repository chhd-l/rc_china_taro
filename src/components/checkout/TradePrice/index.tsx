import { View } from '@tarojs/components'
import { formatMoney } from '@/utils/utils'

const Remark = ({
  totalPrice,
  shipPrice,
  discountPrice,
}: {
  totalPrice: number
  shipPrice: number
  discountPrice: number
}) => {
  return (
    <View className="p-4 text-24 text-gray-400 bg-gray-50 mt-2 rounded">
      <View className="flex flex-row justify-between items-center mb-1">
        <View>商品总价</View>
        <View>{formatMoney(totalPrice)}</View>
      </View>
      <View className="flex flex-row justify-between items-center mb-1">
        <View>运费</View>
        <View>{formatMoney(shipPrice)}</View>
      </View>
      <View className="flex flex-row justify-between items-center">
        <View>店铺优惠</View>
        <View>{formatMoney(discountPrice)}</View>
      </View>
    </View>
  )
}
export default Remark
