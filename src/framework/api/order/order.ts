import ApiRoot, { baseSetting } from '../fetcher'

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
