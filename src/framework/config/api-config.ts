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
  development: TApiConfig
  production: TApiConfig
  test?: TApiConfig
}

const API_CONFIG: IApiConfig = {
  development: {
    auth: "https://fc-mp-auth-dev-miniprogram-dkpsdvztiu.cn-shanghai.fcapp.run/graphql",
    productList: "https://fc-mp-puct-list-dev-miniprogram-eyaedzopje.cn-shanghai.fcapp.run/graphql",
    productSearch: "https://fass-mpt-search-dev-miniprogram-jzjyyinpmr.cn-shanghai.fcapp.run/graphql",
    product: "https://fc-com-product-dev-common-szrflwfhhy.cn-shanghai.fcapp.run/graphql",
    productDetail: "https://fc-com-t-detail-dev-common-slnmmkfhwn.cn-shanghai.fcapp.run/graphql",
    subscriptionRecommend: "https://fc-mp-secommend-dev-miniprogram-vlanfdfmqo.cn-shanghai.fcapp.run/graphql",
    subscription: "https://fc-mp-scription-dev-miniprogram-pvbcaozpei.cn-shanghai.fcapp.run/graphql",
  },
  production: {
    auth: "https://fc-mp-auth-dev-miniprogram-dkpsdvztiu.cn-shanghai.fcapp.run/graphql",
    productList: "https://fc-mp-puct-list-dev-miniprogram-eyaedzopje.cn-shanghai.fcapp.run/graphql",
    productSearch: "https://fass-mpt-search-dev-miniprogram-jzjyyinpmr.cn-shanghai.fcapp.run/graphql",
    product: "https://fc-com-product-dev-common-szrflwfhhy.cn-shanghai.fcapp.run/graphql",
    productDetail: "https://fc-com-t-detail-dev-common-slnmmkfhwn.cn-shanghai.fcapp.run/graphql",
    subscriptionRecommend: "https://fc-mp-secommend-dev-miniprogram-vlanfdfmqo.cn-shanghai.fcapp.run/graphql",
    subscription: "https://fc-mp-scription-dev-miniprogram-pvbcaozpei.cn-shanghai.fcapp.run/graphql",
  }
}

export default API_CONFIG[process.env.NODE_ENV || "production"]
