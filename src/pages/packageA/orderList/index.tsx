import Taro, { getCurrentInstance, useReachBottom } from '@tarojs/taro'
import { useState } from 'react'
import { AtModal, AtTabs, AtTabsPane } from 'taro-ui'
import OrderListComponents from '@/components/order/OrderListComponents'
import { cancelOrder, completedOrder, getOrderList } from '@/framework/api/order/order'
import { Order } from '@/framework/types/order'
import { View } from '@tarojs/components'
import routers from '@/routers'
import { cloneDeep } from 'lodash'
import NavBar from '@/components/common/Navbar'
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
  const [showSendCouponModal, setShowSendCouponModal] = useState(false)
  const { router } = getCurrentInstance()
  const [isFromSubscription, setIsFromSubscription] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [isNoMore, setIsNoMore] = useState(false)
  const [firstIn, setFirstIn] = useState(true)
  const [curActionOrderId, setCurActionOrderId] = useState('')
  const [showActionTipModal, setShowActionTipModal] = useState(false)

  useReachBottom(() => {
    if (!isNoMore) {
      let page = currentPage + 1
      setCurrentPage(page)
      getOrderLists({ curPage: page })
    }
  })

  const getOrderLists = async ({ orderState = current, curPage = currentPage, isReload = false }) => {
    let records: any[] = []
    if (isReload) {
      curPage = 0
    } else {
      records = cloneDeep(orderList)
    }
    let offset = curPage ? curPage * 10 : 0
    const customerInfo = Taro.getStorageSync('wxLoginRes').userInfo
    const res = await getOrderList({
      storeId: '12345678',
      operator: 'zz',
      limit: 10,
      offset,
      isNeedTotal: true,
      sample: Object.assign(
        {
          customerId: customerInfo.id,
        },
        orderState !== 'ALL' ? { orderState } : {},
      ),
    })
    const isSendCoupon = router?.params?.isSendCoupon
    if (isSendCoupon && firstIn) {
      setShowSendCouponModal(true)
      setFirstIn(false)
    }
    console.log('order list data', res)
    if (res?.total < offset + 10) {
      setIsNoMore(true)
    } else {
      setIsNoMore(false)
    }
    setOrderList(records.concat(res?.records))
  }

  Taro.useDidShow(() => {
    const status = router?.params?.status || 'ALL'
    const isFromSubscriptionOrder = router?.params?.isFromSubscription
    console.log('status', isFromSubscription)
    console.log('isFromSubscription', isFromSubscriptionOrder)
    setIsFromSubscription(!!isFromSubscriptionOrder)
    setCurrent(status)
    getOrderLists({ orderState: status })
  })

  const handleClick = async (value) => {
    await Taro.setNavigationBarTitle({
      title: tabList[value].title,
    })
    const cur = Object.values(OrderStatusEnum).filter((item) => item === value)[0]
    setCurrent(Object.keys(OrderStatusEnum)[cur])
    await getOrderLists({ orderState: Object.keys(OrderStatusEnum)[cur], isReload: true })
  }
  console.info('showSendCouponModal', showSendCouponModal)

  //取消订单
  const cancel = async () => {
    const res = await cancelOrder({
      orderNum: curActionOrderId,
      nowOrderState: current,
    })
    if (res) {
      await getOrderLists({ isReload: true })
    }
  }

  //确认收货
  const completed = async () => {
    const res = await completedOrder({
      orderNum: curActionOrderId,
      nowOrderState: current,
    })
    if (res) {
      await getOrderLists({ isReload: true })
    }
  }

  const handleClickActionTipModal = async () => {
    switch (current) {
      case 'UNPAID':
        await cancel()
        break
      case 'TO_SHIP':
        break
      case 'SHIPPED':
        await completed()
        break
      default:
        break
    }
    setShowActionTipModal(false)
  }

  return (
    <View>
      <NavBar navbarTitle={tabList[OrderStatusEnum[current]].title} isNeedBack />
      <AtTabs
        className="order-list-tab bg-gray-eee"
        current={OrderStatusEnum[current]}
        tabList={tabList}
        onClick={handleClick}
        swipeable
      >
        {tabList.map((item, index) => (
          <AtTabsPane current={OrderStatusEnum[current]} index={index} key={item.title}>
            {orderList?.length > 0 ? (
              <OrderListComponents
                list={orderList}
                openModalTip={(orderId) => {
                  setShowActionTipModal(true)
                  setCurActionOrderId(orderId)
                }}
              />
            ) : null}
          </AtTabsPane>
        ))}
      </AtTabs>
      <AtModal
        isOpened={showActionTipModal}
        title="确认"
        content={
          current === 'UNPAID'
            ? '确定要取消该订单吗？'
            : current === 'TO_SHIP'
            ? '已提醒发货，请耐心等待'
            : current === 'SHIPPED'
            ? '确定已经收到货物'
            : ''
        }
        cancelText="取消"
        confirmText="确定"
        onClose={() => {
          setShowActionTipModal(false)
        }}
        onCancel={() => {
          setShowActionTipModal(false)
        }}
        onConfirm={() => handleClickActionTipModal()}
        className="rc_modal"
      />
      <AtModal
        key="orderShipTip"
        isOpened={showSendCouponModal}
        title="提示"
        content="优惠券已发放到您的账户，请点击至我的卡包查看！"
        cancelText="取消"
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
        className="rc_modal"
      />
    </View>
  )
}

export default OrderList
