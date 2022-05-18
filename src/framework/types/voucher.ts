//优惠券
export type Voucher = {
  id: string
  voucherPrice: number //优惠价格
  voucherName: string //优惠券name
  voucherDescription: string //优惠券描述
  expiredTime: string //领取/失效时间
  isReceived: boolean //是否已领取
  isExpired: boolean //是否已失效
  isSelect?: boolean //是否在checkout页面已选择
  voucherUsePrice: number //达到多少钱可使用优惠券
}
