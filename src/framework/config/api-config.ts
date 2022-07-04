import { Subscription } from './../../rc-china-commerce/packages/common/lib/models/Subscription'

type TApiConfig = {
  auth: string
  productList: string
  productSearch: string
  product: string
  productDetail: string
  subscriptionRecommend: string
  subscription: string
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
    order: "https://fc-com-order-dev-common-matrcxbdtw.cn-shanghai.fcapp.run/graphql",
    address: "https://fc-com-address-dev-common-sifkzgpahy.cn-shanghai.fcapp.run/graphql",
    productSkuDetail: "https://msstg.fivefen.com/faas/graphql",
    orderCreate: "https://fc-mp-or-create-dev-miniprogram-oldnuaupiz.cn-shanghai.fcapp.run/graphql",
    orderList: "https://fc-com-der-list-dev-common-vbypvtabkd.cn-shanghai.fcapp.run/graphql",
    orderDetail: "https://fc-com-r-detail-dev-common-osunrnujbz.cn-shanghai.fcapp.run/graphql",
    voucher: "https://fc-com-voucher-dev-common-sfkvithbhy.cn-shanghai.fcapp.run/graphql",
    payment: "https://fc-com-payment-dev-common-szirsgqhhy.cn-shanghai.fcapp.run/graphql",
    productList: "https://fc-mp-puct-list-dev-miniprogram-eyaedzopje.cn-shanghai.fcapp.run/graphql",
    productSearch: "https://fass-mpt-search-dev-miniprogram-jzjyyinpmr.cn-shanghai.fcapp.run/graphql",
    product: "https://fc-com-product-dev-common-szrflwfhhy.cn-shanghai.fcapp.run/graphql",
    productDetail: "https://fc-com-t-detail-dev-common-slnmmkfhwn.cn-shanghai.fcapp.run/graphql",
    subscriptionRecommend: "https://fc-mp-secommend-dev-miniprogram-vlanfdfmqo.cn-shanghai.fcapp.run/graphql",
    subscription: "https://fc-mp-scription-dev-miniprogram-pvbcaozpei.cn-shanghai.fcapp.run/graphql",
  },
  production: {
    auth: "https://fc-mp-auth-dev-miniprogram-dkpsdvztiu.cn-shanghai.fcapp.run/graphql",
    cart: "https://fc-mp-cart-dev-miniprogram-dkpsdtlniw.cn-shanghai.fcapp.run/graphql",
    order: "https://fc-com-order-dev-common-matrcxbdtw.cn-shanghai.fcapp.run/graphql",
    address: "https://fc-com-address-dev-common-sifkzgpahy.cn-shanghai.fcapp.run/graphql",
    productSkuDetail: "http://localhost:7000/graphql",
    orderCreate: "https://fc-mp-or-create-dev-miniprogram-oldnuaupiz.cn-shanghai.fcapp.run/graphql",
    orderList: "https://fc-com-der-list-dev-common-vbypvtabkd.cn-shanghai.fcapp.run/graphql",
    orderDetail: "https://fc-com-r-detail-dev-common-osunrnujbz.cn-shanghai.fcapp.run/graphql",
    voucher: "https://fc-com-voucher-dev-common-sfkvithbhy.cn-shanghai.fcapp.run/graphql",
    payment: "https://fc-com-payment-dev-common-szirsgqhhy.cn-shanghai.fcapp.run/graphql",
    productList: "https://fc-mp-puct-list-dev-miniprogram-eyaedzopje.cn-shanghai.fcapp.run/graphql",
    productSearch: "https://fass-mpt-search-dev-miniprogram-jzjyyinpmr.cn-shanghai.fcapp.run/graphql",
    product: "https://fc-com-product-dev-common-szrflwfhhy.cn-shanghai.fcapp.run/graphql",
    productDetail: "https://fc-com-t-detail-dev-common-slnmmkfhwn.cn-shanghai.fcapp.run/graphql",
    subscriptionRecommend: "https://fc-mp-secommend-dev-miniprogram-vlanfdfmqo.cn-shanghai.fcapp.run/graphql",
    subscription: "https://fc-mp-scription-dev-miniprogram-pvbcaozpei.cn-shanghai.fcapp.run/graphql",
  }
}

export default API_CONFIG[process.env.NODE_ENV || "production"]
