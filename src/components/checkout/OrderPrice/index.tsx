import { View } from '@tarojs/components'
import { formatMoney } from '@/utils/utils'
import './index.less'

const Remark = ({
  totalPrice,
  shipPrice,
  discountPrice,
  subDiscountPrice,
  communityDiscountPrice,
}: {
  totalPrice: number
  shipPrice: number
  discountPrice: number
  subDiscountPrice: number
  communityDiscountPrice: number
}) => {
  return (
    <View className="p-4 text-24 text-gray-400 bggray mt-2 rounded pb-16">
      <View className="flex flex-row justify-between items-center mb-1">
        <View>商品总价</View>
        <View>{formatMoney(totalPrice)}</View>
      </View>
      <View className="flex flex-row justify-between items-center mb-1">
        <View>运费</View>
        <View>{formatMoney(shipPrice)}</View>
      </View>
      <View className="flex flex-row justify-between items-center mb-1">
        <View>店铺优惠</View>
        <View>{formatMoney(discountPrice + subDiscountPrice)}</View>
      </View>
      {communityDiscountPrice ? (
        <View className="flex flex-row justify-between items-center">
          <View>社群VIP专享95折</View>
          <View>{formatMoney(communityDiscountPrice)}</View>
        </View>
      ) : null}
    </View>
  )
}
export default Remark
