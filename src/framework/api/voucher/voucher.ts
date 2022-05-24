import { dataSource } from '@/mock/voucher'
import Mock from 'mockjs'
import { Voucher } from '@/framework/types/voucher'
import moment from 'moment'
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

//获取PDP page vouchers
export const getPdpVouchers = async ({ goodsId }) => {
  try {
    const res = await ApiRoot.vouchers().getVouchersByGoodsId({
      goodsId,
      storeId: baseSetting.storeId,
    })
    let vouchers = res?.voucherDetailList || []
    vouchers = vouchers.map((el) => normalizeVoucher(el, 'pdp'))
    console.log('PDP vouchers view data', vouchers)
    return vouchers || []
  } catch (err) {
    console.log('err', err)
    return []
  }
}

const normalizeVoucher = (voucher: any, origin: string) => {
  const {
    id,
    discountValue,
    voucherName,
    voucherDescription,
    voucherStatus,
    minimumBasketPrice,
    voucherUsageBeginningOfTime,
    voucherUsageEndOfTime,
    discountType,
  } = voucher
  return {
    id: id,
    voucherPrice:
      discountType === 'PERCENTAGE' && Number(discountValue) < 1
        ? Number(discountValue) * Number(minimumBasketPrice)
        : Number(discountValue), //优惠价格
    voucherName: voucherName, //优惠券name
    voucherDescription: voucherDescription, //优惠券描述
    expiredTime:
      moment(voucherUsageBeginningOfTime).format('YYYY.MM.DD') +
      '-' +
      moment(voucherUsageEndOfTime).format('YYYY.MM.DD'), //领取/失效时间
    isReceived: origin === 'pdp' ? false : origin === 'checkout' ? true : true, //是否已领取
    isExpired: voucherStatus === 'Expired', //是否已失效
    isSelect: false, //是否在checkout页面已选择
    voucherUsePrice: Number(minimumBasketPrice), //达到多少钱可使用优惠券
    isUsed: origin === 'pdp' ? false : origin === 'checkout' ? false : true, //是否已使用
  }
}
