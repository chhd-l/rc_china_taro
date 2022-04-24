import { View } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { Address, TradeItem, DeliveryTime, Remark, Coupon, TotalCheck, TradePrice } from '@/components/checkout'
// import { LineItem } from "@/framework/types/cart";
import Taro, { useDidHide } from '@tarojs/taro'
import { formatDate } from '@/utils/utils'
import { createOrder } from '@/framework/api/order/order'
import { AtMessage } from 'taro-ui'
import _ from 'lodash'
import routers from '@/routers/index'
import { getAddresses } from '@/framework/api/customer/address'
import './index.less'

const Checkout = () => {
  const [address, setAddress] = useState({ id: '' })
  const [tradeItems, setTradeItems] = useState<any[]>([])
  const [deliveryTime, setDeliveryTime] = useState(formatDate(new Date()))
  const [remark, setRemark] = useState('')
  const [totalNum, setTotalNum] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(false)

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
    try {
      setLoading(true)
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
      let shoppingCartIds: any[] = []
      tradeItems.map((el) => {
        if (el?.id !== null && el.id !== undefined) {
          shoppingCartIds.push(el.id)
        }
      })
      const addressInfo = _.omit(address, ['id', 'customerId', 'storeId'])
      const params = {
        goodsList,
        addressInfo,
        remark,
        shoppingCartIds: shoppingCartIds.length > 0 ? shoppingCartIds : [''],
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
        Taro.switchTab({
          url: routers.cart,
        })
      } else {
        Taro.atMessage({
          message: '系统繁忙，请稍后再试',
          type: 'error',
        })
      }
    } catch (e) {
      Taro.atMessage({
        message: '系统繁忙，请稍后再试',
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  useDidHide(() => {
    console.log(1111111)
    Taro.removeStorage({ key: 'select-product' })
    Taro.removeStorage({ key: 'select-address' })
  })

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
      success: async function (res) {
        if (res.data) {
          setAddress(JSON.parse(res.data))
        } else {
          const addresses = await getAddresses()
          const defaultAddress = (addresses || []).filter((item) => item.isDefault)
          if (defaultAddress.length > 0) {
            setAddress(defaultAddress[0])
          }
        }
      },
    })
  }, [])

  return (
    <View className="index py-2">
      <View className="px-4 bg-gray-50 rounded">
        <Address address={address} />
        <View className="bg-gray-50 pb-2 mt-2 rounded">
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
        <TotalCheck num={totalNum} totalPrice={totalPrice} checkNow={checkNow} loading={loading} />
      </View>
      <AtMessage />
    </View>
  )
}

export default Checkout
