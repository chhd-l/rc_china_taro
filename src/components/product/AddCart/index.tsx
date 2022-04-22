import { getCartNumber } from '@/framework/api/cart/cart'
import { addToTypeEnum } from '@/framework/types/common'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { AtBadge, AtIcon } from 'taro-ui'
interface Props {
  handleShowSpec: (type: addToTypeEnum) => void
}
const AddCart = ({ handleShowSpec }: Props) => {
  const [cartNumber, setCartNumber] = useState(0)
  useEffect(() => {
    getCart()
  }, [])
  const getCart = async () => {
    let data = await getCartNumber()
    setCartNumber(data)
  }
  return (
    <View className="fixed bg-white bottom-0 left-0 right-0 z-10">
      <View className="text-30 flex h-12">
        <View
          className="flex flex-col justify-center items-center text-26 px-4"
          onClick={() => {
            Taro.switchTab({
              url: '/pages/cart/index',
            })
          }}
        >
          <AtBadge value={cartNumber} maxValue={99}>
            <AtIcon value="shopping-cart" size="22" color="#F00"></AtIcon>
          </AtBadge>
          购物车
        </View>
        <View
          onClick={() => {
            handleShowSpec(addToTypeEnum.Cart)
          }}
          className="flex justify-center items-center flex-1"
        >
          加入购物车
        </View>
        <View
          onClick={() => {
            handleShowSpec(addToTypeEnum.Checkout)
          }}
          className="flex justify-center items-center bg-red-600 text-white flex-1"
        >
          立即购买
        </View>
      </View>
    </View>
  )
}
export default AddCart
