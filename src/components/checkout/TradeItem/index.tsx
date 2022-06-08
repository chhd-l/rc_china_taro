import { View, Text, Image } from '@tarojs/components'
import { formatMoney } from '@/utils/utils'
import './index.less'
import GiftItem from '../GiftItem'

const ProductItem = ({ product }: { product: any }) => {
  const { goodsNum } = product
  const { image, price, tags, name } = product.localData

  return (
    <View className="flex flex-row justify-between items-center mt-4 p-2">
      <View style={{ width: '260rpx', height: '260rpx' }}>
        <Image style="width:260rpx; height: 260rpx;border: 1px solid #f0f0f0" lazyLoad src={image} />
      </View>
      <View className="w-full flex flex-col justify-between pl-4">
        <View className=" flex flex-col">
          <View className="font-semibold text-28 text-black">{name}</View>
          {tags.map((el) => (
            <View className="text-22 text-gray-400 mt-1">{el}</View>
          ))}
        </View>
        <View className="flex flex-row justify-between items-end mt-4">
          <Text className="text-26 text-primary-red font-semibold">{formatMoney(price)}</Text>
          <Text className="text-22">x {goodsNum}</Text>
        </View>
      </View>
    </View>
  )
}

const TradeItem = ({ tradeItems }: { tradeItems: any[] }) => {
  return (
    <View className="">
      {tradeItems.map((item) => (
        <View>
          <ProductItem product={item} />
          {false ? <GiftItem product={item} /> : null}
        </View>
      ))}
    </View>
  )
}
export default TradeItem
