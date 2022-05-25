import CommonProblem from '@/components/creatSubscription/CommonProblem'
import PriceFooter from '@/components/creatSubscription/PriceFooter'
import Step from '@/components/creatSubscription/Step'
import { SUBSCRIPTION_IMG } from '@/lib/subscription'
import { currentStepAtom } from '@/store/subscription'
import { Image, View } from '@tarojs/components'
import { useAtom } from 'jotai'
import './index.less'


const Index = () => {
  const [stepCount] = useAtom(currentStepAtom)
  const priceFooter = stepCount === 1 && <PriceFooter />
  return (
    <View className="px-2 relative">
      <View className="border-gray-50  w-full h-50 my-3">
        <Image src={SUBSCRIPTION_IMG} className="w-full h-full" />
      </View>
      <Step />
      <CommonProblem />
      {
        priceFooter
      }
    </View>
  )
}
export default Index
