import Taro, { getCurrentInstance, getCurrentPages, useReachBottom } from '@tarojs/taro'
import { useState } from 'react'
import { AtModal, AtTabs, AtTabsPane } from 'taro-ui'
import OrderListComponents from '@/components/order/OrderListComponents'
import { cancelOrder, completedOrder, getOrderList } from '@/framework/api/order'
import { Order } from '@/framework/types/order'
import { View } from '@tarojs/components'
import routers from '@/routers'
import { cloneDeep } from 'lodash'
import NavBar from '@/components/common/Navbar'
import { session } from '@/utils/global'
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
  const { router } = getCurrentInstance()
  const [currentPage, setCurrentPage] = useState(0)
  const [isNoMore, setIsNoMore] = useState(false)
  const [firstIn, setFirstIn] = useState(true)
  const [curActionOrderId, setCurActionOrderId] = useState('')
  const [curActionType, setCurActionType] = useState('')
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
    const limit = 10
    if (isReload) {
      curPage = 0
      setOrderList([])
    } else {
      records = cloneDeep(orderList)
    }
    let offset = curPage ? curPage * limit : 0
    const res = await getOrderList({
      limit,
      offset,
      sample: orderState !== 'ALL' ? { orderState } : {},
    })
    setIsNoMore(res?.total < offset + 10)
    setOrderList(records.concat(res?.records))
    console.log('ddddddd1', new Date().getTime())
  }

  Taro.useDidShow(() => {
    let status = router?.params?.status || 'ALL'
    console.log('status', status)
    setCurrent(status)
    getOrderLists({ orderState: status, isReload: true })
    const isSendCoupon = router?.params?.isSendCoupon
    if (isSendCoupon && firstIn) {
      setCurActionType('sendCoupon')
      setShowActionTipModal(true)
      setFirstIn(false)
    }
    session.remove('cur-orderTab-status')
  })

  const handleClick = async (value) => {
    const cur = Object.values(OrderStatusEnum).filter((item) => item === value)[0]
    setCurrent(Object.keys(OrderStatusEnum)[cur])
    await getOrderLists({ orderState: Object.keys(OrderStatusEnum)[cur], isReload: true })
  }

  //取消订单
  const cancel = async () => {
    const res = await cancelOrder({
      orderNum: curActionOrderId,
      nowOrderState: curActionType,
    })
    if (res) {
      await getOrderLists({ isReload: true })
    }
  }

  //确认收货
  const completed = async () => {
    const res = await completedOrder({
      orderNum: curActionOrderId,
      nowOrderState: curActionType,
    })
    if (res) {
      await getOrderLists({ isReload: true })
    }
  }

  const handleClickActionTipModal = async () => {
    setShowActionTipModal(false)
    switch (curActionType) {
      case 'UNPAID':
        await cancel()
        break
      case 'TO_SHIP':
        break
      case 'SHIPPED':
        await completed()
        break
      case 'sendCoupon':
        await Taro.navigateTo({
          url: `${routers.voucherList}?voucherStatus=NOT_USED`,
        })
        break
      default:
        break
    }
  }

  const getModalContent = () => {
    let modalContent = ''
    switch (curActionType) {
      case 'UNPAID':
        modalContent = '确定要取消该订单吗？'
        break
      case 'TO_SHIP':
        modalContent = '已提醒发货，请耐心等待'
        break
      case 'SHIPPED':
        modalContent = '确定已经收到货物'
        break
      case 'sendCoupon':
        modalContent = '优惠券已发放到您的账户，请点击至我的卡包查看！'
        break
      default:
        break
    }
    return modalContent
  }

  return (
    <View>
      <NavBar
        navbarTitle={tabList[OrderStatusEnum?.[current]]?.title}
        isNeedBack
        backEvent={() => {
          const orderListRouters = getCurrentPages().filter((el) => el.route === routers.orderList.replace('/', ''))
          if(orderListRouters.length>1){
            Taro.navigateBack({ delta: orderListRouters.length })
          }else{
            Taro.navigateBack({ delta: 1 })
          }
        }}
      />
      <AtTabs
        className="order-list-tab bg-gray-eee"
        current={OrderStatusEnum[current]}
        tabList={tabList}
        onClick={handleClick}
        swipeable
      >
        {tabList.map((item, index) => (
          <AtTabsPane current={OrderStatusEnum[current]} index={index} key={item.title}>
            {index === OrderStatusEnum[current] ? (
              <OrderListComponents
                key={index}
                list={orderList}
                openModalTip={(orderId, orderStatus) => {
                  setShowActionTipModal(true)
                  setCurActionOrderId(orderId)
                  setCurActionType(orderStatus)
                }}
                curTabStatus={current}
              />
            ) : null}
          </AtTabsPane>
        ))}
      </AtTabs>
      <AtModal
        isOpened={showActionTipModal}
        title="确认"
        content={getModalContent()}
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
    </View>
  )
}

export default OrderList
