import { View } from '@tarojs/components'
import { formatMoney } from '@/utils/utils'
import './index.less'

const Remark = ({ orderPrice, isCommunityVip }: { orderPrice: any; isCommunityVip: boolean }) => {
  return (
    <View className="p-4 text-24 text-gray-400 bggray mt-2 rounded pb-16">
      <View className="flex flex-row justify-between items-center mb-1">
        <View>商品总价</View>
        <View>{formatMoney(orderPrice?.productPrice || 0)}</View>
      </View>
      <View className="flex flex-row justify-between items-center mb-1">
        <View>运费</View>
        <View>{formatMoney(orderPrice?.deliveryPrice || 0)}</View>
      </View>
      <View className="flex flex-row justify-between items-center mb-1">
        <View>店铺优惠</View>
        <View>{formatMoney(orderPrice?.discountsPrice || 0)}</View>
      </View>
      {isCommunityVip ? (
        <View className="flex flex-row justify-between items-center">
          <View>社群VIP专享95折</View>
          <View>{formatMoney(orderPrice?.vipDiscountsPrice || 0)}</View>
        </View>
      ) : null}
    </View>
  )
}
export default Remark
