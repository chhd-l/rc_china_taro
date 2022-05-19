import { dataSource } from '@/mock/voucher'
import Mock from 'mockjs'
import { Voucher } from '@/framework/types/voucher'
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

//获取voucher list page vouchers
export const getListVouchers = async (params) => {
  try {
    const voucherList = Mock.mock(dataSource).filter((el: Voucher) => {
      return (
        (params.status === 'NOT_USED' && !el.isUsed) ||
        (params.status === 'USED' && el.isUsed) ||
        (params.status === 'EXPIRED' && el.isExpired)
      )
    })
    return {
      notUsedNum: params.status === 'NOT_USED' ? voucherList.length : 0,
      usedNum: params.status === 'USED' ? voucherList.length : 0,
      expiredNum: params.status === 'EXPIRED' ? voucherList.length : 0,
      records: voucherList,
    }
  } catch (err) {
    console.log('err', err)
    return {
      notUsedNum: 0,
      usedNum: 0,
      expiredNum: 0,
      records: [],
    }
  }
}
