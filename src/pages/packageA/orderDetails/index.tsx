import { View, Image, Text } from '@tarojs/components'
import { AtList, AtListItem, AtCard } from 'taro-ui'
import { useEffect, useState } from 'react'
import { getCurrentInstance } from '@tarojs/taro'
import { getExpressCompanyList, getOrderDetail } from '@/framework/api/order/order'
import { normalizeTags } from '@/framework/api/lib/normalize'
import { formatMoney, handleReturnTime } from '@/utils/utils'
import { Order } from '@/framework/types/order'
import OrderLogistics from '@/components/order/Logistics'
import { LOGISTICS_ORDER_ICON, ADDRESS_ORDER_ICON } from '@/lib/constants'
import './index.less'

const orderStatusType = {
  UNPAID: '交易待付款',
  TO_SHIP: '交易待发货',
  SHIPPED: '交易待收货',
  COMPLETED: '交易已完成',
  VOID: '交易已取消',
}

const OrderDetails = () => {
  const [showLogistic, setShowLogistic] = useState(false)
  const [orderId, setOrderId] = useState('')
  const { router } = getCurrentInstance()
  const [carrierTypes, setCarrierTypes] = useState<any[]>([])
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
    shippingInfo: {
      trackingId: '',
      deliveries: [],
    },
  })
  const { receiverName, phone, province, city, region, detail } = orderDetail?.shippingAddress
  const { totalPrice, discountsPrice } = orderDetail?.tradePrice
  const { trackingId, deliveries } = orderDetail?.shippingInfo

  const getOrder = async () => {
    const res = await getOrderDetail({ orderNum: orderId })
    setOrderDetail(res)
  }

  const getExpressCompanys = async () => {
    const res = await getExpressCompanyList()
    setCarrierTypes(res)
  }

  const getCarrierType = () => {
    const carriers = carrierTypes.filter((item) => item?.code === orderDetail?.shippingInfo?.shippingCompany)
    return carriers.length > 0 ? carriers[0].name : ''
  }

  useEffect(() => {
    if (router?.params?.id) {
      setOrderId(router.params.id)
    }
    getExpressCompanys()
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
                title={`物流公司：${getCarrierType()}`}
                note={`物流编号： ${trackingId || ''}`}
                arrow={trackingId ? 'right' : undefined}
                extraText={trackingId ? '查看' : ''}
                thumb={LOGISTICS_ORDER_ICON}
                onClick={() => {
                  setShowLogistic(!showLogistic)
                }}
              />
              {showLogistic && deliveries && deliveries?.length > 0 ? <OrderLogistics logistics={deliveries} /> : null}
              <AtListItem
                className="bg-white flex items-center h-14 mt-2"
                title={`${receiverName || ''} ${phone}`}
                note={`${province} ${city} ${region} ${detail}`}
                thumb={ADDRESS_ORDER_ICON}
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
                      <View className="flex flex-row flex-wrap">
                        {normalizeTags(el.goodsAttributeAndValues, el.feedingDays).map((tag) => (
                          <View className="px-1 border rounded-lg border-solid border-red-500 mr-2 mt-2">{tag}</View>
                        ))}
                      </View>
                      <View>X{el?.num}</View>
                    </View>
                    <View className="mt-2 ProductIntroduction">规格：{el?.goodsSpecifications}</View>
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
                <Text>{handleReturnTime(orderDetail?.tradeState?.createdAt)}</Text>
              </View>
              <View className="flex items-center justify-between h-6 boderTop">
                <Text>支付方式</Text>
                <Text>{'微信支付' || orderDetail?.payInfo?.payWayCode}</Text>
              </View>
              <View className="flex items-center justify-between h-6 boderTop">
                <Text>发货时间</Text>
                <Text>{handleReturnTime(orderDetail?.shippingInfo?.expectedShippingDate)?.split(' ')[0]}</Text>
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
