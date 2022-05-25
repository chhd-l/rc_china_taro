
import PetList from '@/components/customer/PetList'
import { useAtom } from 'jotai'
import { currentStepAtom, recommendInfoAtom, recommendProductAtom } from '@/store/subscription'
import { AtButton } from 'taro-ui'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { normalizeCartData } from '@/framework/api/lib/normalize'
import routers from '@/routers'
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

  const goNextStep = async () => {
    // const { type, code, birthday, isSterilized } = recommendInfo.recommPetInfo
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
      const { discountPrice, originalPrice, quantity } = goodsList[0].cycleList[0]
      const gift = giftList.filter(item => goodsList[0].giftIdList.includes(item?.goodsVariants?.[0]?.id))
      setRecommendInfo({ ...recommendInfo, couponList, goodsList, giftList, discountPrice, originalPrice })
      setRecommendProduct({ ...recommenProduct, ...goodsList[0], quantity, cycle: goodsList[0].cycleList[0], giftList: gift })
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
          console.log('recommenProduct', recommenProduct)
          const { freshType, cycle, goodsVariantInfo, giftList } = recommenProduct
          const { recommPetInfo: pet } = recommendInfo
          let goodsList = [goodsVariantInfo]
          Taro.setStorage({
            key: 'select-product',
            data: JSON.stringify({
              type: 'FRESH_BUY',
              cycle,
              freshType,
              pet,
              // address: SubscriptionAddressInput!
              goodsList: goodsList.map(el => normalizeCartData({ goodsNum: recommenProduct.quantity }, el)),
              isSubscription: true,
              giftList: giftList?.map(el => normalizeCartData({ goodsNum: recommenProduct.quantity! * 2 }, el)) || [],
              couponList: [],
            }),
            complete: (respon) => {
              console.log(respon)
              Taro.navigateTo({ url: routers.checkout })
            },
          })
          console.log('params', goodsList)
        }}>确认套餐</AtButton>
      }
    </View>
  </View>
}

export default Step