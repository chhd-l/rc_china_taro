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
    cart: "https://fc-mp-cart-dev-miniprogram-dkpsdtlniw.cn-shanghai.fcapp.run/graphql",
    productSkuDetail: "https://fc-com-u-detail-dev-common-rfhybdgjkv.cn-shanghai.fcapp.run/graphql",
    orderCreate: "https://fc-mp-or-create-dev-miniprogram-oldnuaupiz.cn-shanghai.fcapp.run/graphql",
    orderList: "https://fc-com-der-list-dev-common-vbypvtabkd.cn-shanghai.fcapp.run/graphql",
    orderDetail: "https://fc-com-r-detail-dev-common-osunrnujbz.cn-shanghai.fcapp.run/graphql",
    order_action: 'https://fc-mp-or-action-dev-miniprogram-onmccvfpiz.cn-shanghai.fcapp.run/graphql',
    voucher: "https://fc-com-voucher-dev-common-sfkvithbhy.cn-shanghai.fcapp.run/graphql",
    payment: "https://fc-com-payment-dev-common-szirsgqhhy.cn-shanghai.fcapp.run/graphql",
    productList: "https://fc-com-es-list-dev-common-hdggvbqeut.cn-shanghai.fcapp.run/fc-com-product-es-list/graphql",
    productSearch: "https://fc-mp-pt-search-dev-miniprogram-aagluzobct.cn-shanghai.fcapp.run/fc-mp-product-search/graphql",
    product: "https://fc-com-product-dev-common-szrflwfhhy.cn-shanghai.fcapp.run/fc-com-product/graphql",
    productDetail: "https://fc-com-t-detail-dev-common-slnmmkfhwn.cn-shanghai.fcapp.run/fc-com-product-detail/graphql",
    subscriptionRecommend: "https://fc-mp-secommend-dev-miniprogram-vlanfdfmqo.cn-shanghai.fcapp.run/fc-mp-subscription-recommend/graphql",
    subscription: "https://fc-mp-scription-dev-miniprogram-pvbcaozpei.cn-shanghai.fcapp.run/fc-mp-subscription/graphql",
    tag: "https://fc-mp-tag-dev-miniprogram-mnsragfkdg.cn-shanghai.fcapp.run/graphql",
    address_action: 'https://fc-mp-address-dev-miniprogram-fvpbgogegq.cn-shanghai.fcapp.run/graphql',
    address_list: "https://fc-com-ess-list-dev-common-quileiwebv.cn-shanghai.fcapp.run/graphql",
    common_subscription: "https://fc-com-cription-dev-common-ogvrfcxebk.cn-shanghai.fcapp.run/fc-com-subscription/graphql",
    common_pet: "https://fc-com-pet-dev-common-oecjgzxfmp.cn-shanghai.fcapp.run/fc-com-pet/graphql",
    wx_pet: "https://fc-mp-pet-dev-miniprogram-mnsracjtdg.cn-shanghai.fcapp.run/fc-mp-pet/graphql",
    consumer: 'https://fc-sc-consumer-dev-selercenter-ybuuesxcai.cn-shanghai.fcapp.run/graphql',
    storeSetting: 'https://fc-com-setting-dev-common-dmgwlxbcvr.cn-shanghai.fcapp.run/graphql',
    liveStreaming: 'https://fc-com-treaming-dev-common-unckjafhvm.cn-shanghai.fcapp.run/graphql',
    sku_detail: "https://fc-com-u-detail-dev-common-rfhybdgjkv.cn-shanghai.fcapp.run/graphql"
  },
  production: {
    auth: "https://fc-mp-auth-dev-miniprogram-dkpsdvztiu.cn-shanghai.fcapp.run/graphql",
    cart: "https://fc-mp-cart-dev-miniprogram-dkpsdtlniw.cn-shanghai.fcapp.run/graphql",
    productSkuDetail: "https://fc-com-u-detail-dev-common-rfhybdgjkv.cn-shanghai.fcapp.run/graphql",
    orderCreate: "https://fc-mp-or-create-dev-miniprogram-oldnuaupiz.cn-shanghai.fcapp.run/graphql",
    orderList: "https://fc-com-der-list-dev-common-vbypvtabkd.cn-shanghai.fcapp.run/graphql",
    orderDetail: "https://fc-com-r-detail-dev-common-osunrnujbz.cn-shanghai.fcapp.run/graphql",
    order_action: 'https://fc-mp-or-action-dev-miniprogram-onmccvfpiz.cn-shanghai.fcapp.run/graphql',
    voucher: "https://fc-com-voucher-dev-common-sfkvithbhy.cn-shanghai.fcapp.run/graphql",
    payment: "https://fc-com-payment-dev-common-szirsgqhhy.cn-shanghai.fcapp.run/graphql",
    productList: "https://fc-com-es-list-dev-common-hdggvbqeut.cn-shanghai.fcapp.run/graphql",
    productSearch: "https://fc-mp-pt-search-dev-miniprogram-aagluzobct.cn-shanghai.fcapp.run/graphql",
    product: "https://fc-com-product-dev-common-szrflwfhhy.cn-shanghai.fcapp.run/graphql",
    productDetail: "https://fc-com-t-detail-dev-common-slnmmkfhwn.cn-shanghai.fcapp.run/graphql",
    subscriptionRecommend: "https://fc-mp-secommend-dev-miniprogram-vlanfdfmqo.cn-shanghai.fcapp.run/graphql",
    subscription: "https://fc-mp-scription-dev-miniprogram-pvbcaozpei.cn-shanghai.fcapp.run/graphql",
    tag: "https://fc-mp-tag-dev-miniprogram-mnsragfkdg.cn-shanghai.fcapp.run/graphql",
    address_action: 'https://fc-mp-address-dev-miniprogram-fvpbgogegq.cn-shanghai.fcapp.run/graphql',
    address_list: "https://fc-com-ess-list-dev-common-quileiwebv.cn-shanghai.fcapp.run/graphql",
    common_subscription: "https://fc-com-cription-dev-common-ogvrfcxebk.cn-shanghai.fcapp.run/graphql",
    common_pet: "https://fc-com-pet-dev-common-oecjgzxfmp.cn-shanghai.fcapp.run/graphql",
    wx_pet: "https://fc-mp-pet-dev-miniprogram-mnsracjtdg.cn-shanghai.fcapp.run/graphql",
    consumer: 'https://fc-sc-consumer-dev-selercenter-ybuuesxcai.cn-shanghai.fcapp.run/graphql',
    storeSetting: 'https://fc-com-setting-dev-common-dmgwlxbcvr.cn-shanghai.fcapp.run/graphql',
    liveStreaming: 'https://fc-com-treaming-dev-common-unckjafhvm.cn-shanghai.fcapp.run/graphql',
    sku_detail: "https://fc-com-u-detail-dev-common-rfhybdgjkv.cn-shanghai.fcapp.run/graphql"
  }
}

export default API_CONFIG[process.env.NODE_ENV || "production"]
