import { addToTypeEnum } from '@/framework/types/common'
import { ProductDetailProps, SkuItemProps } from '@/framework/types/products'
import { formatMoney } from '@/utils/utils'
import { Swiper, SwiperItem, View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtIcon } from 'taro-ui'
interface DetailProps {
  choosedSku: SkuItemProps
  detailInfo: ProductDetailProps
  buyCount: number
  handleShowSpec: (type: addToTypeEnum) => void
}
const Detail = ({ choosedSku, detailInfo, buyCount, handleShowSpec }: DetailProps) => {
  return (
    <View className="px-2">
      <Swiper
        className=""
        style={{ height: Taro.getSystemInfoSync().windowWidth }}
        indicatorColor="#fff"
        indicatorActiveColor="#e2001a"
        circular
        // indicatorDots
        autoplay
      >
        {choosedSku?.img?.map((el) => (
          <SwiperItem>
            <View className="demo-text-1">
              <Image className="w-full h-auto" mode="widthFix" src={el} />
            </View>
          </SwiperItem>
        ))}
      </Swiper>
      <View className="py-1">
        <View className="text-28 font-medium">{detailInfo.name}</View>
        <AtIcon prefixClass="fa" value="share" size="30" color="red"></AtIcon>
      </View>
      <View>
        {choosedSku?.tags?.map((tag) => (
          <Text className="border border-solid border-primary-red px-1 mr-1  text-26 rounded-lg text-primary-red">
            {tag}
          </Text>
        ))}
      </View>
      <View className="py-1">
        <Text className="text-primary-red pr-4 ">{formatMoney(choosedSku.price)}</Text>
        <Text className="text-gray-300  text-26 line-through">{formatMoney(choosedSku.originalPrice)}</Text>
      </View>
      <View className="flex justify-between text-28">
        <View>
          已选
          {choosedSku.specText?.join(',')}，{buyCount}件
        </View>
        <View
          onClick={() => {
            handleShowSpec(addToTypeEnum.None)
          }}
          className="text-primary-red text-40"
        >
          ...
        </View>
      </View>
      <View className="text-26 text-gray-400">
        <View>正品保障</View>
      </View>
    </View>
  )
}
export default Detail
