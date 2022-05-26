import { dataSource } from '@/mock/voucher'
import Mock from 'mockjs'
import { Voucher } from '@/framework/types/voucher'
import moment from 'moment'
import Taro from '@tarojs/taro'
import ApiRoot, { isMock } from '../fetcher'

const normalizeCheckoutAndListVouchers = (voucherList) => {
  return {
    notUsedVouchers: voucherList.filter((el: Voucher) => !el.isUsed),
    usedVouchers: voucherList.filter((el: Voucher) => el.isUsed),
    expiredVouchers: voucherList.filter((el: Voucher) => el.isExpired),
  }
}

//获取voucher list and checkout page vouchers
export const getListVouchers = async () => {
  try {
    if (isMock) {
      return normalizeCheckoutAndListVouchers(Mock.mock(dataSource))
    } else {
      let { customerId } = Taro.getStorageSync('wxLoginRes')?.customerAccount
      const res = await ApiRoot.vouchers().getCustomerVouchers({ customerId })
      let vouchers = res?.consumerVoucherDetailList || []
      vouchers = vouchers.map((el) => normalizeVoucher(el, 'list'))
      console.log('customer vouchers view data', vouchers)
      return normalizeCheckoutAndListVouchers(vouchers)
    }
  } catch (err) {
    console.log('err', err)
    return {
      notUsedVouchers: [],
      usedVouchers: [],
      expiredVouchers: [],
    }
  }
}

//获取PDP page vouchers
export const getPdpVouchers = async (params) => {
  try {
    let { customerId, storeId } = Taro.getStorageSync('wxLoginRes')?.customerAccount
    const res = await ApiRoot.vouchers().getVouchersByGoodsId({ ...params, customerId, storeId })
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
    voucherType,
  } = voucher
  return {
    id: id,
    voucherPrice:
      discountType === 'PERCENTAGE' && Number(discountValue) < 1
        ? Number(discountValue || 0) * Number(minimumBasketPrice || 0)
        : Number(discountValue || 0), //优惠价格
    voucherName: voucherName, //优惠券name
    voucherDescription: voucherDescription, //优惠券描述
    expiredTime:
      moment(voucherUsageBeginningOfTime).format('YYYY.MM.DD') +
      '-' +
      moment(voucherUsageEndOfTime).format('YYYY.MM.DD'), //领取/失效时间
    isReceived: origin === 'pdp' ? voucher?.isGetStatus : true, //是否已领取
    isExpired: origin === 'pdp' ? voucherStatus === 'Expired' : voucherStatus === '2', //是否已失效
    isSelect: false, //是否在checkout页面已选择
    voucherUsePrice: Number(minimumBasketPrice || 0), //达到多少钱可使用优惠券
    isUsed: origin === 'pdp' ? false : voucherStatus === '1', //是否已使用
    voucherType: voucherType,
    isCanUsed: false,
    goodsInfoIds: origin === 'pdp' ? [] : voucher?.goodsInfoIds || [],
  }
}

//领取优惠券
export const receiveVoucher = async (params) => {
  try {
    const { customerId } = Taro.getStorageSync('wxLoginRes')?.customerAccount
    const res = await ApiRoot.vouchers().receiveVoucher({ ...params, customerId })
    console.log('receive voucher', res?.voucherReceive)
    return res?.voucherReceive || false
  } catch (err) {
    console.log('err', err)
    return false
  }
}
