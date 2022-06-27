import quitIcon from '@/assets/icons/quit.svg'
import NavBar from '@/components/common/Navbar'
import { Attention, AuthLogin } from '@/components/consumer'
import { authLoginOpenedAtom } from '@/components/consumer/AuthLogin'
import PetList from '@/components/consumer/PetList'
import { SHIPPED_ORDER_ICON, TO_SHIP_ORDER_ICON, UNPAID_ORDER_ICON, VOUCHER_ORDER_ICON } from '@/lib/constants'
import { MYACCOUNT_SOCIALGROUP } from '@/lib/mine'
import routers from '@/routers'
import { consumerAtom } from '@/store/consumer'
// import Announcement from '@/components/common/Announcement'
import { Button, Image, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { AtAvatar, AtButton, AtModal, AtModalAction, AtModalHeader } from 'taro-ui'
import './index.less'

interface OrderTypeProps {
  label: string
  icon: string
  url: string
}

const orderTypeList: OrderTypeProps[] = [
  { label: '待付款', icon: UNPAID_ORDER_ICON, url: `${routers.orderList}?status=UNPAID` },
  { label: '待发货', icon: TO_SHIP_ORDER_ICON, url: `${routers.orderList}?status=TO_SHIP` },
  { label: '待收货', icon: SHIPPED_ORDER_ICON, url: `${routers.orderList}?status=SHIPPED` },
  // { label: '退货/退款', icon: SHIPPED_ORDER_ICON, url: '' },
  { label: '我的卡券', icon: VOUCHER_ORDER_ICON, url: `${routers.voucherList}?voucherStatus=NOT_USED` },
]

const Account = () => {
  const [, setAuthLoginOpened] = useAtom(authLoginOpenedAtom)
  const [consumerInfo, setConsumerInfo] = useAtom(consumerAtom)
  const [signoutOpend, setSignoutOpend] = useState(false)

  useEffect(() => {
    setConsumerInfo(Taro.getStorageSync('wxLoginRes').userInfo)
  }, [])

  const navigateToOrderList = (item) => {
    if (!Taro.getStorageSync('wxLoginRes')) {
      setAuthLoginOpened(true)
      return
    }
    if (item.label !== '我的卡券') {
      Taro.navigateTo({
        url: item.url,
      })
    } else {
      Taro.requestSubscribeMessage({
        tmplIds: ['vL5mda-5SHGeMup3XUNoc6Tr53N6p45mVWL7IFLdNTc', 'b3XJc4_PToInELkByyRUDYVn7gbSKGhnVLSu7uHg1qk'],
        success: async (res) => {
          if (
            res['vL5mda-5SHGeMup3XUNoc6Tr53N6p45mVWL7IFLdNTc'] &&
            res['b3XJc4_PToInELkByyRUDYVn7gbSKGhnVLSu7uHg1qk']
          ) {
            Taro.navigateTo({
              url: item.url,
            })
          }
        },
        fail: (res) => {
          console.log(res)
          Taro.navigateTo({
            url: item.url,
          })
        },
      })
    }
  }

  return (
    <View className="Account">
      <NavBar navbarTitle="我的" />
      {/* <Announcement title="添加社群，畅享更多专属福利！" /> */}
      <View className="p-2">
        {/*个人信息和个人管理*/}
        <View className="flex flex-row justify-between px-2 pb-4 items-center">
          <View className="flex flex-row items-center">
            {consumerInfo?.id ? (
              <>
                <AtAvatar circle size="large" image={consumerInfo?.avatarUrl} />
                <View className="flex-col ml-4">
                  <View className="flex  item-center ">
                    <Text className="text-black font-semibold text-32  mr-2">{consumerInfo.nickName}</Text>
                    <View className="flex flex-row items-center justify-items-center">
                      <AtAvatar
                        circle
                        className="NewbieIcon bg-center"
                        image="https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/consumer_type.png"
                      />
                      <Text className="text-20 ml-1 LevelColor">{consumerInfo.level}</Text>
                    </View>
                  </View>
                  <View className="text-24 my-1 text-red-600">当前积分：{consumerInfo.points || 0}</View>
                  <View
                    className="flex item-center text-xs text-gray-600"
                    onClick={() => {
                      setSignoutOpend(true)
                    }}
                  >
                    <Text className="align-middle mr-1">退出登录 </Text>
                    <Image className="w-4 h-4 leading-none bg-center align-middle" src={quitIcon} />
                    {/* <AtAvatar circle className="w-4 h-4 leading-none bg-center align-middle" image={quitIcon} /> */}
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
        <View className=" px-rc18 bg-gray-fb mx-rc14 rounded-lg py-rc16">
          <View className="flex items-center justify-between pb-3 border-b-2 border-l-0 border-r-0 border-t-0 border-solid border-gray-eee">
            <View className="text-26 font-semibold">我的订单</View>
            <View
              className="text-22"
              onClick={() => {
                if (!Taro.getStorageSync('wxLoginRes')) {
                  setAuthLoginOpened(true)
                  return
                }
                Taro.navigateTo({
                  url: `${routers.orderList}?status=ALL`,
                })
              }}
            >
              查看全部订单 &gt;
            </View>
          </View>
          <View className="flex flex-row justify-around items-center mt-3">
            {orderTypeList.map((item, idx) => (
              <View key={idx} className="flex flex-col items-center" onClick={() => navigateToOrderList(item)}>
                <Image className="w-5 h-5" src={item.icon} />
                <Text className="text-22 mt-2">{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
        {/*/!*官方福利群*!/*/}

        <View className="w-rc692 h-rc194 my-rc30 mx-auto ">
          <Image
            className="w-full h-full"
            src={MYACCOUNT_SOCIALGROUP}
            onClick={() =>
              Taro.navigateTo({
                url: '/pages/packageA/welfare/index',
              })
            }
          />
        </View>

        {/*/!*打卡冷知识*!/*/}
        {/* <View>打卡冷知识</View> */}
        {/*/!*微信关注*!/*/}
          <Attention classes='bg-gray-fb py-3 px-2'/>

        {/*/!*我的宠物*!/*/}
        <View>
          <PetList withoutLoading />
        </View>
        <AtModal isOpened={signoutOpend}>
          <AtModalHeader>
            <View style={{ height: '100rpx', lineHeight: '100rpx' }}>确定要退出登录？</View>
          </AtModalHeader>
          <AtModalAction>
            <Button
              onClick={() => {
                setSignoutOpend(false)
              }}
            >
              取消
            </Button>
            <Button
              onClick={() => {
                Taro.removeStorageSync('wxLoginRes')
                setConsumerInfo(null)
                setSignoutOpend(false)
                const pages = Taro.getCurrentPages()
                const perpage = pages[pages.length - 1]
                perpage.onLoad()
              }}
            >
              确定
            </Button>
          </AtModalAction>
        </AtModal>
      </View>
      <AuthLogin />
    </View>
  )
}

export default Account
