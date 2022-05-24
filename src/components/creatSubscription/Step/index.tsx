
import moment from 'moment'
import PetList from '@/components/customer/PetList'
import { useAtom } from 'jotai'
import { currentStepAtom, recommendInfoAtom, recommendProductAtom } from '@/store/subscription'
import { AtButton } from 'taro-ui'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getSubscriptionSimpleRecommend } from '@/framework/api/subscription/subscription'
import './index.less'
import ExclusivePackage from '../ExclusivePackage'
import Purchased from '../Purchased'
import AtMyStep from '../components/AtMyStep'



const nextStepView = {
  0: <PetList showCheckBox />,
  1: <ExclusivePackage />,
  2: <Purchased />
}
const Step = () => {
  const [stepCount, setStepCount] = useAtom(currentStepAtom)
  const [recommendInfo, setRecommendInfo] = useAtom(recommendInfoAtom)
  const [recommenProduct, setRecommendProduct] = useAtom(recommendProductAtom)

  // const [petInfo, setPetInfo] = useAtom(recommendInfoAtom)
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
      const { couponList, goodsList, giftList } = await getSubscriptionSimpleRecommend(params)
      const { discountPrice, originalPrice, quantity, cycle } = goodsList[0].cycleList[0]
      const gift = giftList.filter(item => goodsList[0].giftIdList.includes(item.id))
      setRecommendInfo({ ...recommendInfo, couponList, goodsList, giftList, discountPrice, originalPrice })
      setRecommendProduct({ ...goodsList[0], quantity, cycle, giftList: gift })
    } else {

    }
    setStepCount(stepCount + 1)
  }

  return <View>
    <AtMyStep current={stepCount} />
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
        stepCount === 2 && <AtButton type='primary' className="stepButton" onClick={() => {
          const params = {
            ...recommenProduct,
            pet: recommendInfo.recommPetInfo
          }
          console.log('params', params)
        }}>确认套餐</AtButton>
      }
    </View>
  </View>
}

export default Step