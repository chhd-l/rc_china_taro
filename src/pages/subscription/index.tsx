import PetList from '@/components/customer/PetList'
import SubList from '@/components/creatSubscription/SubList'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

const Subscription = () => {
  const toSub = () => {
    Taro.redirectTo({ url: `/pages/packageB/createSubscription/index` })
  }
  return (
    <View className="index">
      <Text>Subscription</Text>
      <View clasName="px-2">
        <PetList />
      </View>
      <View onClick={toSub}>立即订阅</View>
      <SubList />
    </View>
  )
}

export default Subscription
