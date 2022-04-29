import ClientBuilder from '@/rc-china-commerce/packages/taro/lib'
import Taro from '@tarojs/taro'

const customerInfo = Taro.getStorageSync('wxLoginRes').userInfo

export const isMock = false

export const baseSetting = {
  customerId: customerInfo?.id || 'test001',
  storeId: '12345678',
}

// const API_URL = 'http://localhost:9000/graphql'
const API_URL = 'https://dtc-faas-dtc-plaform-dev-woyuxzgfcv.cn-shanghai.fcapp.run/graphql'

const ApiRoot = new ClientBuilder().config({ url: API_URL })
new ClientBuilder().config({ url: API_URL })
export default ApiRoot
