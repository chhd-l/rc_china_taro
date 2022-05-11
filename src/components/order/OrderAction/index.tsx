import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { cancelOrder, completedOrder } from '@/framework/api/order/order'
import { pay } from '@/framework/api/payment/pay'
import { useAtom } from 'jotai'
import { customerAtom } from '@/store/customer'
import Taro from '@tarojs/taro'
import routers from '@/routers/index'
import './index.less'

const OrderAction = ({
  amount,
  remark,
  orderState,
  orderId,
  operationSuccess,
  openModalTip,
}: {
  orderState: string
  orderId: string
  operationSuccess: Function
  openModalTip: Function
  remark: string
  amount: number
}) => {
  const [customerInfo, setCustomerInfo] = useAtom(customerAtom)

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
              className="w-20 border-gray-300"
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
              className="w-20 text-red-500 border-red-500 ml-3"
              size="small"
              circle
              onClick={(e) => {
                e.stopPropagation()
                let wxLoginRes = Taro.getStorageSync('wxLoginRes')
                pay({
                  params: {
                    customerId: customerInfo?.id || '',
                    customerOpenId: wxLoginRes?.customerAccount?.openId,
                    tradeId: orderId,
                    tradeNo: orderId,
                    tradeDescription: '商品',
                    payWayId: '241e2f4e-e975-6e14-a62a-71fcd435e7e9',
                    amount,
                    currency: 'CNY',
                    storeId: '12345678',
                    operator: customerInfo?.nickName || '',
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
            className="w-20 text-red-500 border-red-500 ml-3"
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
            className="w-20 text-red-500 border-red-500 ml-3"
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
