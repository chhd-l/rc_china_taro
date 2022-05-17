import CommonProblem from '@/components/creatSubscription/commonProblem'
import Step from '@/components/creatSubscription/Step'
import PetList from '@/components/customer/PetList'
import { View } from '@tarojs/components'

import './index.less'

const index = () => {
  return (
    <View className="px-2">
      <View className="border-gray-50 bg-red-400 w-full h-50 my-3" />
      <View>
        <Step><PetList /></Step>
      </View>
      <CommonProblem />
    </View>
  )
}
export default index
