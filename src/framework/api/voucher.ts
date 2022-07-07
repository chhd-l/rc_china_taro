import { dataSource } from '@/mock/voucher'
import Mock from 'mockjs'
import { Voucher } from '@/framework/types/voucher'
import moment from 'moment'
import Taro from '@tarojs/taro'
import apis from '@/framework/config/api-config'
import ApiRoot, { isMock } from './fetcher'

const normalizeCheckoutAndListVouchers = (voucherList) => {
  return {
    notUsedVouchers: voucherList.filter((el: Voucher) => el?.originVoucher?.voucherStatus === 'Not_Used'),
    usedVouchers: voucherList.filter((el: Voucher) => el?.originVoucher?.voucherStatus === 'Used'),
    expiredVouchers: voucherList.filter((el: Voucher) => el?.originVoucher?.voucherStatus === 'Expired'),
  }
}

//获取voucher list and checkout page vouchers
export const getListVouchers = async () => {
  try {
    if (isMock) {
      return normalizeCheckoutAndListVouchers(Mock.mock(dataSource))
    } else {
      let wxLoginRes = Taro.getStorageSync('wxLoginRes')
      let vouchers = await ApiRoot({ url: apis?.voucher })
        .vouchers()
        .getConsumerVouchers({
          consumerId: wxLoginRes?.consumerAccount?.consumerId || '',
        })
      vouchers = vouchers.map((el) => normalizeVoucher(el, 'list'))
      console.log('consumer vouchers view data', vouchers)
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
    const res = await ApiRoot({ url: apis?.voucher }).vouchers().getVouchersByProductId(params)
    let vouchers = res?.filter((item) => !item?.isUsed) || []
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
    minimumBasketPrice,
    voucherUsageBeginningOfTime,
    voucherUsageEndOfTime,
    discountType,
    voucherType,
  } = voucher
  return {
    id: id,
    voucherPrice: Number(discountValue), //优惠价格
    voucherName: voucherName, //优惠券name
    voucherDescription: voucherDescription, //优惠券描述
    expiredTime:
      moment(voucherUsageBeginningOfTime).format('YYYY.MM.DD') +
      '-' +
      moment(voucherUsageEndOfTime).format('YYYY.MM.DD'), //领取/失效时间
    isReceived: origin === 'pdp' ? voucher?.isGetStatus : true, //是否已领取
    isSelect: false, //是否在checkout页面已选择
    voucherUsePrice: Number(minimumBasketPrice || discountValue || 0), //达到多少钱可使用优惠券
    voucherType: voucherType,
    isCanUsed: false,
    voucherProductRelated: voucher?.voucherProductRelated || [],
    recurrence: voucher?.recurrence || false,
    orderType: voucher?.orderType || 'ALL',
    originVoucher: voucher,
    discountType: discountType,
    maxDiscountPrice: 0, //checkout时针对这笔订单最大可减多少
  }
}

//领取优惠券
export const receiveVoucher = async (params) => {
  try {
    const res = await ApiRoot({ url: apis?.voucher }).vouchers().receiveVoucher(params)
    console.log('receive voucher', res)
    return {
      result: res,
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
