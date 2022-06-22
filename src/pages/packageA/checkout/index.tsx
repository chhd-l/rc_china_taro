import { View } from '@tarojs/components'
import { useEffect, useMemo, useState } from 'react'
import { Address, OrderItem, DeliveryTime, Remark, Coupon, TotalCheck, OrderPrice } from '@/components/checkout'
import Taro, { useDidHide } from '@tarojs/taro'
import { createOrder, getOrderSetting } from '@/framework/api/order/order'
import { AtMessage, AtModal } from 'taro-ui'
import omit from 'lodash/omit'
import routers from '@/routers/index'
import { getAddresses } from '@/framework/api/consumer/address'
import { pay } from '@/framework/api/payment/pay'
import { useAtom } from 'jotai'
import { consumerAtom } from '@/store/consumer'
import GiftItem from '@/components/checkout/GiftItem'
import { subscriptionCreateAndPay } from '@/framework/api/subscription/subscription'
import moment from 'moment'
import CouponItem from '@/components/checkout/CouponItem'
import NavBar from '@/components/common/Navbar'
import { formatDateToApi } from '@/utils/utils'
import './index.less'

const Checkout = () => {
  const [consumerInfo] = useAtom(consumerAtom)
  const [address, setAddress] = useState({ id: '' })
  const [orderItems, setOrderItems] = useState<any[]>([])
  const [giftItems, setGiftItems] = useState<any[]>([])
  const [couponItems, setCouponItems] = useState<any[]>([])
  const [orderType, setOrderType] = useState<string>('normal')
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>({})
  const [deliveryTime, setDeliveryTime] = useState(moment().format('YYYY-MM-DD'))
  const [remark, setRemark] = useState('')
  const [totalNum, setTotalNum] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [discountPrice, setDiscountPrice] = useState(0)
  const [subDiscountPrice, setSubDiscountPrice] = useState(0)

  const [loading, setLoading] = useState(false)
  const [shippingPrice, setShippingPrice] = useState(0)
  const [showNoAddressTip, setShowNoAddressTip] = useState(false)
  const [voucher, setVoucher] = useState<any>(null)

  const changeDeliveryDate = (value) => {
    setDeliveryTime(value)
  }

  const changeRemark = (value) => {
    setRemark(value)
  }

  const getTotalNum = () => {
    const total = orderItems.reduce((prev, cur) => {
      return prev + cur.productNum
    }, 0)
    setTotalNum(total)
  }

  const getTotalPrice = () => {
    const total = orderItems.reduce((prev, cur) => {
      return prev + cur.productNum * cur.localData.price
    }, 0)
    let normalTotal = total + shippingPrice
    if (orderType === 'FRESH_BUY') {
      //如果是订阅设置订阅算好的价格
      normalTotal = subscriptionInfo.cycleObj.originalPrice
    }
    setTotalPrice(normalTotal)
  }

  const checkNow = async () => {
    switch (orderType) {
      case 'FRESH_BUY':
        subscriptionCheckNow()
        break
      case 'normal':
        generalCheckNow()
        break
    }
  }

  const toOrderList = () => {
    let url = `${routers.orderList}?status=TO_SHIP&isFromSubscription=true`
    if (couponItems?.length) {
      url = `${routers.orderList}?status=TO_SHIP&isFromSubscription=true&isSendCoupon=true`
    }
    Taro.redirectTo({
      url,
    })
  }

  const subscriptionCheckNow = async () => {
    try {
      if (address.id === '') {
        setShowNoAddressTip(true)
        return false
      }
      setLoading(true)
      const productList = orderItems.map((el) => {
        if (el.skuGoodInfo.variants?.length > 0) {
          el.skuGoodInfo.variants = Object.assign(el.skuGoodInfo.variants[0], {
            num: el.productNum,
          })
        }
        return el.skuGoodInfo
      })
      const benefits = giftItems.map((el) => {
        if (el.skuGoodInfo.variants?.length > 0) {
          el.skuGoodInfo.variants = Object.assign(el.skuGoodInfo.variants[0], {
            num: el.productNum,
          })
        }
        return el.skuGoodInfo
      })
      let finalVoucher =
        voucher && JSON.stringify(voucher) !== '{}'
          ? {
              ...voucher,
              voucherStatus: 'Ongoing',
            }
          : null
      finalVoucher = finalVoucher
        ? omit(finalVoucher, ['consumerId', 'productInfoIds', 'orderCode', 'isDeleted', 'isGetStatus'])
        : null
      let shoppingCartIds: any[] = []
      orderItems.map((el) => {
        if (el?.id !== null && el.id !== undefined) {
          shoppingCartIds.push(el.id)
        }
      })
      const addressInfo = omit(address, ['consumerId', 'storeId', 'isDefault'])
      let wxLoginRes = Taro.getStorageSync('wxLoginRes')
      const user = wxLoginRes.userInfo
      const consumerAccount = wxLoginRes.consumerAccount

      const subscriptionInput = {
        description: 'description',
        type: orderType,
        cycle: subscriptionInfo.cycleObj?.cycle,
        freshType: subscriptionInfo.freshType,
        voucher: finalVoucher,
        consumer: {
          id: user.id,
          avatarUrl: user.avatarUrl,
          level: user.level,
          phone: user.phone,
          nickName: user.nickName,
          name: user.name,
          email: user.email,
          points: user.points,
          account: {
            unionId: consumerAccount.unionId,
            openId: consumerAccount.openId,
          },
        },
        pet: subscriptionInfo.pet,
        address: addressInfo.id !== '' ? addressInfo : null,
        productList,
        benefits,
        coupons: couponItems.map((el) => {
          let couponInfo = el.couponInfo
          delete couponInfo.isDeleted
          delete couponInfo.isGetStatus
          return {
            id: el.id,
            subscriptionRecommendRuleId: el.subscriptionRecommendRuleId,
            couponId: el.couponId,
            quantityRule: el.quantityRule,
            quantity: el.quantity,
            voucher: couponInfo,
            sequence: el.sequence,
            num: el.quantity,
          }
        }),
        remark,
        firstDeliveryTime: formatDateToApi(deliveryTime),
        totalDeliveryTimes: subscriptionInfo.cycleObj.quantity, //配送次数
      }
      let params = {
        input: subscriptionInput,
        payWayId: '241e2f4e-e975-6e14-a62a-71fcd435e7e9',
        storeId: '12345678',
        operator: consumerInfo?.nickName || '',
      }
      console.log('create order params', params)
      const res = await subscriptionCreateAndPay(params)
      if (res.paymentStartResult?.payment?.status === 'PAID') {
        //0元就不用调用支付接口
        Taro.showLoading({
          title: '支付成功',
        })
        toOrderList()
        return
      }
      if (res.paymentStartResult) {
        console.log(res, 'subscriptionCreateAndPayressssss')
        Taro.removeStorageSync('select-product')
        pay({
          params: {
            consumerId: consumerInfo?.id || '',
            consumerOpenId: wxLoginRes?.consumerAccount?.openId,
            orderId: res.paymentStartResult?.payment?.orderNo,
            orderNo: res.paymentStartResult?.payment?.orderNo,
            orderDescription: '商品',
            payWayId: '241e2f4e-e975-6e14-a62a-71fcd435e7e9',
            amount: res.paymentStartResult?.payment?.amount * 100,
            currency: 'CNY',
            storeId: '12345678',
            operator: consumerInfo?.nickName || '',
          },
          success: () => {
            toOrderList()
          },
          fail: () => {
            Taro.redirectTo({
              url: `${routers.orderList}?status=UNPAID&isFromSubscription=true`,
            })
          },
          paymentRequest: res.paymentStartResult,
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

  const generalCheckNow = async () => {
    try {
      if (address.id === '') {
        setShowNoAddressTip(true)
        return false
      }
      setLoading(true)
      await createOrder({ orderItems, address, remark, deliveryTime, voucher })
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
  }, [orderItems, shippingPrice])

  const getDefaultAddress = async () => {
    const selectAddress = Taro.getStorageSync('select-address')
    if (selectAddress) {
      setAddress(JSON.parse(selectAddress))
    } else {
      const { userInfo } = Taro.getStorageSync('wxLoginRes')
      const addresses = await getAddresses({ consumerId: userInfo?.id })
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
        let data = JSON.parse(res.data)
        let { productList } = data
        if (data.isSubscription) {
          setOrderType('FRESH_BUY')
          let { giftList, couponList } = data
          // 生日为空删除
          if (!data.pet?.birthday) {
            delete data.pet?.birthday
          }
          let subInfo = {
            cycleObj: data.cycle,
            freshType: data.freshType,
            type: data.type,
            pet: data.pet,
          }
          setSubscriptionInfo(subInfo)
          setGiftItems(giftList)
          setCouponItems(couponList)
          console.log(couponItems)
          // 订阅折扣价合并优惠券价格
          let discount = subInfo.cycleObj.originalPrice - subInfo.cycleObj.discountPrice
          setSubDiscountPrice(discount)
        }
        setOrderItems(productList)
      },
    })
    getDefaultAddress()
    getShippingPrice()
  }, [])

  const payPrice = useMemo(
    () => totalPrice - discountPrice - subDiscountPrice,
    [totalPrice, discountPrice, subDiscountPrice],
  )

  return (
    <>
      <NavBar navbarTitle="确认订单" isNeedBack />
      <View className="index py-2" style={{ marginBottom: '75rpx' }}>
        <View className="px-4 bg-white">
          <View className="bggray pb-2 mt-2 rounded">
            <Address address={address} />
          </View>
          <View className="bggray pb-2 px-2 rounded">
            <OrderItem orderItems={orderItems} />
            {giftItems?.map((item) => (
              <GiftItem product={item} />
            ))}
            {couponItems?.map((item) => (
              <CouponItem coupon={item} />
            ))}
            <View>
              <DeliveryTime changeDeliveryDate={changeDeliveryDate} />
              <Coupon
                totalPrice={orderType === 'normal' ? totalPrice : totalPrice - subDiscountPrice}
                orderItems={orderItems}
                changeMaxDiscount={(maxDiscountPrice) => {
                  console.log('maxDiscountPrice', maxDiscountPrice)
                  setDiscountPrice(maxDiscountPrice)
                }}
                orderType={orderType}
                changeCheckoutVoucher={(value) => setVoucher(value)}
              />
              <Remark changeRemark={changeRemark} />
            </View>
          </View>
          <View>
            <OrderPrice
              totalPrice={totalPrice}
              discountPrice={discountPrice}
              subDiscountPrice={subDiscountPrice}
              shipPrice={shippingPrice}
            />
          </View>
        </View>
        <View className="fixed bottom-0 w-full">
          <TotalCheck num={totalNum} totalPrice={payPrice} checkNow={checkNow} loading={loading} />
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
          className="rc_modal"
        />
      </View>
    </>
  )
}

export default Checkout
