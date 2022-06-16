export const dataSource = [
  {
    id: '111',
    voucherPrice: 11, //优惠价格
    voucherName: '幼猫礼赠券', //优惠券name
    voucherDescription: '幼猫系列商城每满68-11元', //优惠券描述
    expiredTime: '2022.03.02-2022.12.31', //领取/失效时间
    isReceived: false, //是否已领取
    isExpired: true,
    isSelect: false,
    voucherUsePrice: 68,
    isUsed: false,
    voucherType: 'SHOP_VOUCHER', //优惠券类型，店铺通用优惠券/商品型优惠券
    isCanUsed: false, //checkout时是否可用
    productInfoIds: []
  },
  {
    id: '222',
    voucherPrice: 11, //优惠价格
    voucherName: '幼猫礼赠券', //优惠券name
    voucherDescription: '幼猫系列商城每满68-11元', //优惠券描述
    expiredTime: '2022.03.02-2022.12.31', //领取/失效时间
    isReceived: true, //是否已领取
    isExpired: false,
    isSelect: false,
    voucherUsePrice: 68,
    isUsed: true,
    voucherType: 'SHOP_VOUCHER', //优惠券类型，店铺通用优惠券/商品型优惠券
    isCanUsed: false, //checkout时是否可用
    productInfoIds: []
  },
  {
    id: '333',
    voucherPrice: 11, //优惠价格
    voucherName: '幼猫礼赠券', //优惠券name
    voucherDescription: '幼猫系列商城每满68-11元', //优惠券描述
    expiredTime: '2022.03.02-2022.12.31', //领取/失效时间
    isReceived: true, //是否已领取
    isExpired: true,
    isSelect: false,
    voucherUsePrice: 68,
    isUsed: true,
    voucherType: 'SHOP_VOUCHER', //优惠券类型，店铺通用优惠券/商品型优惠券
    isCanUsed: false, //checkout时是否可用
    productInfoIds: []
  },
  {
    id: '4444',
    voucherPrice: 11, //优惠价格
    voucherName: '幼猫礼赠券', //优惠券name
    voucherDescription: '幼猫系列商城每满68-11元', //优惠券描述
    expiredTime: '2022.03.02-2022.12.31', //领取/失效时间
    isReceived: true, //是否已领取
    isExpired: false,
    isSelect: false,
    voucherUsePrice: 68,
    isUsed: true,
    voucherType: 'PRODUCT_VOUCHER', //优惠券类型，店铺通用优惠券/商品型优惠券
    isCanUsed: false, //checkout时是否可用
    productInfoIds: ['0eb20d9f-511f-8150-4909-db08ba5c1438']
  },
]
