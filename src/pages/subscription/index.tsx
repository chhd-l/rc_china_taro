import PetList from '@/components/customer/PetList'
import { View, Text } from '@tarojs/components'
import './index.less'

const Subscription = () => {
  return (
    <View className="index">
      <Text>Subscription</Text>
      <PetList />
    </View>
  )
}

export default Subscription
