type TApiConfig = {
  auth: string
  productList: string
  productSearch: string
  product: string
  productDetail: string
  subscriptionRecommend: string
  subscription: string
  common_subscription: string
  wx_pet: string
  common_pet: string
  sku_detail: string
}

interface IApiConfig {
  development: any
  production: any
  test?: TApiConfig
}

const API_CONFIG: IApiConfig = {
  development: {
    auth: "https://fc-mp-auth-dev-miniprogram-dkpsdvztiu.cn-shanghai.fcapp.run/graphql",
    cart: "https://fc-mp-cart-dev-miniprogram-dkpsdtlniw.cn-shanghai.fcapp.run/fc-mp-cart/graphql",
    orderCreate: "https://fc-mp-or-create-dev-miniprogram-oldnuaupiz.cn-shanghai.fcapp.run/fc-mp-order-create/graphql",
    orderList: "https://fc-com-der-list-dev-common-vbypvtabkd.cn-shanghai.fcapp.run/fc-com-order-list/graphql",
    orderDetail: "https://fc-com-r-detail-dev-common-osunrnujbz.cn-shanghai.fcapp.run/fc-com-order-detail/graphql",
    order_action: 'https://fc-mp-or-action-dev-miniprogram-onmccvfpiz.cn-shanghai.fcapp.run/fc-mp-order-action/graphql',
    voucher: "https://fc-com-voucher-dev-common-sfkvithbhy.cn-shanghai.fcapp.run/fc-com-voucher/graphql",
    payment: "https://fc-com-payment-dev-common-szirsgqhhy.cn-shanghai.fcapp.run/fc-com-payment/graphql",
    productList: "https://fc-com-es-list-dev-common-hdggvbqeut.cn-shanghai.fcapp.run/graphql",
    productSearch: "https://fass-mpt-search-dev-miniprogram-jzjyyinpmr.cn-shanghai.fcapp.run/graphql",
    product: "https://fc-com-product-dev-common-szrflwfhhy.cn-shanghai.fcapp.run/graphql",
    productDetail: "https://fc-com-t-detail-dev-common-slnmmkfhwn.cn-shanghai.fcapp.run/graphql",
    subscriptionRecommend: "https://fc-mp-secommend-dev-miniprogram-vlanfdfmqo.cn-shanghai.fcapp.run/graphql",
    subscription: "https://fc-mp-scription-dev-miniprogram-pvbcaozpei.cn-shanghai.fcapp.run/graphql",
    tag: "https://fc-mp-tag-dev-miniprogram-mnsragfkdg.cn-shanghai.fcapp.run/fc-mp-tag/graphql",
    address_action: 'https://fc-mp-address-dev-miniprogram-fvpbgogegq.cn-shanghai.fcapp.run/fc-mp-address/graphql',
    address_list: "https://fc-com-ess-list-dev-common-quileiwebv.cn-shanghai.fcapp.run/fc-com-address-list/graphql",
    common_subscription: "https://fc-com-cription-dev-common-ogvrfcxebk.cn-shanghai.fcapp.run/graphql",
    common_pet: "https://fc-com-pet-dev-common-oecjgzxfmp.cn-shanghai.fcapp.run/graphql",
    wx_pet: "https://fc-mp-pet-dev-miniprogram-mnsracjtdg.cn-shanghai.fcapp.run/graphql",
    consumer: 'https://fc-sc-consumer-dev-selercenter-ybuuesxcai.cn-shanghai.fcapp.run/fc-sc-consumer/graphql',
    storeSetting: 'https://fc-com-setting-dev-common-dmgwlxbcvr.cn-shanghai.fcapp.run/fc-com-store-setting/graphql',
    liveStreaming: 'https://fc-com-treaming-dev-common-unckjafhvm.cn-shanghai.fcapp.run/fc-com-live-streaming/graphql',
    sku_detail: "https://fc-com-u-detail-dev-common-rfhybdgjkv.cn-shanghai.fcapp.run/graphql"
  },
  production: {
    auth: "https://fc-mp-auth-dev-miniprogram-dkpsdvztiu.cn-shanghai.fcapp.run/graphql",
    cart: "https://fc-mp-cart-dev-miniprogram-dkpsdtlniw.cn-shanghai.fcapp.run/fc-mp-cart/graphql",
    orderCreate: "https://fc-mp-or-create-dev-miniprogram-oldnuaupiz.cn-shanghai.fcapp.run/fc-mp-order-create/graphql",
    orderList: "https://fc-com-der-list-dev-common-vbypvtabkd.cn-shanghai.fcapp.run/fc-com-order-list/graphql",
    orderDetail: "https://fc-com-r-detail-dev-common-osunrnujbz.cn-shanghai.fcapp.run/fc-com-order-detail/graphql",
    order_action: 'https://fc-mp-or-action-dev-miniprogram-onmccvfpiz.cn-shanghai.fcapp.run/fc-mp-order-action/graphql',
    voucher: "https://fc-com-voucher-dev-common-sfkvithbhy.cn-shanghai.fcapp.run/fc-com-voucher/graphql",
    payment: "https://fc-com-payment-dev-common-szirsgqhhy.cn-shanghai.fcapp.run/fc-com-payment/graphql",
    productList: "https://fc-com-es-list-dev-common-hdggvbqeut.cn-shanghai.fcapp.run/graphql",
    productSearch: "https://fass-mpt-search-dev-miniprogram-jzjyyinpmr.cn-shanghai.fcapp.run/graphql",
    product: "https://fc-com-product-dev-common-szrflwfhhy.cn-shanghai.fcapp.run/graphql",
    productDetail: "https://fc-com-t-detail-dev-common-slnmmkfhwn.cn-shanghai.fcapp.run/graphql",
    subscriptionRecommend: "https://fc-mp-secommend-dev-miniprogram-vlanfdfmqo.cn-shanghai.fcapp.run/graphql",
    subscription: "https://fc-mp-scription-dev-miniprogram-pvbcaozpei.cn-shanghai.fcapp.run/graphql",
    tag: "https://fc-mp-tag-dev-miniprogram-mnsragfkdg.cn-shanghai.fcapp.run/fc-mp-tag/graphql",
    address_action: 'https://fc-mp-address-dev-miniprogram-fvpbgogegq.cn-shanghai.fcapp.run/fc-mp-address/graphql',
    address_list: "https://fc-com-ess-list-dev-common-quileiwebv.cn-shanghai.fcapp.run/fc-com-address-list/graphql",
    common_subscription: "https://fc-com-cription-dev-common-ogvrfcxebk.cn-shanghai.fcapp.run/graphql",
    common_pet: "https://fc-com-pet-dev-common-oecjgzxfmp.cn-shanghai.fcapp.run/graphql",
    wx_pet: "https://fc-mp-pet-dev-miniprogram-mnsracjtdg.cn-shanghai.fcapp.run/graphql",
    consumer: 'https://fc-sc-consumer-dev-selercenter-ybuuesxcai.cn-shanghai.fcapp.run/fc-sc-consumer/graphql',
    storeSetting: 'https://fc-com-setting-dev-common-dmgwlxbcvr.cn-shanghai.fcapp.run/fc-com-store-setting/graphql',
    liveStreaming: 'https://fc-com-treaming-dev-common-unckjafhvm.cn-shanghai.fcapp.run/fc-com-live-streaming/graphql',
    sku_detail: "https://fc-com-u-detail-dev-common-rfhybdgjkv.cn-shanghai.fcapp.run/graphql"
  }
}

export default API_CONFIG[process.env.NODE_ENV || "production"]
