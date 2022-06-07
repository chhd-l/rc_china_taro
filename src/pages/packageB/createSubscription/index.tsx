import CommonProblem from '@/components/creatSubscription/CommonProblem'
import PriceFooter from '@/components/creatSubscription/PriceFooter'
import Step from '@/components/creatSubscription/Step'
import { SUBSCRIPTION_IMG } from '@/lib/subscription'
import { currentStepAtom } from '@/store/subscription'
import { Image, View } from '@tarojs/components'
import { useAtom } from 'jotai'
import NavBar from "@/components/common/Navbar";
import './index.less'


const Index = () => {
  const [stepCount] = useAtom(currentStepAtom)
  const priceFooter = stepCount === 1 && <PriceFooter />

  return (
    <>
      <NavBar navbarTitle="新鲜购" isNeedBack/>
      <View className="px-2 relative">
        <View className="border-gray-50  w-full my-3">
          <Image src={SUBSCRIPTION_IMG} mode="widthFix" className="w-full" />
        </View>
        <Step />
        <CommonProblem />
        {
          priceFooter
        }
      </View>
    </>

  )
}
export default Index
