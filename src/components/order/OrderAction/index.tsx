import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { cancelOrder, completedOrder } from '@/framework/api/order/order'
import './index.less'

const OrderAction = ({
  orderState,
  orderId,
  operationSuccess,
  openModalTip,
}: {
  orderState: string
  orderId: string
  operationSuccess: Function
  openModalTip: Function
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
