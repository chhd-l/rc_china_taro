import { Customer } from '@/framework/types/customer'
import Taro from '@tarojs/taro'
import ApiRoot,{baseSetting} from '../fetcher'

export const getCustomer = async () => {
  try {
    const customer = await ApiRoot.customers().getCustomer({ id: baseSetting.customerId })
    console.log('get customer view', customer)
    return customer
  } catch (err) {
    console.log(err)
    return []
  }


interface WxLoginResult {
  access_token: string
  userInfo: Customer
}
export const wxLogin = async (): Promise<Customer> => {
  const {userInfo} = await Taro.getUserProfile({
    lang: 'zh_CN',
    desc: '获取授权',
  })
  const loginRes = await Taro.login()
  const {wxLogin: wxLoginRes}: { wxLogin: WxLoginResult } = await ApiRoot.customers().wxLogin({
    input: {
      jsCode: loginRes.code,
      storeId: '12345678',
      operator: userInfo.nickName,
    },
    userInfo: {
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName,
      operator: userInfo.nickName,
    },
  })
  console.log('wxLoginRes', wxLoginRes)
  Taro.setStorageSync('wxLoginRes', wxLoginRes)
  return wxLoginRes.userInfo
}
