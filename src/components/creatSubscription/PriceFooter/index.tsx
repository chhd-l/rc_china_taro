import { petInfoAtom } from "@/store/subscription"
import { Text, View } from "@tarojs/components"
import { useAtom } from "jotai"

const PriceFooter = () => {
  const [petInfo] = useAtom(petInfoAtom)
  return <View className="border-gray-400 w-full h-16 fixed bottom-0 left-0 bg-white flex items-center justify-end py-4">
    <Text className="line-through text-gray-400 leading-16 text-sm">原价￥{petInfo.originalPrice}，套餐折后价</Text>
    <Text className="text-primary-red font-bold text-4xl mr-4 ml-2">￥{petInfo.discountPrice}</Text>
  </View>
}

export default PriceFooter