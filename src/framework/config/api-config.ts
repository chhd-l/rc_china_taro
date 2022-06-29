type TApiConfig = {
  auth: string;
}

interface IApiConfig {
  development: TApiConfig;
  production: TApiConfig;
  test?: TApiConfig;
}

const API_CONFIG: IApiConfig = {
  development: {
    auth: "http://localhost:7000/graphql",
  },
  production: {
    auth: "https://fc-sc-auth-dev-selercenter-umayykwqea.cn-shanghai.fcapp.run/graphql",
  }
}

export default API_CONFIG[process.env.NODE_ENV || "production"];
