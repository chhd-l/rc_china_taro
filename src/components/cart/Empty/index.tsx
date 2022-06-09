import { Image, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import '@/pages/cart/index.less'
import { CART_NO_DATA_ICON } from '@/lib/constants'

const Empty = () => {
  return (
    <View className="bg-white flex justify-center pt-20">
      <View className="flex flex-col items-center">
        <Image className="w-40 h-28" src={CART_NO_DATA_ICON} />
        <View className="mt-2 text-base font-bold">购物车有点空</View>
        <View className="mb-4 text-xs text-gray-400">赶紧犒劳一下爱宠吧</View>
        <AtButton
          className="w-32 border-primary-red bg-white text-30 text-primary-red flex items-center h-10 rounded-3xl border-2 font-semibold"
          onClick={() => {
            Taro.switchTab({
              url: '/pages/productList/index',
            })
          }}
        >
          去逛逛
        </AtButton>
      </View>
    </View>
  )
}
export default Empty
