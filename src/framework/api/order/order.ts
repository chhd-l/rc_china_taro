import ApiRoot from '../fetcher'

export const createOrder = async (params: any) => {
  try {
    const res = await ApiRoot.orders().createOrder({
      body: params,
    })
    console.log('create order view', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}
