import CommonProblem from '@/components/creatSubscription/CommonProblem'
import ConfirmPackageFoot from '@/components/creatSubscription/ConfirmPackageFoot'
import PriceFooter from '@/components/creatSubscription/PriceFooter'
import Step from '@/components/creatSubscription/Step'
import { currentStepAtom } from '@/store/subscription'
import { View } from '@tarojs/components'
import { useAtom } from 'jotai'
import './index.less'


const Index = () => {
  const [stepCount] = useAtom(currentStepAtom)
  const priceFooter = stepCount === 1 && <PriceFooter />
  return (
    <View className="px-2 relative">
      <View className="border-gray-50 bg-red-400 w-full h-50 my-3" />
      <Step />
      <CommonProblem />
      {
        priceFooter
      }



    </View>
  )
}
export default Index
