import ApiRoot, { baseSetting, isMock } from '../fetcher'

export const createOrder = async (params: any) => {
  try {
    params = Object.assign(params, { operator: 'test用户001' })
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
    const res = await ApiRoot.orders().getOrderSetting({
      storeId: baseSetting.storeId,
    })
    console.log('get orderSetting view data', res)
    return res.orderSettings
  } catch (e) {
    console.log(e)
    return []
  }
}

export const getOrderList = async (queryOrderListParams: any) => {
  try {
    if (isMock) {
      // return Mock.mock(orderListSource('UNPAID')).array
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
      // return Mock.mock(orderDetailSource('UNPAID'))
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
