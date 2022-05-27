import { recommendProductAtom } from "@/store/subscription"
import { Text, View } from "@tarojs/components"
import { useAtom } from "jotai"

const PriceFooter = () => {
  const [productInfo] = useAtom(recommendProductAtom)
  return <View className=" w-full h-rc96 fixed bottom-0 left-0 bg-rc_FAFBFC flex items-center justify-end py-4">
    <Text className=" text-rc_222222  text-rc22 mt-2"><Text className="line-through">原价￥{productInfo.originalPrice}</Text>，套餐折后价</Text>
    <Text className="text-primary-red font-bold text-rc54 mr-4 ml-1">￥{productInfo.discountPrice}</Text>
  </View>
}

export default PriceFooter