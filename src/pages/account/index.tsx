import Taro from '@tarojs/taro'
import { AuthLogin } from '@/components/customer'
import { customerAtom } from '@/store/customer'
import { authLoginOpenedAtom } from '@/components/customer/AuthLogin'
import { useAtom } from 'jotai'
// import Announcement from '@/components/common/Announcement'
// import defaultIcon from '@/assets/icons/icon-home.png'
import { View, Text, Image, Button } from '@tarojs/components'
import { AtAvatar, AtButton, AtModal, AtModalAction, AtModalContent, AtModalHeader } from 'taro-ui'
import { useEffect, useState } from 'react'
import PetList from '@/components/customer/PetList'
import routers from '@/routers'
import { UNPAID_ORDER_ICON, TO_SHIP_ORDER_ICON, SHIPPED_ORDER_ICON } from '@/lib/constants'
import './index.less'
import quitIcon from '@/assets/icons/quit.svg'

interface OrderTypeProps {
  label: string
  icon: string
  url: string
}

const orderTypeList: OrderTypeProps[] = [
  { label: '待付款', icon: UNPAID_ORDER_ICON, url: `${routers.orderList}?status=UNPAID` },
  { label: '待发货', icon: TO_SHIP_ORDER_ICON, url: `${routers.orderList}?status=TO_SHIP` },
  { label: '待收货', icon: SHIPPED_ORDER_ICON, url: `${routers.orderList}?status=SHIPPED` },
  // { label: '退货/退款', icon: defaultIcon, url: '' },
  // { label: '我的卡券', icon: defaultIcon, url: '' },
]

const Account = () => {
  const [, setAuthLoginOpened] = useAtom(authLoginOpenedAtom)
  const [customerInfo, setCustomerInfo] = useAtom(customerAtom)
  const [signoutOpend, setSignoutOpend] = useState(false)
  useEffect(() => {
    setCustomerInfo(Taro.getStorageSync('wxLoginRes').userInfo)
    // Taro.navigateTo({
    //   url: `/pages/packageA/orderList/index?index=0`,
    // })
  }, [])

  return (
    <View className="Account">
      {/* <Announcement title="添加社群，畅享更多专属福利！" /> */}
      <View className="p-2">
        {/*个人信息和个人管理*/}
        <View className="flex flex-row justify-between px-2 pb-4 items-center">
          <View className="flex flex-row items-center">
            {customerInfo?.id ? (
              <>
                <AtAvatar circle size="large" image={customerInfo?.avatarUrl} />
                <View className="flex-col ml-4">
                  <View className="flex  item-center ">
                    <Text className="text-black font-semibold text-32  mr-2">{customerInfo.nickName}</Text>
                    <View className="flex flex-row items-center justify-items-center">
                      <AtAvatar
                        circle
                        className="NewbieIcon bg-center"
                        image="https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/consumer_type.png"
                      />
                      <Text className="text-24 ml-1 LevelColor">{customerInfo.level}</Text>
                    </View>
                  </View>
                  <View className="text-24 my-1 text-red-600">当前积分：{customerInfo.points || 0}</View>
                  <View
                    className="flex item-center text-xs text-gray-600"
                    onClick={() => {
                      setSignoutOpend(true)
                    }}
                  >
                    <Text className="align-middle mr-1">退出登录 </Text>
                    <AtAvatar circle className="w-4 h-4 leading-none bg-center align-middle" image={quitIcon} />
                  </View>
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
              className="AddressButton p-1 flex items-center LevelColor"
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
              地址管理 +
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
                  url: `${routers.orderList}?status=ALL`,
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
        <AtModal isOpened={signoutOpend}>
          <AtModalHeader>
            <View style={{ height: '100rpx', lineHeight: '100rpx' }}>确定要退出登录？</View>
          </AtModalHeader>
          {/* <AtModalContent>
            <View className="text-center text-base mt-10">确定要退出登录？</View>
          </AtModalContent> */}
          <AtModalAction>
            <Button
              onClick={() => {
                setSignoutOpend(false)
              }}
            >
              取消
            </Button>{' '}
            <Button
              onClick={() => {
                Taro.removeStorageSync('wxLoginRes')
                setCustomerInfo(null)
                setSignoutOpend(false)
              }}
            >
              确定
            </Button>{' '}
          </AtModalAction>
        </AtModal>
      </View>
      <AuthLogin />
    </View>
  )
}

export default Account
