
import IconFont from '@/iconfont'
import { Text, View } from '@tarojs/components'
import './index.less'

const CommonProblem = () => {

  return <View className="m-5 pb-14">
    <View className="my-2">

      <View className="flex items-center justify-center w-full font-bold"><IconFont name="changjianwenti" size={50} /> 常见问题</View>
    </View>
    <View>
      <View className="flex flex-row">
        <View className="w-5 h-5 bg-primary-red rounded-full text-white text-center mr-2">1</View>
        <Text>什么是订阅?</Text>
      </View>
      <View className="p-5 text-sm">
        一次付款，按月逐包送货上门，无需屯粮，更不用担心爱宠断粮。我们也将根据您家宠物的年龄、品种、体型推荐精准营养，并提供每日科学饲喂量，让您放心养宠。
      </View>
    </View>
    <View className="mb-5">
      <View className="flex flex-row">
        <View className="w-5 h-5 bg-primary-red rounded-full text-white text-center mr-2">2</View>
        <Text>订阅有什么好处?</Text>
      </View>
      <View className="p-5 text-sm" >
        <View className="text-primary-red font-bold ">周期订阅享超值价:</View>
        <View>一次订阅，全年享受大促价</View>
      </View>
      <View className="px-5 text-sm" >
        <View className="text-primary-red font-bold ">爱宠专属的饲喂方案:</View>
        <View>针对每一只宠物量身定制饲喂方案，消除你的选粮烦恼</View>
      </View>
      <View className="px-5 pt-5 text-sm" >
        <View className="text-primary-red font-bold ">按月发货不屯粮不断粮:</View>
        <View>按月逐包发货，确保不屯粮不断粮，还可灵活地修改发货周期，保证宠粮新鲜度100%</View>
      </View>
    </View>
    <View className="flex flex-row">
      <View className="w-5 h-5 bg-primary-red rounded-full text-white text-center mr-2">3</View>
      <Text>新鲜购的宠粮是根据什么定制的?</Text>
    </View>
    <View className="p-5 text-sm">
      新鲜购根据爱宠的品种、年龄和体型精准推荐。如果您想选择特定的某款产品，也可以在页面中进行粮食自由搭配哦。
    </View>
  </View>
}

export default CommonProblem