import { View, Image, Text } from '@tarojs/components'
import { AtList, AtListItem, AtCard, AtAvatar } from 'taro-ui'
import './index.less'

const OrderDetails = () => {
  return (
    <View className="OrderDetails">
      <View className="flex items-center justify-center w-full h-20 bg-red-600 font-bold text-white mb-2">
        大撒大撒
      </View>
      <View className="bodyContext">
        <AtList className="ListBg">
          <AtListItem
            className="bg-white flex items-center h-14 mt-2"
            title="物流公司：申通快递"
            note="物流编号：2923982938923232"
            arrow="right"
            extraText="全部"
            iconInfo={{ size: 25, color: '#FF4949', value: 'bookmark' }}
          />
          <AtListItem
            className="bg-white flex items-center h-14 mt-2"
            title="冯伊生 1728237293"
            note="重庆市江北区观音桥小苑一村85号"
            iconInfo={{ size: 25, color: '#FF4949', value: 'bookmark' }}
          />
        </AtList>
        <AtCard className="m-0 mt-2 border-0" title="订单信息">
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
          <View className="w-full h-8 footerText flex items-end flex-col">
            <View className="text-right">
              共一件商品 总价￥141，优惠￥7，实付款
              <Text className="text-red-500">
                <Text className="ProductIntroduction">￥</Text>134
              </Text>
            </View>
          </View>
          <View className="flex items-center justify-between h-6 boderTop">
            <Text>订单编号</Text>
            <Text>20200202</Text>
          </View>
          <View className="flex items-center justify-between h-6 boderTop">
            <Text>下单时间</Text>
            <Text>20200202</Text>
          </View>
          <View className="flex items-center justify-between h-6 boderTop">
            <Text>支付方式</Text>
            <Text>20200202</Text>
          </View>
          <View className="flex items-center justify-between h-6 boderTop">
            <Text>发货时间</Text>
            <Text>20200202</Text>
          </View>
          <View className="flex items-center justify-between h-6 boderTop">
            <Text>备注</Text>
            <Text>20200202</Text>
          </View>
        </AtCard>
        <AtAvatar className="customerService" circle image="https://jdc.jd.com/img/200"></AtAvatar>
      </View>
    </View>
  )
}

export default OrderDetails
