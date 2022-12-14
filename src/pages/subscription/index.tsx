import { AtFloatLayout } from 'taro-ui'
import { useState } from 'react'
import { useRequest } from 'ahooks'
import PetList from '@/components/consumer/PetList'
import SubList from '@/components/creatSubscription/SubList'
import { View, Image } from '@tarojs/components'
import {
  CREATE_SUBSCRIPTION_ENTRY,
  subscriptionRights,
  SUBSCRIPTION_DESCRIPTION,
  SUBSCRIPTION_HELP_ICON,
  WHAT_IS_SUBSCRIPTION,
} from '@/lib/subscription'
import { getSubscriptionFindByConsumerId } from '@/framework/api/subscription/subscription'
import Taro from '@tarojs/taro'
import NavBar from '@/components/common/Navbar'
import { currentStepAtom, recommendInfoAtom, recommendProductAtom } from '@/store/subscription'
import { useAtom } from 'jotai'
import './index.less'
import { consumerAtom } from '@/store/consumer'

const Subscription = () => {
  const [showPop, setShowPop] = useState<boolean>(false)
  const [, setRecommendInfoAtom] = useAtom(recommendInfoAtom)
  const [, setRecommendProductAtom] = useAtom(recommendProductAtom)
  const [, setCurrentStep] = useAtom(currentStepAtom)
  const [consumerInfo, setConsumerInfo] = useAtom(consumerAtom)
  const [needRefresh, setNeedRefresh] = useState(false)
  const { data } = useRequest(
    async () => {
      // const params = {
      //   id: "73117cde-28be-f382-b910-8d169efd48e5",
      //   nextDeliveryDate: "2022-06-13T16:00:00.000Z",
      //   operator: "ss"
      // }
      if (!consumerInfo?.id) {
        return []
      }
      // const res = await getSubscriptionFindByConsumerId('0a1781df-4d21-7324-4bdd-d25726b2f353')
      const res = await getSubscriptionFindByConsumerId(consumerInfo?.id)
      return res
    },
    {
      refreshDeps: [needRefresh],
    },
  )
  const toSub = () => {
    Taro.navigateTo({ url: `/pages/packageB/createSubscription/index` })
  }

  Taro.useDidShow(() => {
    setRecommendInfoAtom({
      recommPetInfo: {},
      couponList: [],
      productList: [],
      giftList: [],
      currentIdx: 0,
      checkedArr: [],
    })
    setRecommendProductAtom({
      giftList: [],
      couponList: [],
      cardType: 0,
      freshType: 'FRESH_NORMAL',
      discountPrice: '',
      originalPrice: '',
      productVariantInfo: {
        productVariants: {},
        productAttributeValueRel: [],
        productAsserts: {},
        productName: '',
      },
    })
    setCurrentStep(0)
    setNeedRefresh(!needRefresh)
  })

  return (
    <View className="subscription-intrduce">
      <NavBar navbarTitle="??????" />
      <Image lazyLoad className="w-full" src={WHAT_IS_SUBSCRIPTION} mode="widthFix" />
      <View className="px-2">
        <PetList withoutLoading={true} />
      </View>
      {data?.map((item) => (
        <SubList key={item.id}>{item}</SubList>
      ))}

      <Image lazyLoad className="w-full" onClick={toSub} src={CREATE_SUBSCRIPTION_ENTRY} mode="widthFix" />
      <View className="relative">
        <View
          onClick={() => {
            setShowPop(true)
          }}
          style={{ right: '39%' }}
          className="w-4 h-4 absolute bottom-8"
        />
        <Image lazyLoad className="w-full" src={SUBSCRIPTION_DESCRIPTION} mode="widthFix" />
        {/* <View className="w-2 h-2 bg-primary-red absolute bottom-0" onClick={() => {
          setShowPop(true)
        }}></View> */}
      </View>
      {/* <View onClick={toSub}>????????????</View> */}
      <AtFloatLayout
        isOpened={showPop}
        title={` `}
        onClose={() => {
          setShowPop(false)
        }}
      >
        <View className="px-2 pb-4">
          <View className="text-28 flex">
            <View
              onClick={() => {
                setShowPop(true)
              }}
              className="w-3 h-3 bg-contain bg-primary-red bg-no-repeat mt-2 "
              style={{ background: `url(${SUBSCRIPTION_HELP_ICON})` }}
            />
            {/* <Image lazyLoad   className="w-full" src={SUBSCRIPTION_HELP_ICON} mode="widthFix" /> */}
            ????????????
          </View>
          {subscriptionRights.map((el) => (
            <View className=" pl-3" key={el.title}>
              <View className="text-24 text-primary-red mt-1">{el.title}</View>
              <View className="text-24 mt-1">{el.des}</View>
            </View>
          ))}
        </View>
      </AtFloatLayout>
    </View>
  )
}

export default Subscription
