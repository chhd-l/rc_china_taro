import Taro, { getCurrentInstance } from '@tarojs/taro'
import { useState } from 'react'
import { AtTabs, AtTabsPane } from 'taro-ui'
import OrderListComponents from '@/components/order/OrderListComponents'
import './index.less'

const tabList = [{ title: '全部' }, { title: '待付款' }, { title: '待发货' }, { title: '待收货' }]
const OrderList = () => {
  const [current, setCurrent] = useState(0)
  const { router } = getCurrentInstance()

  Taro.useDidShow(() => {
    const index = Number(router?.params?.index) || 0
    console.log('index', index)
    setCurrent(index)
  })

  const handleClick = (value) => {
    Taro.setNavigationBarTitle({
      title: tabList[value].title,
    })
    setCurrent(value)
  }

  return (
    <AtTabs className="index" current={current} tabList={tabList} onClick={handleClick} swipeable>
      <AtTabsPane current={current} index={0}>
        <OrderListComponents list={['', '', '', '', '', '']} />
      </AtTabsPane>
      <AtTabsPane current={current} index={1}>
        <OrderListComponents list={['']} />
      </AtTabsPane>
      <AtTabsPane current={current} index={2}>
        <OrderListComponents list={['']} />
      </AtTabsPane>
      <AtTabsPane current={current} index={3}>
        <OrderListComponents list={['']} />
      </AtTabsPane>
    </AtTabs>
  )
}

export default OrderList
