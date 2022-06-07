//优惠券
export type Voucher = {
  id: string
  voucherPrice: number //优惠价格
  voucherName: string //优惠券name
  voucherDescription: string //优惠券描述
  expiredTime: string //领取/失效时间
  isReceived: boolean //是否已领取
  isSelect?: boolean //是否在checkout页面已选择
  voucherUsePrice: number //达到多少钱可使用优惠券
  voucherType: string //优惠券类型，店铺通用优惠券/商品型优惠券
  isCanUsed: boolean //checkout时是否可用
  voucherGoodsRelated: any[] //商品型优惠券对哪些商品可用
  recurrence: boolean //是否可叠加折扣
  orderType:string //优惠券可用于哪种订单类型
  originVoucher:any//从后端拿到的原始优惠券数据
  discountType:string
  maxDiscountPrice:number//针对这个这笔订单最大可优惠多少
}
