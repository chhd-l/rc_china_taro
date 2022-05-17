import { dataSource } from '@/mock/voucher'
import Mock from 'mockjs'
import ApiRoot, { baseSetting, isMock } from '../fetcher'

export const getVouchers = async () => {
  try {
    if (isMock) {
      return Mock.mock(dataSource)
    } else {
      // const res = await ApiRoot.carts().getCarts({ customerId: baseSetting.customerId, storeId: baseSetting.storeId })
      // const cartProducts = res?.carts || []
      // console.log('cart products data', cartProducts)
      // return cartProducts||[]
      return Mock.mock(dataSource)
    }
  } catch (err) {
    console.log('err', err)
    return []
  }
}
