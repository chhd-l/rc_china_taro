import { useEffect } from 'react'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { formatMoney } from '@/utils/utils'
import { Order } from '@/framework/types/order'
import { normalizeTags } from '@/framework/api/lib/normalize'
import routers from '@/routers'
import OrderAction from '../OrderAction'
import './index.less'
import IconFont from '@/iconfont'

const orderStatusType = {
  UNPAID: '待付款',
  TO_SHIP: '待发货',
  SHIPPED: '待收货',
  COMPLETED: '已完成',
  VOID: '已取消',
}

const OrderListComponents = ({
  list,
  operationSuccess,
  openModalTip,
}: {
  list: Order[]
  operationSuccess: Function
  openModalTip: Function
}) => {
  const copyText = (orderNumber) => {
    Taro.setClipboardData({
      data: orderNumber,
    })
  }
  useEffect(() => {
    console.log('orderlist', list)
  }, [])

  return (
    <ScrollView className="OrderListComponents" scrollY>
      {list.map((item: any, idx: number) => (
        <View
          className="card"
          key={idx}
          onClick={(e) => {
            e.stopPropagation()
            Taro.navigateTo({
              url: `${routers.orderDetail}?id=${item.orderNumber}`,
            })
          }}
        >
          <View className="h-6 flex justify-between items-center headerText">
            <View className="flex items-center">
              {item.isSubscription ? <IconFont name='a-Group201' size={28} /> : null}
              订单编号: {item.orderNumber}
              <View
                className="ml-2 copy"
                onClick={(e) => {
                  e.stopPropagation()
                  copyText(item.orderNumber)
                }}
              >
                复制
              </View>
            </View>
            <View className="text-primary-red">{orderStatusType[item?.tradeState?.orderState || '']}</View>
          </View>
          {(item?.lineItem || []).map((el, index) => (
            <View key={index} className="w-full h-20 flex mb-4">
              <View className="w-28 h-full">
                <Image className="w-full h-full" src={el?.pic} />
              </View>
              <View className="w-full h-full flex flex-col pl-3">
                <View className="text-xs font-black mb-1">{el?.skuName}</View>
                <View className="text-primary-red flex ProductIntroduction justify-between items-center">
                  <View className="flex flex-row flex-wrap">
                    {normalizeTags(el.goodsAttributeAndValues, el.feedingDays).map((tag) => (
                      <View className="px-1 border rounded-lg border-solid border-red mr-2 mt-2">{tag}</View>
                    ))}
                  </View>
                  <View className="numcolor">X{el?.num}</View>
                </View>
                <View className=" mt-2 items-end ProductIntroduction numcolor">规格：{el?.goodsSpecifications}</View>
              </View>
            </View>
          ))}
          {(item?.lineItem || []).map((el, index) => (
            <View key={index} className="w-full h-16 flex mb-4">
              <View className="w-16 h-full">
                <Image className="w-full"
                  mode="widthFix"
                  src={el?.pic} />
              </View>
              <View className="w-full h-full flex flex-col pl-3">
                <View className="text-xs font-black mb-1">{el?.skuName}<Text className="px-1 text-22 font-normal bg-primary-red text-white ml-1">赠品</Text></View>
                <View className="flex ProductIntroduction justify-between items-center">
                  <View>
                    {normalizeTags(el.goodsAttributeAndValues, el.feedingDays).map((el) => (
                      <View className="ProductIntroduction numcolor  mt-1">{el}</View>
                    ))}
                  </View>
                  {/* <View className="flex flex-row flex-wrap">
                    {normalizeTags(el.goodsAttributeAndValues, el.feedingDays).map((tag) => (
                      <View className="px-1 border rounded-lg border-solid border-red mr-2 mt-2">{tag}</View>
                    ))}
                  </View> */}
                  <View className="numcolor">X{el?.num}</View>
                </View>
                <View className=" mt-2 items-end ProductIntroduction numcolor">规格：{el?.goodsSpecifications}</View>
              </View>
            </View>
          ))}
          <View className="w-full footerText flex items-end flex-col">
            <View className="text-right">
              共{item?.lineItem?.length}件商品 总价{formatMoney(item.tradePrice.goodsPrice)}，优惠
              {formatMoney(item.tradePrice.discountsPrice || 0)}，实付款
              <Text className="text-primary-red text-28">{formatMoney(item.tradePrice.totalPrice)}</Text>
            </View>
            <OrderAction
              amount={item.tradePrice.totalPrice * 100}
              remark={item.remark}
              orderState={item?.tradeState?.orderState || ''}
              orderId={item.orderNumber || ''}
              operationSuccess={() => {
                operationSuccess && operationSuccess()
              }}
              openModalTip={() => {
                openModalTip && openModalTip()
              }}
            />
          </View>
        </View>
      ))
      }
    </ScrollView >
  )
}

export default OrderListComponents
