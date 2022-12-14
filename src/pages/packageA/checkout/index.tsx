import { View } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { Address, OrderItem, DeliveryTime, Remark, Coupon, TotalCheck, OrderPrice } from '@/components/checkout'
import Taro, { useDidHide, useDidShow } from '@tarojs/taro'
import { calculateOrderPrice, createOrder } from '@/framework/api/order'
import { AtMessage, AtModal } from 'taro-ui'
import { getAddresses } from '@/framework/api/consumer/address'
import GiftItem from '@/components/checkout/GiftItem'
import { subscriptionCreateAndPay } from '@/framework/api/subscription/subscription'
import moment from 'moment'
import CouponItem from '@/components/checkout/CouponItem'
import NavBar from '@/components/common/Navbar'
import { getTagByConsumerIdAndTagCode } from '@/framework/api/tag'
import './index.less'

const Checkout = () => {
  const [address, setAddress] = useState({ id: '' })
  const [noAddressText,setNoAddressText] = useState("新增收货地址")
  const [orderItems, setOrderItems] = useState<any[]>([])
  const [giftItems, setGiftItems] = useState<any[]>([])
  const [couponItems, setCouponItems] = useState<any[]>([])
  const [orderType, setOrderType] = useState<string>('normal')
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>({})
  const [deliveryTime, setDeliveryTime] = useState(moment().format('YYYY-MM-DD'))
  const [remark, setRemark] = useState('')
  const [errorTipModal, setErrorTipModal] = useState(false)
  const [errorTipText, setErrorTipText] = useState('')
  const [voucher, setVoucher] = useState<any>(null)
  const [isCommunityVip, setIsCommunityVip] = useState(false)
  const [orderPrice, setOrderPrice] = useState<any>(null)
  const [isReloadVouchers, setIsReloadVouchers] = useState(false)

  const getIsCommunity = async () => {
    const res = await getTagByConsumerIdAndTagCode()
    setIsCommunityVip(res?.tag ? true : false)
  }

  const calculatePrice = async () => {
    const res = await calculateOrderPrice({
      orderItems,
      voucher,
      subscriptionType: orderType,
      subscriptionCycle: subscriptionInfo?.cycleObj?.cycle,
      isWXGroupVip: isCommunityVip,
    })
    setOrderPrice(res)
    console.log('calculate order price page', res)
  }

  useEffect(() => {
    if (orderType && orderItems.length > 0) {
      calculatePrice()
    }
  }, [orderItems, voucher, orderType, isCommunityVip])

  const checkNow = async () => {
    if (address.id === '') {
      setErrorTipText('请填写收货地址')
      setErrorTipModal(true)
      return false
    }
    switch (orderType) {
      case 'FRESH_BUY':
        await subscriptionCreateAndPay({
          orderItems,
          giftItems,
          voucher,
          address,
          orderType,
          subscriptionInfo,
          couponItems,
          remark,
          deliveryTime,
          isWXGroupVip: isCommunityVip,
        })
        break
      case 'normal':
        const res = await createOrder({
          orderItems,
          address,
          remark,
          deliveryTime,
          voucher,
          isWXGroupVip: isCommunityVip,
        })
        if (res?.errorCode === 'ED301202') {
          setErrorTipText('商品存库不足，请稍后再试！')
          setErrorTipModal(true)
        }
        if (res?.errorCode === 'ED301201') {
          setErrorTipText('优惠券核销失败，请稍后再试！')
          setErrorTipModal(true)
          setIsReloadVouchers(true)
        }
        break
    }

  }

  useDidHide(() => {
    console.log('1111111')
    Taro.removeStorageSync('select-address')
  })
  useDidShow(()=>{
    // 兼容选择地址之后的地址显示，之前是用的redirectTo，会多出一个历史栈，现在改成navigateBack
    getDefaultAddress()
  })
  const getDefaultAddress = async () => {
    const selectAddress = Taro.getStorageSync('select-address')
    if (selectAddress) {
      setAddress(JSON.parse(selectAddress))
      setNoAddressText("选择地址信息")
    } else {
      const addresses = await getAddresses()
      const defaultAddress = (addresses || []).find((item) => item.isDefault)
      if (defaultAddress) {
        setAddress(defaultAddress)
      }
      if(addresses?.length){
        setNoAddressText("选择地址信息")
      }
    }
  }

  useEffect(() => {
    // 删除默认地址
    Taro.removeStorageSync('select-address')
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
        }
        setOrderItems(productList)
      },
    })
    getDefaultAddress()
    getIsCommunity()
  }, [])

  return (
    <>
      <NavBar navbarTitle="确认订单" isNeedBack />
      <View className="index py-2" style={{ marginBottom: '75rpx' }}>
        <View className="px-4 bg-white">
          <Address noAddressText={noAddressText} address={address} />
          <View className="bggray pb-2 px-2 rounded">
            <OrderItem orderItems={orderItems} />
            {giftItems?.map((item) => (
              <GiftItem product={item} />
            ))}
            {couponItems?.map((item) => (
              <CouponItem coupon={item} />
            ))}
            <View>
              <DeliveryTime
                changeDeliveryDate={(value) => {
                  setDeliveryTime(value)
                }}
              />
              <Coupon
                isReload={isReloadVouchers}
                totalPrice={orderPrice?.totalPrice || 0}
                orderItems={orderItems}
                changeMaxDiscount={(maxDiscountPrice) => {
                  console.log('maxDiscountPrice', maxDiscountPrice)
                }}
                orderType={orderType}
                changeCheckoutVoucher={(value) => setVoucher(value)}
              />
              <Remark
                changeRemark={(value) => {
                  setRemark(value)
                }}
              />
            </View>
          </View>
          <OrderPrice orderPrice={orderPrice} isCommunityVip={isCommunityVip} />
        </View>
        <View className="fixed bottom-0 w-full">
          <TotalCheck orderItems={orderItems} totalPrice={orderPrice?.totalPrice || 0} checkNow={checkNow} />
        </View>
        <AtMessage />
        <AtModal
          key="noAddressTip"
          isOpened={errorTipModal}
          title="提示"
          content={errorTipText}
          confirmText="确定"
          onClose={() => {
            setErrorTipModal(false)
          }}
          onCancel={() => {
            setErrorTipModal(false)
          }}
          onConfirm={() => {
            setErrorTipModal(false)
          }}
          className="rc_modal"
        />
      </View>
    </>
  )
}

export default Checkout
