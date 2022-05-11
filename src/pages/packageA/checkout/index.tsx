import { View } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { Address, TradeItem, DeliveryTime, Remark, Coupon, TotalCheck, TradePrice } from '@/components/checkout'
// import { LineItem } from "@/framework/types/cart";
import Taro, { useDidHide } from '@tarojs/taro'
import { formatDate } from '@/utils/utils'
import { createOrder, getOrderSetting } from '@/framework/api/order/order'
import { AtMessage, AtModal } from 'taro-ui'
import omit from 'lodash/omit'
import routers from '@/routers/index'
import { getAddresses } from '@/framework/api/customer/address'
import { pay } from '@/framework/api/payment/pay'
import { useAtom } from 'jotai'
import { customerAtom } from '@/store/customer'
import { session } from '@/utils/global'
import './index.less'

const Checkout = () => {
  const [customerInfo] = useAtom(customerAtom)
  const [address, setAddress] = useState({ id: '' })
  const [tradeItems, setTradeItems] = useState<any[]>([])
  const [deliveryTime, setDeliveryTime] = useState(formatDate(new Date()))
  const [remark, setRemark] = useState('')
  const [totalNum, setTotalNum] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(false)
  const [shippingPrice, setShippingPrice] = useState(0)
  const [showNoAddressTip, setShowNoAddressTip] = useState(false)

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
    setTotalPrice(total + shippingPrice)
  }

  const checkNow = async () => {
    try {
      if (address.id === '') {
        setShowNoAddressTip(true)
        return false
      }
      setLoading(true)
      const goodsList = tradeItems.map((el) => {
        if (el.skuGoodInfo.goodsVariants?.length > 0) {
          el.skuGoodInfo.goodsVariants = Object.assign(el.skuGoodInfo.goodsVariants[0], {
            num: el.goodsNum,
            id: el.goodsId || '',
          })
        }
        el.skuGoodInfo.goodsSpecifications = el.skuGoodInfo.goodsSpecifications?.map((item) => {
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
      const addressInfo = omit(address, ['customerId', 'storeId', 'isDefault'])
      const user = Taro.getStorageSync('wxLoginRes').userInfo
      let wxLoginRes = Taro.getStorageSync('wxLoginRes')
      const params = {
        goodsList,
        addressInfo: addressInfo.id !== '' ? addressInfo : null,
        remark,
        shoppingCartIds: shoppingCartIds.length > 0 ? shoppingCartIds : [''],
        expectedShippingDate: new Date(deliveryTime).toISOString(),
        isSubscription: false,
        customerInfo: {
          id: user.id,
          avatarUrl: user.avatarUrl,
          level: user.level,
          phone: user.phone,
          nickName: user.nickName,
          name: user.name,
        },
        operator: user.nickName,
        wxUserInfo: {
          nickName: user.nickName,
          unionId: wxLoginRes?.customerAccount?.unionId,
          openId: wxLoginRes?.customerAccount?.openId,
        },
      }
      console.log('create order params', params)
      const res = await createOrder(params)
      if (res.createOrder) {
        console.log(res, 'ressssss')
        // Taro.atMessage({
        //   message: '下单成功',
        //   type: 'success',
        // })
        Taro.removeStorageSync('select-product')
        //下单成功处理购物车数据
        let cartProducts = session.get('cart-data') || []
        cartProducts.map((el, index) => {
          tradeItems.map((item) => {
            if (item.id === el.id) {
              cartProducts.splice(index, 1)
            }
          })
        })
        session.set('cart-data', cartProducts)
        pay({
          params: {
            customerId: customerInfo?.id || '',
            customerOpenId: wxLoginRes?.customerAccount?.openId,
            tradeId: res.createOrder?.orderNumber,
            tradeNo: res.createOrder?.orderNumber,
            tradeDescription: '商品',
            payWayId: '241e2f4e-e975-6e14-a62a-71fcd435e7e9',
            amount: res.createOrder?.tradePrice.totalPrice * 100,
            currency: 'CNY',
            storeId: '12345678',
            operator: customerInfo?.nickName || '',
          },
          success: () => {
            Taro.redirectTo({
              url: `${routers.orderList}?status=TO_SHIP`,
            })
          },
          fail: () => {
            Taro.redirectTo({
              url: `${routers.orderList}?status=UNPAID`,
            })
          },
        })
      } else {
        Taro.atMessage({
          message: '系统繁忙，请稍后再试',
          type: 'error',
        })
      }
    } catch (e) {
      console.log('create order err', e)
      Taro.atMessage({
        message: '系统繁忙，请稍后再试',
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const getShippingPrice = async () => {
    const res = await getOrderSetting()
    const shippingSetting = res.filter((item) => item.code === 'order_运费')
    const shipPrice = shippingSetting.length > 0 ? Number(shippingSetting[0].context) : 0
    setShippingPrice(shipPrice)
  }

  useDidHide(() => {
    console.log('1111111')
    Taro.removeStorageSync('select-address')
  })

  useEffect(() => {
    getTotalNum()
    getTotalPrice()
  }, [tradeItems, shippingPrice])

  const getDefaultAddress = async () => {
    const selectAddress = Taro.getStorageSync('select-address')
    if (selectAddress) {
      setAddress(JSON.parse(selectAddress))
    } else {
      // const customerInfo = Taro.getStorageSync('wxLoginRes').userInfo
      const addresses = await getAddresses({ customerId: customerInfo?.id || '' })
      const defaultAddress = (addresses || []).filter((item) => item.isDefault)
      if (defaultAddress.length > 0) {
        setAddress(defaultAddress[0])
      }
    }
  }

  useEffect(() => {
    Taro.getStorage({
      key: 'select-product',
      success: function (res) {
        setTradeItems(JSON.parse(res.data))
      },
    })
    getDefaultAddress()
    getShippingPrice()
  }, [])

  return (
    <View className="index py-2" style={{ marginBottom: '75rpx' }}>
      <View className="px-4 bg-white">
        <View className="bggray pb-2 mt-2 rounded">
          <Address address={address} />
        </View>
        <View className="bggray pb-2 px-2 rounded">
          <TradeItem tradeItems={tradeItems} />
          <View>
            <DeliveryTime changeDeliveryDate={changeDeliveryDate} />
            <Coupon />
            <Remark changeRemark={changeRemark} />
          </View>
        </View>
        <View>
          <TradePrice totalPrice={totalPrice} discountPrice={0} shipPrice={shippingPrice} />
        </View>
      </View>
      <View className="fixed bottom-0 w-full">
        <TotalCheck num={totalNum} totalPrice={totalPrice} checkNow={checkNow} loading={loading} />
      </View>
      <AtMessage />
      <AtModal
        key="noAddressTip"
        isOpened={showNoAddressTip}
        title="提示"
        content="请填写收货地址"
        confirmText="确定"
        onClose={() => {
          setShowNoAddressTip(false)
        }}
        onCancel={() => {
          setShowNoAddressTip(false)
        }}
        onConfirm={() => {
          setShowNoAddressTip(false)
        }}
        className="order-to-ship-modal"
      />
    </View>
  )
}

export default Checkout
