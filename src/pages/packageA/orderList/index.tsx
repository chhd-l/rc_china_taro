import Taro, { getCurrentInstance } from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { AtTabs, AtTabsPane } from 'taro-ui'
import OrderListComponents from '@/components/order/OrderListComponents'
import { getOrderList } from '@/framework/api/order/order'
import { Order } from '@/framework/types/order'
import './index.less'

const tabList = [{ title: '全部' }, { title: '待付款' }, { title: '待发货' }, { title: '待收货' }]

const OrderList = () => {
  const [current, setCurrent] = useState(0)
  const [orderList, setOrderList] = useState<Order[]>([])
  const { router } = getCurrentInstance()

  const getOrderLists = async () => {
    const res = await getOrderList({
      storeId: '12345678',
      operator: 'zz',
      limit: 10,
      offset: 0,
      isNeedTotal: true,
      sample: {},
    })
    console.log('order list data', res)
    setOrderList(res?.records)
  }

  useEffect(() => {
    getOrderLists()
  }, [])

  Taro.useDidShow(() => {
    const index = Number(router?.params?.index) || 0
    console.log('index', index)
    setCurrent(index)
  })

  const handleClick = (value) => {
    setCurrent(value)
  }

  return (
    <AtTabs className="index" current={current} tabList={tabList} onClick={handleClick} swipeable>
      {tabList.map((item, index) => (
        <AtTabsPane current={current} index={index}>
          {orderList.length > 0 ? <OrderListComponents list={orderList} /> : null}
        </AtTabsPane>
      ))}
    </AtTabs>
  )
}

export default OrderList
