import { View } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { Address, TradeItem, DeliveryTime, Remark, Coupon, TotalCheck, TradePrice } from '@/components/checkout'
// import { LineItem } from "@/framework/types/cart";
import Taro from '@tarojs/taro'
import { formatDate } from '@/utils/utils'
import { createOrder } from '@/framework/api/order/order'
// import { getCustomer } from '@/framework/api/customer/customer'
import { AtMessage } from 'taro-ui'
import _ from 'lodash'
import './index.less'

const Checkout = () => {
  const [address, setAddress] = useState({ id: '' })
  const [tradeItems, setTradeItems] = useState<any[]>([])
  const [deliveryTime, setDeliveryTime] = useState(formatDate(new Date()))
  const [remark, setRemark] = useState('')
  const [totalNum, setTotalNum] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const changeDeliveryDate = (value) => {
    setDeliveryTime(value)
  }

  const changeRemark = (value) => {
    setRemark(value)
  }

  const getTotalNum = () => {
    const total = tradeItems.reduce((prev, cur) => {
      return prev + cur.goodsNum
    }, 0)
    setTotalNum(total)
  }
  const getTotalPrice = () => {
    const total = tradeItems.reduce((prev, cur) => {
      return prev + cur.goodsNum * cur.localData.price
    }, 0)
    setTotalPrice(total)
  }

  const checkNow = async () => {
    const goodsList = tradeItems.map((el) => {
      el.skuGoodInfo.goodsVariants = Object.assign(el.skuGoodInfo.goodsVariants[0], {
        num: el.goodsNum,
        id: el.goodsId || '',
      })
      el.skuGoodInfo.goodsSpecifications = el.skuGoodInfo.goodsSpecifications.map((item) => {
        return Object.assign(item, { goodsId: item.id })
      })
      return el.skuGoodInfo
    })
    let shoppingCartIds:any[] = []
    tradeItems.map((el) => {
      if(el?.id!==null&&el.id!==undefined){
        shoppingCartIds.push(el.id)
      }
    })
    const addressInfo = _.omit(address, ['id', 'customerId', 'storeId'])
    const params = {
      goodsList,
      addressInfo,
      remark,
      // shoppingCartIds,
      shoppingCartIds:shoppingCartIds.length>0?shoppingCartIds:[''],
      operator: 'test用户001',
      expectedShippingDate: new Date(deliveryTime).toISOString(),
      isSubscription: false,
    }
    console.log('create order params', params)
    const res = await createOrder(params)
    if (res.createOrder) {
      Taro.atMessage({
        message: '下单成功',
        type: 'success',
      })
      // Taro.removeStorage({ key: 'select-product' })
      Taro.switchTab({
        url: '/pages/cart/index',
        success: () => {
          // const page = Taro.getCurrentPages()[0] //当前页面
          // if (page === undefined || page === null) return
          // page.onLoad() //或者其它操作
        },
      })
    }
  }

  useEffect(() => {
    getTotalNum()
    getTotalPrice()
  }, [tradeItems])

  useEffect(() => {
    Taro.getStorage({
      key: 'select-product',
      success: function (res) {
        setTradeItems(JSON.parse(res.data))
      },
    })
    Taro.getStorage({
      key: 'select-address',
      success: function (res) {
        if (res.data) {
          setAddress(JSON.parse(res.data))
        }
      },
    })
  }, [])

  return (
    <View className="index py-2">
      <View className="px-4">
        <Address address={address} />
        <View className="bg-gray-50 pb-2 mt-2">
          <TradeItem tradeItems={tradeItems} />
          <View className="px-2">
            <DeliveryTime changeDeliveryDate={changeDeliveryDate} />
            <Coupon />
            <Remark changeRemark={changeRemark} />
          </View>
        </View>
        <TradePrice totalPrice={totalPrice} discountPrice={0} shipPrice={0} />
      </View>
      <View className="fixed bottom-0 w-full">
        <TotalCheck num={totalNum} totalPrice={totalPrice} checkNow={checkNow} />
      </View>
      <AtMessage />
    </View>
  )
}

export default Checkout
