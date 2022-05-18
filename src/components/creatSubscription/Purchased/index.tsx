import { View, Text } from "@tarojs/components"
import './index.less'


const Purchased = () => {


  return <View className="m-4">
    <View className="font-bold text-base ">您已购买</View>
    <View className="borderLine" />
    <view className="h-45 w-full flex flex-row my-4">
      <View className="bg-red-400 w-38 mr-2" />
      <View className="flex-1 h-30 pt-15">
        <View className="font-bold title">皇家 英国短毛猫成猫全价粮</View>
        <View className="bg-gray-500 text-white descSize w-20 text-center my-2">逐包随机发货</View>
        <View className="descSize text-gray-500 mt-2">适用年龄：1-7岁</View>
        <View className="descSize text-gray-500">建议天数</View>
        <View className="flex flex-row items-center justify-between">
          <View className="my-2">
            <Text className="descSize text-red-700">￥</Text>
            <Text className="font-bold text-red-700 text-xl">173</Text>
            <Text className="text-red-700 descSize">.00</Text>
          </View>
          <View className="text-gray-500 descSize">x3</View>
        </View>
      </View>
    </view>
    <View className="flex flex-row">
      <View className="w-30 h-20 bg-red-400 mr-2 " />
      <View className="flex-1">
        <View className="font-bold title">皇家 猫粮混粮随机口味</View>
        <View>
          <View className='at-icon at-icon-settings bg-red-600 rounded-sm text-white title h-4 leading-4 mr-2'>赠品</View>
          <Text className="text-white bg-gray-500 w-26 descSize rounded-sm h-4 leading-4">逐包随单发货</Text>
        </View>
        <View className="text-gray-500 descSize my-1">
          <Text>适用年龄:</Text>
          <Text>0</Text>
        </View>
        <View className="flex justify-between">
          <View className="text-red-700">
            <Text className="descSize">￥</Text>
            <Text>0</Text>
            <Text className="descSize">.00</Text>
          </View>
          <View className="descSize">x3</View>
        </View>
      </View>
    </View>
  </View>
}

export default Purchased