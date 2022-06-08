import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { cancelOrder, completedOrder } from '@/framework/api/order/order'
import { pay } from '@/framework/api/payment/pay'
import Taro from '@tarojs/taro'
import routers from '@/routers/index'
import './index.less'

const OrderAction = ({
  amount,
  orderState,
  orderId,
  operationSuccess,
  openModalTip,
}: {
  orderState: string
  orderId: string
  operationSuccess: Function
  openModalTip: Function
  amount: number
}) => {
  const completed = async () => {
    const res = await completedOrder({
      orderNum: orderId,
      nowOrderState: orderState,
    })
    if (res) {
      operationSuccess && operationSuccess()
    }
  }

  const cancel = async () => {
    const res = await cancelOrder({
      orderNum: orderId,
      nowOrderState: orderState,
    })
    if (res) {
      operationSuccess && operationSuccess()
    }
  }

  return (
    <View>
      <View className="mt-2 flex justify-items-end items-center">
        {orderState === 'UNPAID' ? (
          <>
            <AtButton
              className="order-action-button border-gray-300"
              size="small"
              circle
              onClick={(e) => {
                e.stopPropagation()
                cancel()
              }}
            >
              取消订单
            </AtButton>
            <AtButton
              className="order-action-button text-primary-red border-red ml-3"
              size="small"
              circle
              onClick={(e) => {
                e.stopPropagation()
                let wxLoginRes = Taro.getStorageSync('wxLoginRes')

                pay({
                  params: {
                    customerId: wxLoginRes?.userInfo?.id || '',
                    customerOpenId: wxLoginRes?.customerAccount?.openId,
                    tradeId: orderId,
                    tradeNo: orderId,
                    tradeDescription: '商品',
                    payWayId: '241e2f4e-e975-6e14-a62a-71fcd435e7e9',
                    amount,
                    currency: 'CNY',
                    storeId: '12345678',
                    operator: wxLoginRes?.userInfo?.nickName || '',
                  },
                  success: function () {
                    Taro.redirectTo({
                      url: `${routers.orderList}?status=TO_SHIP`,
                    })
                  },
                })
              }}
            >
              立即付款
            </AtButton>
          </>
        ) : null}
        {orderState === 'TO_SHIP' ? (
          <AtButton
            className="order-action-button text-primary-red border-red ml-3"
            size="small"
            circle
            onClick={(e) => {
              e.stopPropagation()
              openModalTip && openModalTip()
            }}
          >
            提醒发货
          </AtButton>
        ) : null}
        {orderState === 'SHIPPED' ? (
          <AtButton
            className="order-action-button text-primary-red border-red ml-3"
            size="small"
            circle
            onClick={(e) => {
              e.stopPropagation()
              completed()
            }}
          >
            确认收货
          </AtButton>
        ) : null}
      </View>
    </View>
  )
}

export default OrderAction
