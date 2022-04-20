import Taro from '@tarojs/taro'
import Announcement from '@/components/common/Announcement'
// import defaultIcon from "@/assets/icons/icon-home.png";
import { View, Text } from '@tarojs/components'
import { AtAvatar, AtButton } from 'taro-ui'
import { useEffect, useState } from 'react'
import Mock from 'mockjs'
import { dataSource } from '@/mock/customer'
import PetList from '@/components/customer/PetList'
import './index.less'

// interface OrderTypeProps {
//   label: string;
//   icon: string;
//   url: string;
// }

// const orderTypeList: OrderTypeProps[] = [
//   { label: "待付款", icon: defaultIcon, url: "" },
//   { label: "待发货", icon: defaultIcon, url: "" },
//   { label: "待收货", icon: defaultIcon, url: "" },
//   { label: "退货/退款", icon: defaultIcon, url: "" },
//   { label: "我的卡券", icon: defaultIcon, url: "" },
// ];

const Account = () => {
  const [customerInfo, setCustomerInfo] = useState<any>({})

  useEffect(() => {
    setCustomerInfo(Mock.mock(dataSource))
  }, [])

  return (
    <View className="index">
      <Announcement title="添加社群，畅享更多专属福利！" />
      <View className="p-2">
        {/*个人信息和个人管理*/}
        <View className="flex flex-row justify-between px-2 pb-4 items-center">
          <View className="flex flex-row items-center">
            <AtAvatar circle size="large" openData={{ type: 'userAvatarUrl' }} />
            <View className="flex-col ml-4">
              <View>
                <Text className="text-black font-semibold text-32">{customerInfo.name}</Text>
                <Text className="text-24 ml-2">{customerInfo.level}</Text>
              </View>
              <View className="text-24 mt-2 text-red-600">当前积分：{customerInfo.points}</View>
            </View>
          </View>
          <View className="m-0">
            <AtButton
              className="text-xs flex items-center text-gray-400"
              size="small"
              onClick={() => {
                Taro.navigateTo({
                  url: '/pages/packageB/addressManage/index',
                })
              }}
            >
              地址管理+
            </AtButton>
          </View>
        </View>
        {/*/!*我的订单*!/*/}
        {/*<View className="p-2 bg-gray-50">*/}
        {/*  <View className="flex justify-between pb-2 border-b-2 border-l-0 border-r-0 border-t-0 border-solid border-gray-300">*/}
        {/*    <View>我的订单</View>*/}
        {/*    <View className="text-xs">查看全部订单&gt;</View>*/}
        {/*  </View>*/}
        {/*  <View className="flex flex-row justify-around items-center mt-2">*/}
        {/*    {orderTypeList.map((item) => (*/}
        {/*      <View className="flex flex-col items-center">*/}
        {/*        <Image className="w-6 h-6" src={item.icon} />*/}
        {/*        <Text className="text-xs">{item.label}</Text>*/}
        {/*      </View>*/}
        {/*    ))}*/}
        {/*  </View>*/}
        {/*</View>*/}
        {/*/!*官方福利群*!/*/}
        {/*<View>官方福利群</View>*/}
        {/*/!*打卡冷知识*!/*/}
        {/*<View>打卡冷知识</View>*/}
        {/*/!*微信关注*!/*/}
        {/*<View>微信关注</View>*/}
        {/*/!*我的宠物*!/*/}
        <View>
          <PetList />
        </View>
      </View>
    </View>
  )
}

export default Account
