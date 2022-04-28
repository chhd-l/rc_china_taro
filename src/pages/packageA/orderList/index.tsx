import Taro, { getCurrentInstance } from '@tarojs/taro'
import { useState } from 'react'
import { AtModal, AtTabs, AtTabsPane } from 'taro-ui'
import OrderListComponents from '@/components/order/OrderListComponents'
import { getOrderList } from '@/framework/api/order/order'
import { Order } from '@/framework/types/order'
import { View } from '@tarojs/components'
import './index.less'

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
  const { router } = getCurrentInstance()

  const getOrderLists = async (status) => {
    const res = await getOrderList({
      storeId: '12345678',
      operator: 'zz',
      limit: 10,
      offset: 0,
      isNeedTotal: true,
      sample: Object.assign({}, status !== 'ALL' ? { orderState: status } : {}),
    })
    console.log('order list data', res)
    setOrderList(res?.records)
  }

  Taro.useDidShow(() => {
    const status = router?.params?.status || 'ALL'
    console.log('status', status)
    setCurrent(status)
    getOrderLists(status)
  })

  const handleClick = (value) => {
    Taro.setNavigationBarTitle({
      title: tabList[value].title,
    })
    const cur=Object.values(OrderStatusEnum).filter((item)=>item===value)[0]
    setCurrent(Object.keys(OrderStatusEnum)[cur])
    getOrderLists(Object.keys(OrderStatusEnum)[cur])
  }

  return (
    <View>
      <AtTabs className="index" current={OrderStatusEnum[current]} tabList={tabList} onClick={handleClick} swipeable>
        {tabList.map((item, index) => (
          <AtTabsPane current={OrderStatusEnum[current]} index={index} key={item.title}>
            {orderList.length > 0 ? (
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
        content='已提醒发货，请耐心等待'
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
    </View>
  )
}

export default OrderList
