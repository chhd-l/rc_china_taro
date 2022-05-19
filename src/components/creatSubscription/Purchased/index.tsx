import { petInfoAtom } from "@/store/subscription"
import { View, Text } from "@tarojs/components"
import { useAtom } from "jotai"
import './index.less'


const Purchased = () => {
  const [petInfo] = useAtom(petInfoAtom)


  return <View className="m-4">
    <View className="font-bold text-base ">您已购买</View>
    <View className="borderLine" />
    <View className="h-45 w-full flex flex-row my-4">
      <View className="bg-primary-red w-38 mr-2 relative" >
        <View className="absolute w-15  h-8 bg-white bottom-6 text-center leading-8">x10包</View>
      </View>
      <View className="flex-1 h-30 pt-15">
        <View className="font-bold title">皇家 英国短毛猫成猫全价粮</View>
        <View className="bg-gray-500 text-white descSize w-20 text-center my-2">逐包随机发货</View>
        <View className="descSize text-gray-500 mt-2">适用年龄：1-7岁</View>
        <View className="descSize text-gray-500">建议天数</View>
        <View className="flex flex-row items-center justify-between">
          <View className="my-2">
            <Text className="descSize text-primary-red">￥</Text>
            <Text className="font-bold text-primary-red text-xl">173</Text>
            <Text className="text-primary-red descSize">.00</Text>
          </View>
          <View className="text-gray-500 descSize">x3</View>
        </View>
      </View>
    </View>
    <View className="flex flex-row">
      <View className="w-30 h-20 bg-primary-red mr-2 relative">
        <View className="absolute w-15  h-8 bg-white bottom-3 text-center leading-8">x10包</View>
      </View>
      <View className="flex-1">
        <View className="font-bold title">皇家 猫粮混粮随机口味</View>
        <View>
          <View className='at-icon at-icon-settings bg-primary-red rounded-sm text-white title h-4 leading-4 mr-2'>赠品</View>
          <Text className="text-white bg-gray-500 w-26 descSize rounded-sm h-4 leading-4">逐包随单发货</Text>
        </View>
        <View className="text-gray-500 descSize my-1">
          <Text>适用年龄:</Text>
          <Text>0</Text>
        </View>
        <View className="flex justify-between">
          <View className="text-primary-red">
            <Text className="descSize">￥</Text>
            <Text>0</Text>
            <Text className="descSize">.00</Text>
          </View>
          <View className="descSize">x3</View>
        </View>
      </View>
    </View>
    <View className="mt-8 flex flex-row justify-end items-center">
      <Text className="line-through text-gray-400 leading-16 text-sm">原价￥{petInfo.originalPrice}，套餐折后价</Text>
      <Text className="text-primary-red font-bold text-4xl mr-4 ml-2">￥{petInfo.discountPrice}</Text>
    </View>
  </View>
}

export default Purchased