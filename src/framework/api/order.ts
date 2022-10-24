import Taro from '@tarojs/taro'
import { orderDetailMockData, orderListMockData } from '@/mock/order'
import { session } from '@/utils/global'
import omit from 'lodash/omit'
import { pay } from '@/framework/api/payment/pay'
import routers from '@/routers'
import cloneDeep from 'lodash.cloneDeep'
import { formatDateToApi } from '@/utils/utils'
import apis from '@/framework/config/api-config'
import ApiRoot, { isMock } from './fetcher'

export const createOrder = async ({ orderItems, address, remark, deliveryTime, voucher, isWXGroupVip }) => {
  try {
    //入参处理 start
    const productList = cloneDeep(orderItems).map((el) => {
      if (el.skuGoodInfo.variants?.length > 0) {
        el.skuGoodInfo.variants = Object.assign(omit(el.skuGoodInfo.variants[0], ['isDeleted', 'variantBundles']), {
          num: el.productNum,
        })
      }
      el.skuGoodInfo = omit(el.skuGoodInfo, ['isDeleted'])
      return el.skuGoodInfo
    })
    let shoppingCartIds: any[] = []
    orderItems.map((el) => {
      if (el?.id !== null && el.id !== undefined) {
        shoppingCartIds.push(el.id)
      }
    })
    const addressInfo = omit(address, ['consumerId', 'storeId', 'isDefault'])
    const user = Taro.getStorageSync('wxLoginRes').userInfo
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
    let wxLoginRes = Taro.getStorageSync('wxLoginRes')
    const params = {
      productList,
      addressInfo: addressInfo.id !== '' ? addressInfo : null,
      remark,
      shoppingCartIds: shoppingCartIds.length > 0 ? shoppingCartIds : [''],
      expectedShippingDate: formatDateToApi(deliveryTime),
      isSubscription: false,
      consumerInfo: {
        id: user.id,
        avatarUrl: user.avatarUrl,
        level: user.level,
        phone: user.phone,
        nickName: user.nickName,
        name: user.name,
      },
      wxUserInfo: {
        nickName: user.nickName,
        unionId: wxLoginRes?.consumerAccount?.unionId,
        openId: wxLoginRes?.consumerAccount?.openId,
        isWXGroupVip,
      },
      voucher: finalVoucher,
    }
    //入参处理 end
    console.log('create order params', params)
    const res = await ApiRoot({ url: apis?.orderCreate }).orders().createOrder({
      body: params,
    })
    console.log('create order view', res)
    if (res) {
      Taro.removeStorageSync('select-product')
      //下单成功处理删除购物车数据
      let cartProducts = session.get('cart-data') || []
      orderItems.map((item) => {
        cartProducts.map((el) => {
          if (item.id === el.id) {
            const delIndex = cartProducts.findIndex((data) => data.id === item.id)
            cartProducts.splice(delIndex, 1)
          }
        })
      })
      session.set('cart-data', cartProducts)
      console.info('////////')
      pay({
        params: {
          consumerId: wxLoginRes?.userInfo?.id || '',
          consumerOpenId: wxLoginRes?.consumerAccount?.openId,
          orderId: res?.orderNumber,
          orderNo: res?.orderNumber,
          orderDescription: '商品',
          payWayCode: 'WECHAT_PAY', // '241e2f4e-e975-6e14-a62a-71fcd435e7e9',
          projectName: 'ACYK_WX',
          amount: res?.orderPrice.totalPrice * 100,
          currency: 'CNY',
          storeId: '12345678',
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
    }
    return {
      result: Boolean(res?.orderNumber),
      errorCode: '',
    }
  } catch (err) {
    console.log('err', err?.errors?.Message)
    return {
      result: false,
      errorCode: err?.errors?.Code || '',
    }
  }
}

export const getOrderSetting = async () => {
  try {
    let orderSettings = Taro.getStorageSync('order-setting')
    if (orderSettings) {
      orderSettings = JSON.parse(orderSettings)
    } else {
      orderSettings = await ApiRoot({ url: apis?.orderList }).orders().getOrderSetting("12345678")
      console.log('get orderSetting view data', orderSettings)
      Taro.setStorageSync('order-setting', JSON.stringify(orderSettings))
    }
    return orderSettings
  } catch (e) {
    console.log(e)
    return []
  }
}

export const getOrderList = async (queryOrderListParams: any) => {
  try {
    if (isMock) {
      return {
        total: 0,
        records: orderListMockData,
      }
    } else {
      console.log('query orders view params', queryOrderListParams)
      let wxLoginRes = Taro.getStorageSync('wxLoginRes')
      const params = Object.assign(queryOrderListParams, {
        withTotal: true,
        sample: { ...queryOrderListParams?.sample, consumerId: wxLoginRes?.consumerAccount?.consumerId },
      })
      let res = await ApiRoot({ url: apis?.orderList }).orders().getOrders({ queryOrderListParams: params })
      const { records, total } = res
      console.log('query orders view list', res)
      return {
        total: total || 0,
        records: records || [],
      }
    }
  } catch (e) {
    console.log(e)
    return {
      total: 0,
      records: [],
    }
  }
}

export const getOrderDetail = async ({ orderNum }: { orderNum: string }) => {
  try {
    if (isMock) {
      return orderDetailMockData
    } else {
      let res = await ApiRoot({ url: apis.orderDetail }).orders().getOrder({ orderNum })
      console.info('res', res)
      return res
    }
  } catch (e) {
    console.log(e)
    return {}
  }
}

export const getExpressCompanyList = async () => {
  try {
    let expressCompanyList = session.get('express-company-list')
    if (!expressCompanyList) {
      let res = await ApiRoot({ url: apis?.orderList }).orders().getExpressCompany()
      console.info('get expressCompany data view', res)
      session.set('express-company-list', res)
    }
    return expressCompanyList
  } catch (e) {
    console.log(e)
    return []
  }
}

export const completedOrder = async (params: any) => {
  try {
    console.info('completed order view params', params)
    let res = await ApiRoot({ url: apis?.order_action }).orders().completedOrder({ body: params })
    console.info('completed order data view', res)
    return res
  } catch (e) {
    console.log(e)
    return false
  }
}

export const cancelOrder = async (params: any) => {
  try {
    console.info('cancel order view params', params)
    let res = await ApiRoot({ url: apis?.order_action }).orders().cancelOrder({ body: params })
    console.info('cancel order data view', res)
    return res
  } catch (e) {
    console.log(e)
    return false
  }
}

export const calculateOrderPrice = async ({
  orderItems,
  voucher,
  subscriptionType,
  subscriptionCycle,
  isWXGroupVip,
}) => {
  try {
    const productList = cloneDeep(orderItems).map((el) => {
      if (el.skuGoodInfo.variants?.length > 0) {
        el.skuGoodInfo.variants = Object.assign(omit(el.skuGoodInfo.variants[0], ['isDeleted', 'variantBundles']), {
          num: el.productNum,
        })
      }
      // 一键续订有quantity，处理下
      delete el.skuGoodInfo.quantity
      delete el.skuGoodInfo.quantityRule
      el.skuGoodInfo = omit(el.skuGoodInfo, ['isDeleted', 'subscriptionRecommendRuleId'])
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
    const params = Object.assign(
      {
        productList,
        voucher: finalVoucher,
        isWXGroupVip,
      },
      subscriptionType === 'FRESH_BUY'
        ? {
          subscriptionType,
          subscriptionCycle,
        }
        : {},
    )
    console.info('calculate order price view params', params)
    let res = await ApiRoot({ url: apis?.orderCreate }).orders().orderCalculatePrice(params)
    console.info('calculate order price data view data', res)
    return res
  } catch (err) {
    console.log(err)
    Taro.atMessage({
      message: err?.errors?.Message || '系统繁忙，请稍后再试',
      type: 'error',
    })
    return false
  }
}
