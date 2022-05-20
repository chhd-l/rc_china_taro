import { getCartNumber } from '@/framework/api/cart/cart'
import { addToTypeEnum } from '@/framework/types/common'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { AtBadge, AtIcon } from 'taro-ui'
import { cartSunccessToastShowAtom } from '@/store/customer'
import { useAtom } from 'jotai'
import routers from '@/routers'
import './index.less'
import { SkuItemProps } from '@/framework/types/products'
import { currentCartSpuAtom } from '@/store/product'

interface Props {
  handleShowSpec: (type: addToTypeEnum) => void
  detailInfo?: any
}
const AddCart = ({ handleShowSpec, detailInfo }: Props) => {
  const [cartNumber, setCartNumber] = useState(0)
  const [cartSunccessToastShow] = useAtom
    (cartSunccessToastShowAtom)
  const [currentCartSpu, setCurrentCartSpu] = useAtom(currentCartSpuAtom)
  useEffect(() => {
    getCart()
  }, [cartSunccessToastShow])

  useEffect(() => {
    getCart()
  }, [detailInfo?.id])

  const getCart = async () => {
    if (detailInfo?.id) {
      let data = await getCartNumber(detailInfo.id)
      debugger
      console.info('detailInfo.iddetailInfo.id', detailInfo.id)
      setCurrentCartSpu(data.currentCartSpu)
      setCartNumber(data.cartNumber)
    }
  }
  return (
    <View className="addCartBox fixed bg-white bottom-0 left-0 right-0 z-10">
      <View className="text-30 flex h-12">
        <View
          className="flex flex-col justify-center items-center text-26 px-4"
          onClick={() => {
            Taro.switchTab({
              url: routers.cart,
            })
          }}
        >
          <AtBadge value={cartNumber} maxValue={99}>
            <AtIcon value="shopping-cart" size="22" color="#d33024" />
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
