import { View, Image, Text } from '@tarojs/components'
import { AtList, AtListItem, AtCard } from 'taro-ui'
import { useEffect, useState } from 'react'
import { getCurrentInstance } from '@tarojs/taro'
import { getOrderDetail } from '@/framework/api/order/order'
import { normalizeTags } from '@/framework/api/lib/normalize'
import { formatMoney } from '@/utils/utils'
import { Order } from '@/framework/types/order'
import './index.less'

const orderStatusType = {
  UNPAID: '交易待付款',
  TO_SHIP: '交易待发货',
  SHIPPED: '交易待收货',
  COMPLETED: '交易已完成',
  VOID: '交易已取消',
}

const OrderDetails = () => {
  const [orderId, setOrderId] = useState('')
  const { router } = getCurrentInstance()
  const [orderDetail, setOrderDetail] = useState<Order>({
    shippingAddress: {
      receiverName: '',
      phone: '',
      province: '',
      city: '',
      region: '',
      detail: '',
    },
    tradePrice: {
      goodsPrice: 0,
      deliveryPrice: 0,
      totalPrice: 0,
      discountsPrice: 0,
    },
  })
  const { receiverName, phone, province, city, region, detail } = orderDetail?.shippingAddress
  const { totalPrice, discountsPrice } = orderDetail?.tradePrice

  const getOrder = async () => {
    const res = await getOrderDetail({ orderNum: orderId })
    setOrderDetail(res)
  }

  useEffect(() => {
    if (router?.params?.id) {
      setOrderId(router.params.id)
    }
  }, [])

  useEffect(() => {
    if (orderId !== '') {
      getOrder()
    }
  }, [orderId])

  return (
    <View className="OrderDetails">
      {orderDetail?.orderNumber ? (
        <>
          <View className="flex items-center justify-center w-full h-20 bg-red-600 font-bold text-white mb-2">
            {orderStatusType[orderDetail?.tradeState?.orderState || '']}
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
                title={`${receiverName} ${phone}`}
                note={`${province} ${city} ${region} ${detail}`}
                iconInfo={{ size: 25, color: '#FF4949', value: 'bookmark' }}
              />
            </AtList>
            <AtCard className="m-0 mt-2 border-0" title="订单信息">
              {(orderDetail?.lineItem || []).map((el) => (
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
              <View className="w-full h-8 footerText flex items-end flex-col">
                <View className="text-right">
                  共{orderDetail?.lineItem?.length}件商品 总价{formatMoney(totalPrice)}，优惠
                  {formatMoney(discountsPrice)}，实付款
                  <Text className="text-red-500">{formatMoney(totalPrice)}</Text>
                </View>
              </View>
              <View className="flex items-center justify-between h-6 boderTop">
                <Text>订单编号</Text>
                <Text>{orderDetail.orderNumber}</Text>
              </View>
              <View className="flex items-center justify-between h-6 boderTop">
                <Text>下单时间</Text>
                <Text>{orderDetail?.tradeState?.createdAt}</Text>
              </View>
              <View className="flex items-center justify-between h-6 boderTop">
                <Text>支付方式</Text>
                <Text>{orderDetail?.payInfo?.payWayCode}</Text>
              </View>
              <View className="flex items-center justify-between h-6 boderTop">
                <Text>发货时间</Text>
                <Text>{orderDetail?.shippingInfo?.expectedShippingDate}</Text>
              </View>
              <View className="flex items-center justify-between h-6 boderTop">
                <Text>备注</Text>
                <Text>{orderDetail?.remark}</Text>
              </View>
            </AtCard>
          </View>
        </>
      ) : null}
    </View>
  )
}

export default OrderDetails
