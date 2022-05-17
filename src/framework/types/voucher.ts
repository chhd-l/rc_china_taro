//优惠券
export type Voucher = {
  id:string
  voucherPrice:number //优惠价格
  voucherName:string //优惠券name
  voucherDescription:string //优惠券描述
  expiredTime:string //领取/失效时间
  isReceived:boolean //是否已领取
};
