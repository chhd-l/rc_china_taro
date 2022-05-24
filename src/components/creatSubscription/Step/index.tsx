
import moment from 'moment'
import PetList from '@/components/customer/PetList'
import { useAtom } from 'jotai'
import { currentStepAtom, petInfoAtom } from '@/store/subscription'
import { AtButton } from 'taro-ui'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getSubscriptionSimpleRecommend } from '@/framework/api/subscription/subscription'
import './index.less'
import ExclusivePackage from '../ExclusivePackage'
import Purchased from '../Purchased'
import AtMyStep from '../components/AtMyStep'

const items = [
  { checked: 'xuanzechongwu', unchecked: 'xuanzechongwu0', title: '第一步', desc: '选择宠物' },
  { checked: 'dingzhitaocan', unchecked: 'dingzhitaocan0', title: '第二步', desc: '定制套餐' },
  { checked: 'querentaocan', unchecked: 'querentaocan0', title: '第三步', desc: '确认套餐' }]

const nextStepView = {
  0: <PetList showCheckBox />,
  1: <ExclusivePackage />,
  2: <Purchased />
}
const Step = () => {
  const [stepCount, setStepCount] = useAtom(currentStepAtom)
  const [petInfo, setPetInfo] = useAtom(petInfoAtom)
  const goNextStep = async () => {
    // const { type, code, birthday, isSterilized } = petInfo.recommPetInfo
    // const params = {
    //   subscriptionType: 'FRESH_BUY',
    //   petType: type,
    //   petBreedCode: code,
    //   isPetSterilized: isSterilized,
    //   petBirthday: moment(birthday)
    // }
    const params = {
      subscriptionType: 'FRESH_BUY',
      petType: 'CAT',
      petBreedCode: "10001",
      isPetSterilized: true,
      petBirthday: "2021-01-09T00:00:00.000Z"
    }

    if (stepCount === 0) {
      const res = await getSubscriptionSimpleRecommend(params)
      console.log('res', res)
      // setPetInfo({ ...petInfo, ...subscriptionSimpleRecommend })
    } else {

    }
    setStepCount(stepCount + 1)
  }

  return <View>
    <AtMyStep current={stepCount} items={items} />
    {nextStepView[stepCount]}
    <View className="flex flex-row justify-center px-6">
      {
        stepCount > 0 && <AtButton type='primary' className="stepButton" onClick={() => {
          setStepCount(stepCount - 1)
        }}>上一步</AtButton>}
      {
        stepCount < 2 && <AtButton type='primary' className="stepButton" onClick={goNextStep}>下一步</AtButton>
      }
      {
        stepCount === 2 && <AtButton type='primary' className="stepButton" onClick={() => Taro.navigateTo({
          url: ``,
        })}>确认套餐</AtButton>
      }
    </View>
  </View>
}

export default Step