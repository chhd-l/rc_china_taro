import ApiRoot from '../fetcher'

interface PayInput {
  customerId: string
  customerOpenId: string
  tradeId: string
  tradeNo: string
  tradeDescription: string
  payWayId: string
  amount: number
  currency: string
  storeId: string
  operator: string
}

export const pay = (params: PayInput) => {
  try {
    ApiRoot.orders().pay({ body: params })
  } catch (e) {
    console.log(e)
  }
}
