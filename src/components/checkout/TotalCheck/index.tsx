import { View, Text } from '@tarojs/components'
import { formatMoney } from '@/utils/utils'
import { AtButton } from 'taro-ui'
import './index.less'

const TotalCheckout = ({
  num,
  totalPrice,
  checkNow,
  loading,
}: {
  num: number
  totalPrice: number
  checkNow: Function
  loading: boolean
}) => {
  const checkout = () => {
    checkNow && checkNow()
  }

  return (
    <View className="flex flex-row items-end justify-end border-t border-b-0 border-l-0 border-r-0 border-solid border-gray-400 w-full p-2 z-10">
      <Text className="totalprice text-gray-400">共{num}件商品 总计：</Text>
      <Text className="text-red-500  text-2xl font-black mr-4">{formatMoney(totalPrice)}</Text>
      <AtButton
        type="primary"
        className="total-settle-button w-28 h-24 rc-button total-check-button"
        loading={loading}
        onClick={() => checkout()}
      >
        立即支付
      </AtButton>
    </View>
  )
}
export default TotalCheckout
