import { View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import { formatMoney } from '@/utils/utils'
import { Order } from '@/framework/types/order'
import { normalizeTags } from '@/framework/api/lib/normalize'
import './index.less'

const orderStatusType = {
  UNPAID: '待付款',
  TO_SHIP: '待发货',
  SHIPPED: '待收货',
  COMPLETED: '已完成',
  VOID: '已取消',
}

const OrderListComponents = ({ list }: { list: Order[] }) => {
  const copyText = (orderNumber) => {
    Taro.setClipboardData({
      data: orderNumber,
    })
  }

  return (
    <View>
      {list.map((item: Order, idx: number) => {
        return (
          <View
            className="card mb-2"
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
              <View className="w-12 text-red-500">{orderStatusType[item?.tradeState?.orderState]}</View>
            </View>
            {(item?.lineItem || []).map((el) => (
              <View className="w-full h-20 flex mb-4">
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
                共{item.lineItem.length}件商品 总价{formatMoney(item.tradePrice.totalPrice)}，优惠
                {formatMoney(item.tradePrice.discountsPrice || 0)}，实付款
                <Text className="text-red-500">{formatMoney(item.tradePrice.totalPrice)}</Text>
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
    </View>
  )
}

export default OrderListComponents
