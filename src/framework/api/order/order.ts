import Taro from '@tarojs/taro'
import { orderDetailMockData, orderListMockData } from '@/mock/order'
import { session } from '@/utils/global'
import ApiRoot, { baseSetting, isMock } from '../fetcher'

export const createOrder = async (params: any) => {
  try {
    const res = await ApiRoot.orders().createOrder({
      body: Object.assign(params, { storeId: baseSetting.storeId }),
    })
    console.log('create order view', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}

export const getOrderSetting = async () => {
  try {
    let orderSettings = Taro.getStorageSync('order-setting')
    if (orderSettings) {
      orderSettings = JSON.parse(orderSettings)
    } else {
      const res = await ApiRoot.orders().getOrderSetting({
        storeId: baseSetting.storeId,
      })
      console.log('get orderSetting view data', res)
      if (res.orderSettings) {
        orderSettings = res.orderSettings
        Taro.setStorageSync('order-setting', JSON.stringify(res.orderSettings))
      }
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
      let res = await ApiRoot.orders().getOrders({ queryOrderListParams })
      const { records, total } = res.orders
      console.log('query orders view list', res)
      return {
        total: total || 0,
        records,
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
      let { getOrder } = await ApiRoot.orders().getOrder({ storeId: '12345678', orderNum })
      console.info('res', getOrder)
      return getOrder
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
      let res = await ApiRoot.orders().getExpressCompany({ storeId: '12345678' })
      console.info('get expressCompany data view', res)
      expressCompanyList = res.expressCompanies || []
      session.set('express-company-list', expressCompanyList)
    }
    return expressCompanyList
  } catch (e) {
    console.log(e)
    return []
  }
}

export const shippedOrder = async (params: any) => {
  try {
    params = Object.assign(params, {
      storeId: '12345678',
      operator: 'zz',
    })
    console.info('shipped order view params', params)
    let res = await ApiRoot.orders().shippedOrder({ body: params })
    console.info('shipped order data view', res)
    return res.shippedOrder || false
  } catch (e) {
    console.log(e)
    return false
  }
}

export const completedOrder = async (params: any) => {
  try {
    params = Object.assign(params, {
      storeId: '12345678',
      operator: 'zz',
    })
    console.info('completed order view params', params)
    let res = await ApiRoot.orders().completedOrder({ body: params })
    console.info('completed order data view', res)
    return res.completedOrder || false
  } catch (e) {
    console.log(e)
    return false
  }
}

export const cancelOrder = async (params: any) => {
  try {
    params = Object.assign(params, {
      storeId: '12345678',
      operator: 'zz',
    })
    console.info('cancel order view params', params)
    let res = await ApiRoot.orders().cancelOrder({ body: params })
    console.info('cancel order data view', res)
    return res.cancelOrder || false
  } catch (e) {
    console.log(e)
    return false
  }
}
