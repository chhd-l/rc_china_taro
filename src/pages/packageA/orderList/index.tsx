import Taro, { getCurrentInstance } from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { AtModal, AtTabs, AtTabsPane } from 'taro-ui'
import OrderListComponents from '@/components/order/OrderListComponents'
import { getOrderList } from '@/framework/api/order/order'
import { Order } from '@/framework/types/order'
import { View } from '@tarojs/components'
import './index.less'
import routers from '@/routers'

const tabList = [{ title: '全部' }, { title: '待付款' }, { title: '待发货' }, { title: '待收货' }]

const OrderStatusEnum = {
  ALL: 0,
  UNPAID: 1,
  TO_SHIP: 2,
  SHIPPED: 3,
}

const OrderList = () => {
  const [current, setCurrent] = useState('ALL')
  const [orderList, setOrderList] = useState<Order[]>([])
  const [showShipModal, setShowShipModal] = useState(false)
  const [showSendCouponModal, setShowSendCouponModal] = useState(false)
  const { router } = getCurrentInstance()
  const [isFromSubscription, setIsFromSubscription] = useState(false)
  const getOrderLists = async (status) => {
    const customerInfo = Taro.getStorageSync('wxLoginRes').userInfo
    const res = await getOrderList({
      storeId: '12345678',
      operator: 'zz',
      limit: 10,
      offset: 0,
      isNeedTotal: true,
      sample: Object.assign(
        {
          customerId: customerInfo.id,
        },
        status !== 'ALL' ? { orderState: status } : {},
      ),
    })
    console.log('order list data', res)
    setOrderList(res?.records)
  }

  Taro.useDidShow(() => {
    const status = router?.params?.status || 'ALL'
    const isFromSubscription = router?.params?.isFromSubscription
    console.log('status', status)
    console.log('isFromSubscription', isFromSubscription)
    setIsFromSubscription(!!isFromSubscription)
    setCurrent(status)
    getOrderLists(status)
  })
  useEffect(() => {
    const isSendCoupon = router?.params?.isSendCoupon
    if (isSendCoupon) {
      setShowSendCouponModal(true)
    }
  }, [])

  const handleClick = (value) => {
    Taro.setNavigationBarTitle({
      title: tabList[value].title,
    })
    const cur = Object.values(OrderStatusEnum).filter((item) => item === value)[0]
    setCurrent(Object.keys(OrderStatusEnum)[cur])
    getOrderLists(Object.keys(OrderStatusEnum)[cur])
  }
  console.info('showSendCouponModal', showSendCouponModal)
  return (
    <View>
      <AtTabs className="index" current={OrderStatusEnum[current]} tabList={tabList} onClick={handleClick} swipeable>
        {tabList.map((item, index) => (
          <AtTabsPane current={OrderStatusEnum[current]} index={index} key={item.title}>
            {orderList?.length > 0 ? (
              <OrderListComponents
                list={orderList}
                operationSuccess={() => {
                  getOrderLists(current)
                }}
                openModalTip={() => {
                  setShowShipModal(true)
                }}
              />
            ) : null}
          </AtTabsPane>
        ))}
      </AtTabs>
      <AtModal
        key="orderShipTip"
        isOpened={showShipModal}
        title="提示"
        content="已提醒发货，请耐心等待"
        confirmText="确定"
        onClose={() => {
          setShowShipModal(false)
        }}
        onCancel={() => {
          setShowShipModal(false)
        }}
        onConfirm={() => {
          setShowShipModal(false)
        }}
        className="order-to-ship-modal"
      />
      <AtModal
        key="orderShipTip"
        isOpened={showSendCouponModal}
        title="温馨提示提示"
        content="您己获得相应线下门店服务券，请点击至我的卡包查看！"
        cancelText='取消'
        confirmText="确定"
        onClose={() => {
          setShowSendCouponModal(false)
        }}
        onCancel={() => {
          setShowSendCouponModal(false)
        }}
        onConfirm={() => {
          let url = `${routers.voucherList}?status=NOT_USED`
          Taro.navigateTo({
            url,
          })
          setShowSendCouponModal(false)
        }}
        className="order-to-ship-modal"
      />
    </View>
  )
}

export default OrderList
