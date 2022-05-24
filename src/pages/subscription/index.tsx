import { AtFloatLayout } from 'taro-ui'
import { useEffect, useState } from 'react'
import PetList from '@/components/customer/PetList'
import SubList from '@/components/creatSubscription/SubList'
import { View, Image } from '@tarojs/components'
import { getSubscriptionSimpleRecommend } from '@/framework/api/subscription/subscription'
import Taro from '@tarojs/taro'
import './index.less'

import { CREATE_SUBSCRIPTION_ENTRY, subscriptionRights, SUBSCRIPTION_DESCRIPTION, SUBSCRIPTION_HELP_ICON, WHAT_IS_SUBSCRIPTION } from '@/lib/subscription'


const Subscription = () => {
  const [showPop, setShowPop] = useState<boolean>(false)
  const toSub = () => {
    Taro.redirectTo({ url: `/pages/packageB/createSubscription/index` })
  }
  const test = async () => {
    let params = {
      subscriptionType: 'FRESH_BUY',
      petType: 'CAT',
      petBreedCode: "10001",
      isPetSterilized: true,
      petBirthday: "2021-01-09T00:00:00.000Z"
    }
    let data = await getSubscriptionSimpleRecommend(params)
    console.info('data', data)
  }
  useEffect(() => {
    test()
  }, [])
  return (
    <View className="subscription-intrduce">
      <Image className="w-full" src={WHAT_IS_SUBSCRIPTION} mode="widthFix" />
      <View className="px-2">
        <PetList />
      </View>
      <SubList />
      <Image className="w-full" onClick={toSub} src={CREATE_SUBSCRIPTION_ENTRY} mode="widthFix" />
      <View className="relative">
        <View onClick={() => {
          setShowPop(true)
        }} style={{ right: '39%' }}
          className="w-3 h-3 absolute bottom-6"></View>
        <Image className="w-full" src={SUBSCRIPTION_DESCRIPTION} mode="widthFix" />
        {/* <View className="w-2 h-2 bg-primary-red absolute bottom-0" onClick={() => {
          setShowPop(true)
        }}></View> */}
      </View>
      {/* <View onClick={toSub}>立即订阅</View> */}
      <AtFloatLayout isOpened={showPop} title={` `} onClose={() => {
        setShowPop(false)
      }}>
        <View className='px-2 pb-4'>
          <View className="text-28 flex">
            <View onClick={() => {
              setShowPop(true)
            }} className="w-3 h-3 bg-contain bg-primary-red bg-no-repeat mt-2 " style={{ background: `url(${SUBSCRIPTION_HELP_ICON})` }}></View>
            {/* <Image   className="w-full" src={SUBSCRIPTION_HELP_ICON} mode="widthFix" /> */}
            八大权益</View>
          {subscriptionRights.map(el => <View className=" pl-3" key={el.title}>
            <View className="text-24 text-primary-red mt-1">{el.title}</View>
            <View className="text-24 mt-1">{el.des}</View>
          </View>)}
        </View>
      </AtFloatLayout>
    </View >
  )
}

export default Subscription
