import { Customer } from '@/framework/types/customer'
import Taro from '@tarojs/taro'
import ApiRoot from '../fetcher'

interface WxLoginResult {
  access_token: string
  userInfo: Customer
}
export const wxLogin = async (): Promise<Customer> => {
  const { userInfo } = await Taro.getUserProfile({
    lang: 'zh_CN',
    desc: '获取授权',
  })
  const loginRes = await Taro.login()
  const { wxLogin: wxLoginRes }: { wxLogin: WxLoginResult } = await ApiRoot.customers().wxLogin({
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
