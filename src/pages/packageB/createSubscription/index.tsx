import CommonProblem from '@/components/creatSubscription/commonProblem'
import Step from '@/components/creatSubscription/Step'
import PetList from '@/components/customer/PetList'
import { View } from '@tarojs/components'
import { useShareAppMessage } from '@tarojs/taro'
import { useState } from 'react'

import './index.less'

const index = () => {
  const [petInfo, setPetInfo] = useState<any>({})
  const handleCheckedPet = (pet) => {
    console.info('///////', pet)
    setPetInfo(pet)
  }
  return (
    <View className="px-2">
      <View className="border-gray-50 bg-red-400 w-full h-50 my-3" />
      <View>
        <Step><PetList showCheckBox={true} handleCheckedPet={handleCheckedPet} /></Step>
      </View>
      <CommonProblem />
    </View>
  )
}
export default index
