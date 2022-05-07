import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { cancelOrder, completedOrder } from '@/framework/api/order/order'
import './index.less'
import { pay } from '@/framework/api/payment/pay'
import { useAtom } from 'jotai'
import { customerAtom } from '@/store/customer'

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
                pay({
                  customerId: customerInfo?.id || '',
                  customerOpenId: 'ocAZ55Ee1YSt10hODX4x0AwsQMKo',
                  tradeId: orderId,
                  tradeNo: orderId,
                  tradeDescription: remark,
                  payWayId: '241e2f4e-e975-6e14-a62a-71fcd435e7e9',
                  amount,
                  currency: 'CNY',
                  storeId: '12345678',
                  operator: 'zyq',
                })
                e.stopPropagation()
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
