import { View, Text } from '@tarojs/components'
import { formatMoney } from '@/utils/utils'
import { AtButton } from 'taro-ui'
import { useEffect } from 'react'
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
  useEffect(() => {
    console.log(loading)
  }, [])

  return (
    <View className=" flex flex-row items-end justify-end border-t border-b-0 border-l-0 border-r-0 border-solid border-gray-400 w-full p-2 z-10 bg-gray-100">
      <Text className="text-gray-400 text-xs">共{num}件商品 总计：</Text>
      <Text className="text-primary-red text-3xl font-black">{formatMoney(totalPrice)}</Text>
      <AtButton
        type="primary"
        className="rc-button total-check-button"
        // loading={loading}
        onClick={() => {
          checkNow && checkNow()
        }}
      >
        立即支付
      </AtButton>
    </View>
  )
}
export default TotalCheckout
