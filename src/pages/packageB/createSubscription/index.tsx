import CommonProblem from '@/components/creatSubscription/CommonProblem'
import PriceFooter from '@/components/creatSubscription/PriceFooter'
import Step from '@/components/creatSubscription/Step'
import { currentStepAtom } from '@/store/createSubscription'
import { View } from '@tarojs/components'
import { useAtom } from 'jotai'

import './index.less'

const index = () => {
  const [stepCount] = useAtom(currentStepAtom)
  return (
    <View className="px-2 relative">
      <View className="border-gray-50 bg-red-400 w-full h-50 my-3" />
      <Step />
      <CommonProblem />
      {
        stepCount === 1 && <PriceFooter />
      }

    </View>
  )
}
export default index
