import { View, Image, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import './index.less'

const OrderListComponents = ({ list }) => {
  const copyText = () => {
    Taro.setClipboardData({
      data: '12121212122',
    })
  }

  return (
    <ScrollView className="OrderListComponents" scrollY>
      {list.map((_item: any, idx: number) => {
        return (
          <View
            className="card"
            key={idx}
            onClick={(e) => {
              e.stopPropagation()
              Taro.navigateTo({
                url: '/pages/packageA/orderDetails/index',
              })
            }}
          >
            <View className="h-6 flex items-center headerText">
              <View className="w-full flex items-center">
                订单编号: 22040131884
                <View className="ml-2 copy" onClick={copyText}>
                  复制
                </View>
              </View>
              <View className="w-12 text-red-500">待付款</View>
            </View>
            <View className="w-full h-20 flex mb-4">
              <View className="w-28 h-full">
                <Image className="w-full h-full" src="https://jdc.jd.com/img/400x400" />
              </View>
              <View className="w-full h-full flex flex-col pl-3">
                <View className="text-xs font-black mb-1">皇家幼猫全价粮</View>
                <View className="text-red-500 flex ProductIntroduction justify-between items-center">
                  <View className="flex">
                    <View className="px-1 border rounded-lg border-solid border-red-500">适用年龄：4-12月龄</View>
                    <View className="px-1 border rounded-lg border-solid ml-2 border-red-500">建议饲喂天数：20</View>
                  </View>
                  <View>X1</View>
                </View>
                <View className="mt-8 ProductIntroduction">规格：2KG</View>
              </View>
            </View>
            <View className="w-full h-12 footerText flex items-end flex-col">
              <View className="text-right">
                共一件商品 总价￥141，优惠￥7，实付款
                <Text className="text-red-500">
                  <Text className="ProductIntroduction">￥</Text>134
                </Text>
              </View>
              <View className="mt-2 flex justify-items-end items-center">
                <AtButton
                  className="w-20 border-gray-300"
                  size="small"
                  circle
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  取消订单
                </AtButton>
                <AtButton
                  className="w-20 text-red-500 border-red-500 ml-3"
                  size="small"
                  circle
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  提醒发货
                </AtButton>
              </View>
            </View>
          </View>
        )
      })}
    </ScrollView>
  )
}

export default OrderListComponents
