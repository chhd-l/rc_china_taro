type TApiConfig = {
  auth: string;
}

interface IApiConfig {
  development: any;
  production: any;
  test?: TApiConfig;
}

const API_CONFIG: IApiConfig = {
  development: {
    auth: "http://localhost:7000/graphql",
    cart: "http://localhost:7000/graphql",
    order: "http://localhost:7000/graphql",
    address: "http://localhost:7000/graphql",
    productSkuDetail:"http://localhost:7000/graphql",
    orderCreate:"http://localhost:7000/graphql",
    orderList:"http://localhost:7000/graphql",
    orderDetail:"http://localhost:7000/graphql",
    voucher:"http://localhost:7000/graphql",
    payment:"http://localhost:7000/graphql",
  },
  production: {
    auth: "https://fc-mp-auth-dev-miniprogram-dkpsdvztiu.cn-shanghai.fcapp.run/graphql",
    cart: "https://fc-mp-cart-dev-miniprogram-dkpsdtlniw.cn-shanghai.fcapp.run/graphql",
    order: "https://fc-com-order-dev-common-matrcxbdtw.cn-shanghai.fcapp.run/graphql",
    address: "http://localhost:7000/graphql",
    productSkuDetail:"http://localhost:7000/graphql",
    orderCreate:"https://fc-mp-or-create-dev-miniprogram-oldnuaupiz.cn-shanghai.fcapp.run/graphql",
    orderList:"https://fc-com-der-list-dev-common-vbypvtabkd.cn-shanghai.fcapp.run/graphql",
    orderDetail:"https://fc-com-r-detail-dev-common-osunrnujbz.cn-shanghai.fcapp.run/graphql",
    voucher:"https://fc-com-voucher-dev-common-sfkvithbhy.cn-shanghai.fcapp.run/graphql",
    payment:"https://fc-com-payment-dev-common-szirsgqhhy.cn-shanghai.fcapp.run/graphql",
  }
}

export default API_CONFIG[process.env.NODE_ENV || "production"];
