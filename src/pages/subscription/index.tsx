import PetList from '@/components/customer/PetList'
import SubList from '@/components/creatSubscription/SubList'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'
import { CREATE_SUBSCRIPTION_ENTRY, subscriptionRights, SUBSCRIPTION_DESCRIPTION, SUBSCRIPTION_HELP_ICON, WHAT_IS_SUBSCRIPTION } from '@/lib/subscription'
import { AtFloatLayout } from 'taro-ui'
import { useState } from 'react'

const Subscription = () => {
  const [showPop, setShowPop] = useState<boolean>(false)
  const toSub = () => {
    Taro.redirectTo({ url: `/pages/packageB/createSubscription/index` })
  }
  return (
    <View className="subscription-intrduce">
      <Image src={WHAT_IS_SUBSCRIPTION} mode="widthFix" />
      <View clasName="px-2">
        <PetList />
      </View>
      <Image onClick={toSub} src={CREATE_SUBSCRIPTION_ENTRY} mode="widthFix" />
      <View className="relative">
        <View onClick={() => {
          setShowPop(true)
        }} style={{ right: '39%' }}
          className="w-3 h-3 absolute bottom-6"></View>
        <Image src={SUBSCRIPTION_DESCRIPTION} mode="widthFix" />
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
            {/* <Image src={SUBSCRIPTION_HELP_ICON} mode="widthFix" /> */}
            八大权益</View>
          {subscriptionRights.map(el => <View className=" pl-3">
            <View className="text-24 text-primary-red mt-1">{el.title}</View>
            <View className="text-24 mt-1">{el.des}</View>
          </View>)}
        </View>
      </AtFloatLayout>
      <SubList />
    </View >
  )
}

export default Subscription
