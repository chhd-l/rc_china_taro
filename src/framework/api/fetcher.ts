import ClientBuilder from '@/rc-china-commerce/packages/taro/lib'

// const API_URL = 'http://localhost:9000/graphql'
const API_URL = 'https://dtc-faas-dtc-plaform-dev-woyuxzgfcv.cn-shanghai.fcapp.run/graphql'

const ApiRoot = new ClientBuilder().config({ url: API_URL })
export default ApiRoot
