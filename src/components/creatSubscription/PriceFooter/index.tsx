import { recommendInfoAtom } from "@/store/subscription"
import { Text, View } from "@tarojs/components"
import { useAtom } from "jotai"

const PriceFooter = () => {
  const [petInfo] = useAtom(recommendInfoAtom)
  return <View className=" w-full h-rc96 fixed bottom-0 left-0 bg-rc_FAFBFC flex items-center justify-end py-4">
    <Text className="line-through text-rc_222222 leading-rc96 text-rc22">原价￥{petInfo.originalPrice}，套餐折后价</Text>
    <Text className="text-primary-red font-bold text-rc54 mr-4 ml-2">￥{petInfo.discountPrice}</Text>
  </View>
}

export default PriceFooter