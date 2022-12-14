import { View, Image, Text, ScrollView } from '@tarojs/components'
import { AtList, AtListItem, AtCard, AtCountdown, AtIcon } from 'taro-ui'
import { useEffect, useState } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { getExpressCompanyList, getOrderDetail, getOrderSetting } from '@/framework/api/order'
import { normalizeTags } from '@/framework/api/lib/normalize'
import { formatMoney, getDateDiff, handleReturnTime } from '@/utils/utils'
import { Order } from '@/framework/types/order'
import OrderLogistics from '@/components/order/Logistics'
import { LOGISTICS_ORDER_ICON, ADDRESS_ORDER_ICON } from '@/lib/constants'
import IconFont from '@/iconfont'
import NavBar from '@/components/common/Navbar'
import {session} from "@/utils/global";
import routers from "@/routers";
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
    orderPrice: {
      productPrice: 0,
      deliveryPrice: 0,
      totalPrice: 0,
      discountsPrice: 0,
      vipDiscountsPrice: 0,
    },
    delivery: {
      trackingId: '',
      deliveryItems: [],
    },
  })
  const { receiverName, phone, province, city, region, detail } = orderDetail?.shippingAddress
  const { totalPrice, discountsPrice, productPrice, vipDiscountsPrice, deliveryPrice } = orderDetail?.orderPrice
  const { trackingId, deliveryItems: deliveries } = orderDetail?.delivery
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [orderCancelMinute, setOrderCancelMinute] = useState(30)

  const getTimeCount = () => {
    const time = getDateDiff(orderDetail?.orderState?.createdAt, new Date(), orderCancelMinute)
    return {
      minutes: Number(time.minute.toFixed(0)),
      seconds: Number(time.second.toFixed(0)),
    }
  }

  const getOrderCancelTime = async () => {
    const res = await getOrderSetting()
    const orderCancelSetting = res.filter((item) => item.code === 'order_超时时间')
    const orderCancelTime = orderCancelSetting.length > 0 ? Number(orderCancelSetting[0].context) : 30
    setOrderCancelMinute(orderCancelTime)
    return orderCancelTime
  }

  const getOrder = async (id = orderId) => {
    const res = await getOrderDetail({ orderNum: id })
    setOrderDetail(res)
    const orderCancelTime = await getOrderCancelTime()
    const time = getDateDiff(res?.orderState?.createdAt, new Date(), orderCancelTime)
    setMinutes(Number(time.minute))
    setSeconds(Number(time.second.toFixed(0)))
    console.log(Number(time.minute), Number(time.second.toFixed(0)))
  }

  const getExpressCompanys = async () => {
    const res = await getExpressCompanyList()
    setCarrierTypes(res)
  }

  const getCarrierType = () => {
    const carriers = carrierTypes.filter((item) => item?.code === orderDetail?.delivery?.shippingCompany)
    return carriers.length > 0 ? carriers[0].name : ''
  }

  useEffect(() => {
    if (router?.params?.id) {
      setOrderId(router.params.id)
      getOrder(router.params.id)
    }
    getExpressCompanys()
  }, [])

  return (
    <>
      <NavBar navbarTitle="订单详情" isNeedBack backEvent={()=>{
        if(session.get('cur-orderTab-status')){
          Taro.redirectTo({url:`${routers.orderList}?status=${session.get('cur-orderTab-status')}`})
        }else{
          Taro.navigateBack({ delta: 1 })
        }
      }}/>
      <ScrollView scrollY overflow-anchor={false}>
        <View className="OrderDetails">
          {orderDetail?.orderNumber ? (
            <>
              <View className="flex flex-col items-center justify-center w-full h-20 bg-red-600 text-white mb-2 pt-6">
                <View className="font-bold">{orderStatusType[orderDetail?.orderState?.orderState || '']}</View>
                {orderDetail?.orderState?.orderState === 'UNPAID' && (minutes !== 0 || seconds !== 0) ? (
                  <View>
                    <AtCountdown
                      format={{ hours: ':', minutes: ':', seconds: '' }}
                      minutes={getTimeCount().minutes}
                      seconds={getTimeCount().seconds}
                    />
                    后取消订单
                  </View>
                ) : null}
              </View>
              <View className="bodyContext">
                <AtList className="ListBg">
                  {trackingId ? (
                    <AtListItem
                      className="bg-white flex items-center h-16 mt-2 rc-order-list-item"
                      title={`物流公司：${getCarrierType()}`}
                      note={`物流编号： ${trackingId || ''}`}
                      arrow="right"
                      extraText="查看"
                      thumb={LOGISTICS_ORDER_ICON}
                      onClick={() => {
                        setShowLogistic(!showLogistic)
                      }}
                    />
                  ) : null}
                  {showLogistic && deliveries && deliveries?.length > 0 ? (
                    <OrderLogistics logistics={deliveries} />
                  ) : null}
                  <AtListItem
                    className="bg-white flex items-center h-16 mt-2"
                    title={`${receiverName || ''} ${phone}`}
                    note={`${province} ${city} ${region} ${detail}`}
                    thumb={ADDRESS_ORDER_ICON}
                  />
                </AtList>
                <AtCard
                  className="m-0 mt-2 border-0"
                  title="订单信息"
                  renderIcon={
                    orderDetail.isSubscription ? (
                      <View className="mr-2">
                        <IconFont name="a-Group201" size={44} />
                      </View>
                    ) : (
                      <View></View>
                    )
                  }
                >
                  {(orderDetail?.lineItem?.filter((el) => !el.isGift) || []).map((el, idx) => (
                    <View key={idx} className="w-full h-20 flex mb-4">
                      <View className="w-28 h-full">
                        <Image className="w-full h-full" src={el?.pic} />
                      </View>
                      <View className="w-full h-full flex flex-col pl-3">
                        <View className="text-xs font-black mb-1">{el?.skuName}</View>
                        <View className="text-primary-red flex ProductIntroduction justify-between items-center">
                          <View className="flex flex-row flex-wrap">
                            {normalizeTags(el.productAttributeAndValues, el.feedingDays).map((tag) => (
                              <View
                                className="px-1 border rounded-lg border-solid border-red mr-2 mt-2"
                                style={{ borderWidth: '1PX' }}
                              >
                                {tag}
                              </View>
                            ))}
                          </View>
                          <View className="numcolor">X{el?.num}</View>
                        </View>
                        <View className="mt-2 ProductIntroduction numcolor">规格：{el?.productSpecifications}</View>
                        {orderDetail.freshType === 'FRESH_100_DAYS' ? (
                          <View className="mt-1 ProductIntroduction numcolor">新鲜度：100天</View>
                        ) : null}
                      </View>
                    </View>
                  ))}
                  {orderDetail?.lineItem?.filter((el) => el.isGift)?.length ? (
                    <View style={{ borderTop: '1rpx solid #e8e8e8', marginBottom: '18rpx' }} />
                  ) : null}
                  {(orderDetail?.lineItem?.filter((el) => el.isGift) || []).map((el, idx) => (
                    <View key={idx} className="w-full h-20 flex mb-4">
                      <View className="w-20 h-full">
                        <Image className="w-full" mode="widthFix" src={el?.pic} />
                      </View>
                      <View className="w-full h-full flex flex-col pl-3">
                        <View className="text-xs font-black mb-1">
                          {el?.skuName}
                          <Text className="px-1 text-22 font-normal bg-primary-red text-white ml-1 whitespace-nowrap">
                            赠品
                          </Text>
                        </View>
                        <View className="flex ProductIntroduction justify-between items-center">
                          <View className="flex flex-row flex-wrap">
                            {/* {normalizeTags(el.productAttributeAndValues, el.feedingDays).map((tag) => (
                            <View style={{ borderColor: '#e8e8e8' }} className="px-1 border rounded-lg border-solid numcolor mr-2 mt-2">{tag}</View>
                          ))} */}
                          </View>
                          <View className="numcolor">X{el?.num}</View>
                        </View>
                        {el?.productSpecifications ? (
                          <View className="mt-2 ProductIntroduction numcolor">规格：{el?.productSpecifications}</View>
                        ) : null}
                      </View>
                    </View>
                  ))}
                  <View className="w-full h-8 footerText flex items-end flex-col">
                    <View className="text-right">
                      共{orderDetail?.lineItem?.length}件商品 总价{formatMoney(productPrice + deliveryPrice)}，优惠
                      {formatMoney(discountsPrice + vipDiscountsPrice)}，实付款
                      <Text className="text-primary-red text-28">{formatMoney(totalPrice)}</Text>
                    </View>
                  </View>
                  <View className="flex items-center justify-between boderTop">
                    <Text>订单编号</Text>
                    <Text>{orderDetail.orderNumber}</Text>
                  </View>
                  {orderDetail.isSubscription && (
                    <View className="flex items-center justify-between boderTop">
                      <Text>订阅编号</Text>
                      <Text
                        className="text-rc22 arrow"
                        onClick={() => {
                          debugger
                          if (
                            orderDetail?.orderState?.orderState === 'UNPAID' ||
                            orderDetail?.orderState?.orderState === 'VOID'
                          ) {
                            return
                          }
                          Taro.navigateTo({
                            url: `/pages/packageB/deliveryManagement/index?id=${orderDetail?.subscriptionId}`,
                          })
                        }}
                      >
                        {orderDetail.subscriptionNo}
                        <AtIcon value="chevron-right" size="14" />
                      </Text>
                    </View>
                  )}
                  <View className="flex items-center justify-between boderTop">
                    <Text>下单时间</Text>
                    <Text>{handleReturnTime(orderDetail?.orderState?.createdAt)}</Text>
                  </View>
                  <View className="flex items-center justify-between boderTop">
                    <Text>支付方式</Text>
                    <Text>{'微信支付' || orderDetail?.payment?.payWayCode}</Text>
                  </View>
                  <View className="flex items-center justify-between boderTop">
                    <Text>发货时间</Text>
                    <Text>{handleReturnTime(orderDetail?.delivery?.expectedShippingDate)?.split(' ')[0]}</Text>
                  </View>
                  <View className="flex items-center justify-between boderTop break-words">
                    <Text>备注</Text>
                    <Text style={{ wordWrap: 'break-word', width: '70%',textAlign:'right' }}>{orderDetail?.remark}</Text>
                  </View>
                </AtCard>
              </View>
            </>
          ) : null}
        </View>
      </ScrollView>
    </>
  )
}

export default OrderDetails
