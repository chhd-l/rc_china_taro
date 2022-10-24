import { View, Image, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { formatMoney } from '@/utils/utils'
import { Order } from '@/framework/types/order'
import { normalizeTags } from '@/framework/api/lib/normalize'
import routers from '@/routers'
import IconFont from '@/iconfont'
import { pay } from '@/framework/api/payment/pay'
import {session} from "@/utils/global";
import OrderAction from '../OrderAction'
import './index.less'

const orderStatusType = {
  UNPAID: '待付款',
  TO_SHIP: '待发货',
  SHIPPED: '待收货',
  COMPLETED: '已完成',
  VOID: '已取消',
}

const OrderListComponents = ({ list, openModalTip,curTabStatus }: { list: Order[]; openModalTip: Function,curTabStatus:string }) => {
  const copyText = (orderNumber) => {
    Taro.setClipboardData({
      data: orderNumber,
    })
  }

  //立即付款
  const payNow = (orderId, amount) => {
    let wxLoginRes = Taro.getStorageSync('wxLoginRes')
    pay({
      params: {
        consumerId: wxLoginRes?.userInfo?.id || '',
        consumerOpenId: wxLoginRes?.consumerAccount?.openId,
        orderId: orderId,
        orderNo: orderId,
        orderDescription: '商品',
        payWayCode: 'WECHAT_PAY', // '241e2f4e-e975-6e14-a62a-71fcd435e7e9',
        projectName: 'ACYK_WX',
        amount,
        currency: 'CNY',
        storeId: '12345678',
        // operator: wxLoginRes?.userInfo?.nickName || '',
      },
      success: function () {
        Taro.redirectTo({
          url: `${routers.orderList}?status=TO_SHIP`,
        })
      },
    })
  }

  return (
    <ScrollView className="OrderListComponents" scrollY scrollAnchoring enhanced bounces>
      {list.length > 0
        ? list.map((item: any, idx: number) => (
            <View
              className="card"
              key={idx}
              onClick={(e) => {
                e.stopPropagation()
                session.set('cur-orderTab-status',curTabStatus)
                Taro.navigateTo({
                  url: `${routers.orderDetail}?id=${item.orderNumber}`,
                })
              }}
            >
              <View
                className="h-6 flex justify-between items-center text-24 pb-2 mb-2"
                style={{ borderBottom: '1px solid rgb(232, 232, 232)' }}
              >
                <View className="flex items-center">
                  {item?.isSubscription ? (
                    <View className="mr-2">
                      <IconFont name="a-Group201" size={32} />
                    </View>
                  ) : null}
                  订单编号: {item.orderNumber}
                  <View
                    className="ml-2 rounded-2xl text-22 px-2"
                    style={{ background: '#e7e7e7' }}
                    onClick={(e) => {
                      e.stopPropagation()
                      copyText(item.orderNumber)
                    }}
                  >
                    复制
                  </View>
                </View>
                <View className="text-primary-red">{orderStatusType[item?.orderState?.orderState || '']}</View>
              </View>
              {(item?.lineItem?.filter((el) => !el.isGift) || []).map((el, index) => (
                <View key={index} className="w-full flex items-center min-h-16 " style={{ marginBottom: '36rpx' }}>
                  <View className="w-32 h-full" style={{ marginTop: '36rpx' }}>
                    {el?.pic ? (
                      <Image className="w-full h-full" mode="widthFix" src={el?.pic} />
                    ) : (
                      <Image className="w-full h-20" mode="widthFix" src={el?.pic} />
                    )}
                  </View>
                  <View className="w-full h-full flex flex-col pl-3">
                    <View className="text-30 mb-1">{el?.skuName}</View>
                    <View className="text-primary-red flex text-20 justify-between items-center">
                      <View className="flex flex-row flex-wrap">
                        {normalizeTags(el.productAttributeAndValues, el.feedingDays).map((tag) => (
                          <View
                            className="px-1 border rounded-lg border-solid border-red mr-2 mb-1"
                            style={{ borderWidth: '1PX' }}
                          >
                            {tag}
                          </View>
                        ))}
                      </View>
                      <View className="text-gray-400">X{el?.num}</View>
                    </View>
                    <View className="text-24 mt-2 items-end ProductIntroduction text-gray-400">
                      规格：{el?.productSpecifications}
                    </View>
                    {item.freshType === 'FRESH_100_DAYS' ? (
                      <View className="text-24 mt-1 items-end ProductIntroduction text-gray-400">新鲜度：100天</View>
                    ) : null}
                  </View>
                </View>
              ))}
              {item?.lineItem?.filter((el) => el.isGift)?.length ? (
                <View style={{ borderTop: '1rpx solid #e8e8e8', marginBottom: '18rpx' }} />
              ) : null}
              {(item?.lineItem?.filter((el) => el.isGift) || []).map((el, index) => (
                <View key={index} className="w-full flex items-center" style={{ marginBottom: '36rpx' }}>
                  <View className="w-16 h-full" style={{ marginTop: '36rpx' }}>
                    {el?.pic ? (
                      <Image className="w-full h-full" mode="widthFix" src={el?.pic} />
                    ) : (
                      <Image className="w-full h-20" mode="widthFix" src={el?.pic} />
                    )}
                  </View>
                  <View className="w-full h-full flex flex-col pl-3">
                    <View className="text-30  mb-1">
                      {el?.skuName}
                      <Text className="px-1 text-22 font-normal bg-primary-red text-white ml-1 whitespace-nowrap">
                        赠品
                      </Text>
                    </View>
                    <View className="text-primary-red flex text-20 justify-between items-center">
                      <View className="flex flex-row flex-wrap" />
                      <View className="text-gray-400">X{el?.num}</View>
                    </View>
                    {el?.productSpecifications ? (
                      <View className="text-24 mt-2 items-end ProductIntroduction text-gray-400">
                        规格：{el?.productSpecifications}
                      </View>
                    ) : null}
                  </View>
                </View>
              ))}
              <View className="w-full pt-2 footerText flex items-end flex-col">
                <View className="text-right text-22">
                  共{item?.lineItem?.length}件商品 总价
                  {formatMoney(item.orderPrice.productPrice + item.orderPrice.deliveryPrice)}，优惠
                  {formatMoney(item.orderPrice.discountsPrice + item?.orderPrice?.vipDiscountsPrice || 0)}，实付款
                  <Text className="text-primary-red text-28">{formatMoney(item.orderPrice.totalPrice)}</Text>
                </View>
                <OrderAction
                  orderState={item?.orderState?.orderState || ''}
                  openModalTip={() => {
                    openModalTip && openModalTip(item?.orderNumber, item?.orderState?.orderState)
                  }}
                  payNow={() => payNow(item.orderNumber || '', item.orderPrice.totalPrice * 100)}
                />
              </View>
            </View>
          ))
        : null}
    </ScrollView>
  )
}

export default OrderListComponents
