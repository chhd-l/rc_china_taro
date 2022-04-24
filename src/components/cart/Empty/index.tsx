import { Image, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import EmptyCart from '@/assets/img/empty-cart-img.png'
import { AtButton } from 'taro-ui'
import '@/pages/cart/index.less'
import './index.less'

const Empty = () => {
  return (
    <View className="bg-white flex justify-center cart-content">
      <View className="flex flex-col items-center">
        <Image className="w-40 h-28" src={EmptyCart} />
        <View className="mt-2 text-base font-bold">购物车有点空</View>
        <View className="my-2 text-xs text-gray-400">赶紧犒劳一下爱宠吧</View>
        <AtButton
          className="my-button w-32"
          onClick={() => {
            Taro.switchTab({
              url: '/pages/productList/index',
            })
          }}
          customStyle={{ height: '32px',lineHeight:'30px' }}
        >
          去逛逛
        </AtButton>
      </View>
    </View>
  )
}
export default Empty
