import { View, Image, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { formatMoney } from '@/utils/utils'
import { Order } from '@/framework/types/order'
import { normalizeTags } from '@/framework/api/lib/normalize'
import OrderAction from '../OrderAction'
import './index.less'

const orderStatusType = {
  UNPAID: '待付款',
  TO_SHIP: '待发货',
  SHIPPED: '待收货',
  COMPLETED: '已完成',
  VOID: '已取消',
}

const OrderListComponents = ({ list, operationSuccess }: { list: Order[]; operationSuccess: Function }) => {
  const copyText = (orderNumber) => {
    Taro.setClipboardData({
      data: orderNumber,
    })
  }

  return (
    <ScrollView className="OrderListComponents" scrollY>
      {list.map((item: any, idx: number) => {
        return (
          <View
            className="card"
            key={idx}
            onClick={(e) => {
              e.stopPropagation()
              Taro.navigateTo({
                url: '/pages/packageA/orderDetails/index?id=' + item.orderNumber,
              })
            }}
          >
            <View className="h-6 flex items-center headerText">
              <View className="w-full flex items-center">
                订单编号: {item.orderNumber}
                <View className="ml-2 copy" onClick={() => copyText(item.orderNumber)}>
                  复制
                </View>
              </View>
              <View className="w-12 text-red-500">{orderStatusType[item?.tradeState?.orderState || '']}</View>
            </View>
            {(item?.lineItem || []).map((el, index) => (
              <View key={index} className="w-full h-20 flex mb-4">
                <View className="w-28 h-full">
                  <Image className="w-full h-full" src={el?.pic} />
                </View>
                <View className="w-full h-full flex flex-col pl-3">
                  <View className="text-xs font-black mb-1">{el?.skuName}</View>
                  <View className="text-red-500 flex ProductIntroduction justify-between items-center">
                    <View className="flex">
                      {normalizeTags(el.goodsAttributeAndValues, el.feedingDays).map((tag) => (
                        <View className="px-1 border rounded-lg border-solid border-red-500">{tag}</View>
                      ))}
                    </View>
                    <View>X{el?.num}</View>
                  </View>
                  <View className="mt-8 ProductIntroduction">规格：{el?.goodsSpecifications}</View>
                </View>
              </View>
            ))}
            <View className="w-full h-12 footerText flex items-end flex-col">
              <View className="text-right">
                共{item?.lineItem?.length}件商品 总价{formatMoney(item.tradePrice.totalPrice)}，优惠
                {formatMoney(item.tradePrice.discountsPrice || 0)}，实付款
                <Text className="text-red-500">{formatMoney(item.tradePrice.totalPrice)}</Text>
              </View>
              <OrderAction
                orderState={item?.tradeState?.orderState || ''}
                orderId={item.orderNumber || ''}
                operationSuccess={() => {
                  operationSuccess && operationSuccess()
                }}
              />
            </View>
          </View>
        )
      })}
    </ScrollView>
  )
}

export default OrderListComponents
