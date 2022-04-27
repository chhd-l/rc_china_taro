import Taro from '@tarojs/taro'
import { AuthLogin } from '@/components/customer'
import { customerAtom } from '@/store/customer'
import { authLoginOpenedAtom } from '@/components/customer/AuthLogin'
import { useAtom } from 'jotai'
// import Announcement from '@/components/common/Announcement'
import defaultIcon from '@/assets/icons/icon-home.png'
import { View, Text, Image } from '@tarojs/components'
import { AtAvatar, AtButton } from 'taro-ui'
import { useEffect, useState } from 'react'
import Mock from 'mockjs'
import { dataSource } from '@/mock/customer'
import PetList from '@/components/customer/PetList'
import routers from '@/routers'
import './index.less'

interface OrderTypeProps {
  label: string
  icon: string
  url: string
}

const orderTypeList: OrderTypeProps[] = [
  { label: '待付款', icon: defaultIcon, url: '/pages/packageA/orderList/index?index=1' },
  { label: '待发货', icon: defaultIcon, url: '/pages/packageA/orderList/index?index=2' },
  { label: '待收货', icon: defaultIcon, url: '/pages/packageA/orderList/index?index=3' },
  { label: '退货/退款', icon: defaultIcon, url: '' },
  { label: '我的卡券', icon: defaultIcon, url: '' },
]

const Account = () => {
  const [, setAuthLoginOpened] = useAtom(authLoginOpenedAtom)
  const [customerInfo, setCustomerInfo] = useAtom(customerAtom)
  useEffect(() => {
    setCustomerInfo(Taro.getStorageSync('wxLoginRes').userInfo)
    setAuthLoginOpened(true)
    // Taro.navigateTo({
    //   url: `/pages/packageA/orderDetails/index`,
    // })
  }, [])

  return (
    <View className="index">
      {/* <Announcement title="添加社群，畅享更多专属福利！" /> */}
      <View className="p-2">
        {/*个人信息和个人管理*/}
        <View className="flex flex-row justify-between px-2 pb-4 items-center">
          <View className="flex flex-row items-center">
            {customerInfo?.id ? (
              <>
                <AtAvatar circle size="large" image={customerInfo?.avatarUrl} />
                <View className="flex-col ml-4">
                  <View className="flex item-center">
                    <Text className="text-black font-semibold text-32">{customerInfo.nickName}</Text>
                    <AtAvatar
                      circle
                      className="w-4 h-4 leading-none bg-center"
                      image="https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/consumer_type.png"
                    />
                    <Text className="text-24 ml-2">{customerInfo.level}</Text>
                  </View>
                  <View className="text-24 mt-2 text-red-600">当前积分：{customerInfo.points || 0}</View>
                </View>
              </>
            ) : (
              <>
                <AtAvatar circle size="large" openData={{ type: 'userAvatarUrl' }} />
                <View className="flex-col ml-4">
                  <View onClick={() => setAuthLoginOpened(true)}>
                    <Text className="text-black font-semibold text-32">点击授权</Text>
                  </View>
                </View>
              </>
            )}
          </View>
          <View className="m-0">
            <AtButton
              className="text-xs flex items-center text-gray-400"
              size="small"
              onClick={() => {
                if (!Taro.getStorageSync('wxLoginRes')) {
                  setAuthLoginOpened(true)
                  return
                }
                Taro.navigateTo({
                  url: routers.addressManage,
                })
              }}
            >
              地址管理+
            </AtButton>
          </View>
        </View>
        {/*/!*我的订单*!/*/}
        <View className="p-2 bg-gray-50">
          <View className="flex justify-between pb-2 border-b-2 border-l-0 border-r-0 border-t-0 border-solid border-gray-300">
            <View>我的订单</View>
            <View
              className="text-xs"
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/packageA/orderList/index?index=0`,
                })
              }}
            >
              查看全部订单&gt;
            </View>
          </View>
          <View className="flex flex-row justify-around items-center mt-2">
            {orderTypeList.map((item, idx) => (
              <View
                key={idx}
                className="flex flex-col items-center"
                onClick={() => {
                  Taro.navigateTo({
                    url: item.url,
                  })
                }}
              >
                <Image className="w-6 h-6" src={item.icon} />
                <Text className="text-xs">{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
        {/*/!*官方福利群*!/*/}
        {/* <View>官方福利群</View> */}
        {/*/!*打卡冷知识*!/*/}
        {/* <View>打卡冷知识</View> */}
        {/*/!*微信关注*!/*/}
        {/* <View>微信关注</View> */}
        {/*/!*我的宠物*!/*/}
        <View>
          <PetList />
        </View>
      </View>
      <AuthLogin />
    </View>
  )
}

export default Account
