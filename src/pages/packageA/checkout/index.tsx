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
import GiftItem from '@/components/checkout/GiftItem'
import { normalizeCartData } from '@/framework/api/lib/normalize'
import { subscriptionCreateAndPay } from '@/framework/api/subscription/subscription'

const Checkout = () => {
  const [customerInfo] = useAtom(customerAtom)
  const [address, setAddress] = useState({ id: '' })
  const [tradeItems, setTradeItems] = useState<any[]>([])
  const [gitfItems, setGiftItems] = useState<any[]>([])
  const [couponItems, setCouponItems] = useState<any[]>([])
  const [orderType, setOrderType] = useState<string>('normal')
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>({})
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
    switch (orderType) {
      case 'FRESH_BUY':
        subscriptionCheckNow()
        break;
      case 'normal':
        generalCheckNow()
        break;
    }
  }

  const subscriptionCheckNow = async () => {
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
          })
        }
        return el.skuGoodInfo
      })
      const benefits = gitfItems.map((el) => {
        if (el.skuGoodInfo.goodsVariants?.length > 0) {
          el.skuGoodInfo.goodsVariants = Object.assign(el.skuGoodInfo.goodsVariants[0], {
            num: el.goodsNum,
          })
        }
        return el.skuGoodInfo
      })
      let shoppingCartIds: any[] = []
      tradeItems.map((el) => {
        if (el?.id !== null && el.id !== undefined) {
          shoppingCartIds.push(el.id)
        }
      })
      const addressInfo = omit(address, ['customerId', 'storeId', 'isDefault'])
      let wxLoginRes = Taro.getStorageSync('wxLoginRes')
      const user = wxLoginRes.userInfo
      const customerAccount = wxLoginRes.customerAccount

      const subscriptionInput = {
        description: 'description',
        type: orderType,
        cycle: subscriptionInfo.cycle,
        freshType: subscriptionInfo.freshType,
        customer: {
          id: user.id,
          avatarUrl: user.avatarUrl,
          level: user.level,
          phone: user.phone,
          nickName: user.nickName,
          name: user.name,
          email: user.email,
          points: user.points,
          account: {
            unionId: customerAccount.unionId,
            openId: customerAccount.openId
          }
        },
        pet: subscriptionInfo.pet,
        address: addressInfo.id !== '' ? addressInfo : null,
        goodsList,
        benefits,
        couponList: [],
        remark,
      }
      let params = {
        input: subscriptionInput,
        payWayId: '241e2f4e-e975-6e14-a62a-71fcd435e7e9',
        storeId: '12345678',
        operator: customerInfo?.nickName || '',

      }
      console.log('create order params', params)
      const res = await subscriptionCreateAndPay(params)
      if (res.payment) {
        console.log(res, 'subscriptionCreateAndPayressssss')
        // Taro.atMessage({
        //   message: '下单成功',
        //   type: 'success',
        // })
        Taro.removeStorageSync('select-product')
        //下单成功处理删除购物车数据，没加到购物车
        // let cartProducts = session.get('cart-data') || []
        // tradeItems.map((item) => {
        //   cartProducts.map((el) => {
        //     if (item.id === el.id) {
        //       const delIndex = cartProducts.findIndex(data => data.id === item.id)
        //       cartProducts.splice(delIndex, 1)
        //     }
        //   })
        // })
        // session.set('cart-data', cartProducts)
        pay({
          params: {
            customerId: customerInfo?.id || '',
            customerOpenId: wxLoginRes?.customerAccount?.openId,
            tradeId: res.payment?.payInfo?.tradeNo,
            tradeNo: res.payment?.payInfo?.tradeNo,
            tradeDescription: '商品',
            payWayId: '241e2f4e-e975-6e14-a62a-71fcd435e7e9',
            amount: res.payment?.payInfo?.amount * 100,
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
          paymentRequest: res.payment
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
      const goodsList = tradeItems.map((el) => {
        if (el.skuGoodInfo.goodsVariants?.length > 0) {
          el.skuGoodInfo.goodsVariants = Object.assign(el.skuGoodInfo.goodsVariants[0], {
            num: el.goodsNum,
          })
        }
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
        //下单成功处理删除购物车数据
        let cartProducts = session.get('cart-data') || []
        tradeItems.map((item) => {
          cartProducts.map((el) => {
            if (item.id === el.id) {
              const delIndex = cartProducts.findIndex(data => data.id === item.id)
              cartProducts.splice(delIndex, 1)
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
        let data = JSON.parse(res.data)
        // let gifts = [{
        //   id: "a8914434-2392-20b6-17da-66135d3aeaa0",
        //   spuNo: "22052303",
        //   goodsName: "成年期全价猫湿粮",
        //   cardName: null,
        //   goodsDescription: "<p><br></p>",
        //   type: "REGULAR",
        //   brandId: "B1",
        //   goodsCategoryId: "10",
        //   shelvesStatus: true,
        //   defaultImage: null,
        //   salesStatus: false,
        //   weight: null,
        //   weightUnit: null,
        //   parcelSizeLong: null,
        //   parcelSizeLongUnit: null,
        //   parcelSizeHeight: null,
        //   parcelSizeHeightUnit: null,
        //   parcelSizeWidth: null,
        //   parcelSizeWidthUnit: null,
        //   storeId: "12345678",
        //   goodsSpecifications: null,
        //   goodsVariants: [
        //     {
        //       id: "0b80fa44-cb34-116e-749f-d034bcd7bbe8",
        //       isSupport100: false,
        //       goodsId: "a8914434-2392-20b6-17da-66135d3aeaa0",
        //       skuNo: null,
        //       eanCode: null,
        //       name: null,
        //       skuType: "REGULAR",
        //       stock: 190,
        //       marketingPrice: 0,
        //       listPrice: 0,
        //       shelvesStatus: true,
        //       shelvesTime: null,
        //       storeId: null,
        //       defaultImage: null,
        //       subscriptionStatus: 0,
        //       feedingDays: 0,
        //       subscriptionPrice: 0,
        //       goodsSpecificationRel: null,
        //     },
        //   ],
        //   goodsAttributeValueRel: [
        //     {
        //       attributeName: "干/湿",
        //       attributeNameEn: "Technology",
        //       attributeValueName: "湿粮",
        //       attributeValueNameEn: "Wet food",
        //       relId: "c007eab5-dc0d-1a0a-c1cb-e998e142178b",
        //       attributeId: "12c3a16a-f30f-212a-520d-2064f2ab173b",
        //       attributeValueId: "bd5753ca-fb5d-68e3-3ac2-65b5ff65",
        //       goodsId: "a8914434-2392-20b6-17da-66135d3aeaa0",
        //     },
        //   ],
        // }]
        // let goods = [{
        //   spuNo: "2443",
        //   goodsName: "去毛球成猫全价粮",
        //   cardName: null,
        //   goodsDescription:
        //     '<p><img src="https://dtc-platform.oss-cn-shanghai.aliyuncs.com/imgs/1652345840778.jpg" alt="" data-href="" style=""/></p>',
        //   type: "REGULAR",
        //   brandId: "B1",
        //   goodsCategoryId: "10",
        //   shelvesStatus: true,
        //   defaultImage: null,
        //   salesStatus: true,
        //   weight: 44,
        //   weightUnit: null,
        //   parcelSizeLong: "3",
        //   parcelSizeLongUnit: null,
        //   parcelSizeHeight: "4",
        //   parcelSizeHeightUnit: null,
        //   parcelSizeWidth: "12",
        //   parcelSizeWidthUnit: null,
        //   storeId: "12345678",
        //   goodsSpecifications: [
        //     {
        //       id: "fb2eed60-e965-2b8f-496e-04c95dd71e07",
        //       specificationName: "规格",
        //       specificationNameEn: "规格",
        //       goodsSpecificationDetail: [
        //         {
        //           id: "a100b6ae-da86-2a51-9b4a-9ef7abf6ca66",
        //           goodsId: null,
        //           goodsSpecificationId:
        //             "fb2eed60-e965-2b8f-496e-04c95dd71e07",
        //           specificationDetailName: "2KG",
        //           specificationDetailNameEn: "2KG",
        //           storeId: "12345678",
        //         },
        //         {
        //           id: "e6773304-6122-3e98-56b6-a28b47220f5b",
        //           goodsId: null,
        //           goodsSpecificationId:
        //             "fb2eed60-e965-2b8f-496e-04c95dd71e07",
        //           specificationDetailName: "4.5KG",
        //           specificationDetailNameEn: "4.5KG",
        //           storeId: "12345678",
        //         },
        //       ],
        //     },
        //   ],
        //   goodsVariants: [
        //     {
        //       id: "af6084a6-3180-9bee-224a-8669a4a76117",
        //       isSupport100: true,
        //       goodsId: "e7616e3d-8de7-5c19-1696-956b54ab7757",
        //       skuNo: "24430200",
        //       eanCode: "24430200",
        //       name: "皇家 去毛球成猫全价粮 2KG",
        //       skuType: "REGULAR",
        //       stock: 33,
        //       marketingPrice: 410,
        //       listPrice: 480,
        //       shelvesStatus: true,
        //       shelvesTime: null,
        //       storeId: null,
        //       defaultImage:
        //         "https://dtc-platform.oss-cn-shanghai.aliyuncs.com/imgs/1652346110385.jpg",
        //       subscriptionStatus: 1,
        //       feedingDays: 35,
        //       subscriptionPrice: 400,
        //       goodsSpecificationRel: [
        //         {
        //           goodsSpecificationId:
        //             "fb2eed60-e965-2b8f-496e-04c95dd71e07",
        //           goodsSpecificationDetailId:
        //             "a100b6ae-da86-2a51-9b4a-9ef7abf6ca66",
        //           goodsVariantId: "af6084a6-3180-9bee-224a-8669a4a76117",
        //           relId: "63c8c0ad-4c54-7de6-5b70-19e8c5609e19",
        //         },
        //       ],
        //     },
        //   ],
        //   goodsAttributeValueRel: [
        //     {
        //       attributeName: "年龄",
        //       attributeNameEn: "Age",
        //       attributeValueName: "1-7岁",
        //       attributeValueNameEn: "1-7 years old",
        //       relId: "4070e0e6-6734-fdc8-c39d-f7b7a2a30fe1",
        //       attributeId: "d47c0089-643a-e470-c0cc-e83270a79f9c",
        //       attributeValueId: "bb932cf6-5c05-bc34-098d-2a08bb1f",
        //       goodsId: "e7616e3d-8de7-5c19-1696-956b54ab7757",
        //     },
        //     {
        //       attributeName: "专区",
        //       attributeNameEn: "Zone",
        //       attributeValueName: "功能猫粮",
        //       attributeValueNameEn: "Functional cat food",
        //       relId: "8644b376-d2ad-0744-8364-c54f325dad38",
        //       attributeId: "3857ad8d-29b2-c6fa-4213-3e1dc1470b5a",
        //       attributeValueId: "4a9dbd22-b7e2-8afe-1249-2898ad80",
        //       goodsId: "e7616e3d-8de7-5c19-1696-956b54ab7757",
        //     },
        //   ],
        // }]
        // let data = {
        //   description: ' String!',
        //   type: 'FRESH_BUY',
        //   cycle: 'QUARTER',
        //   freshType: 'FRESH_NORMAL',
        //   // customer: SubscriptionCustomerInput
        //   pet: {
        //     birthday: "2021-01-09T00:00:00.000Z",
        //     breedCode: "10001",
        //     breedName: "英短猫",
        //     gender: 'FEMAL',
        //     id: "test",
        //     image: "https://test.png",
        //     isSterilized: true,
        //     name: "我的小猫咪",
        //     type: 'CAT'
        //   },
        //   // address: SubscriptionAddressInput!
        //   goodsList: goods.map(el => normalizeCartData({ goodsNum: 1 }, el)),
        //   isSubscription: true,
        //   giftList: gifts.map(el => normalizeCartData({ goodsNum: 1 }, el)),
        //   couponList: [],
        //   // remark: String
        // }
        let { goodsList } = data
        if (data.isSubscription) {
          setOrderType('FRESH_BUY')
          let { giftList, couponList } = data
          let subInfo = {
            cycle: data.cycle,
            freshType: data.freshType,
            type: data.type,
            pet: data.pet
          }
          setSubscriptionInfo(subInfo)
          setGiftItems(giftList)
          setCouponItems(couponList)
        }
        setTradeItems(goodsList)
      },
    })
    getDefaultAddress()
    getShippingPrice()
  }, [])
  console.info('tradeItems', tradeItems)
  return (
    <View className="index py-2" style={{ marginBottom: '75rpx' }}>
      <View className="px-4 bg-white">
        <View className="bggray pb-2 mt-2 rounded">
          <Address address={address} />
        </View>
        <View className="bggray pb-2 px-2 rounded">
          <TradeItem tradeItems={tradeItems} />
          {gitfItems?.map((item) => (
            <GiftItem product={item} />
          ))}

          <View>
            <DeliveryTime changeDeliveryDate={changeDeliveryDate} />
            <Coupon totalPrice={totalPrice} />
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
