import IconFont from "@/iconfont"
import { recommendInfoAtom } from "@/store/subscription"
import { View, Text } from "@tarojs/components"
import { useAtom } from "jotai"
import CountTag from "../components/CountTag"
import './index.less'


const Purchased = () => {
  const [petInfo] = useAtom(recommendInfoAtom)


  return <View className="m-4">
    <View className="font-bold text-base ">您已购买</View>
    <View className="borderLine" />
    <View className="h-45 w-full flex flex-row my-4">
      <View className="bg-primary-red w-38 mr-2 relative" >
        <CountTag count={10} />
      </View>
      <View className="flex-1 h-30 pt-15">
        <View className="font-bold text-rc26 text-rc_222222">皇家 英国短毛猫成猫全价粮</View>
        <View className="bg-rc_9B9C9D text-white text-rc18 w-rc124 h-rc26 leading-rc26 text-center my-2">逐包随单发货</View>
        <View className="text-rc22 text-textGray mt-2">适用年龄：1-7岁</View>
        <View className="text-rc22 text-textGray">建议天数</View>
        <View className="flex flex-row items-center justify-between">
          <View className="my-2">
            <Text className="text-rc20 text-primary-red">￥</Text>
            <Text className="font-bold text-primary-red text-rc28">173</Text>
            <Text className="text-primary-red text-rc20">.00</Text>
          </View>
          <View className="text-textGray text-rc22">x3</View>
        </View>
      </View>
    </View>
    <View className="flex flex-row">
      <View className="w-rc190 h-rc190 bg-primary-red mr-2 relative">
        <CountTag count={10} />
      </View>
      <View className="flex-1">
        <View className="font-bold text-rc26 text-rc_222222">皇家 猫粮混粮随机口味</View>
        <View className="font-bold text-rc26 text-rc_222222 mt-1">不可同时享受</View>
        <View className="flex flex-row items-center" >
          <IconFont name="a-Frame1" size={73} />
          <Text className="bg-rc_9B9C9D text-white text-rc18 w-rc124 h-rc26 leading-rc26 text-center ml-1">逐包随单发货</Text>
        </View>
        <View className="text-textGray text-rc22 my-1">
          <Text className="  mt-2">适用年龄:</Text>
          <Text>0</Text>
        </View>
        <View className="flex justify-between">
          <View className="text-primary-red">
            <Text className="text-rc20 text-primary-red">￥</Text>
            <Text className="text-rc28">0</Text>
            <Text className="text-rc20">.00</Text>
          </View>
          <View className="text-textGray text-rc22">x3</View>
        </View>
      </View>
    </View>
    <View className="mt-8 flex flex-row justify-end items-center">
      <Text className="line-through text-rc_222222 leading-16 text-rc22">原价￥{petInfo.originalPrice}，套餐折后价</Text>
      <Text className="text-primary-red font-bold text-rc54 mr-4 ml-2">￥{petInfo.discountPrice}</Text>
    </View>
  </View>
}

export default Purchased