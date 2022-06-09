import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.less'

const OrderAction = ({
  orderState,
  openModalTip,
  payNow,
}: {
  orderState: string
  openModalTip: Function
  payNow: Function
}) => {
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
                openModalTip && openModalTip()
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
                payNow && payNow()
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
              openModalTip && openModalTip()
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
