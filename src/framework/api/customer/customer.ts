import { Customer } from '@/framework/types/customer'
import Taro from '@tarojs/taro'
import ApiRoot, { baseSetting } from '../fetcher'

export const getCustomer = async () => {
  try {
    const customer = await ApiRoot.customers().getCustomer({ id: baseSetting.customerId })
    console.log('get customer view', customer)
    return customer
  } catch (err) {
    console.log(err)
    return []
  }
}

interface WxLoginResult {
  access_token: string
  userInfo: Customer
}
export const wxRegisterAndLogin = async (): Promise<Customer> => {
  const { userInfo } = await Taro.getUserProfile({
    lang: 'zh_CN',
    desc: '获取授权',
  })
  const loginRes = await Taro.login()
  const { wxRegisterAndLogin: wxLoginRes }: { wxRegisterAndLogin: WxLoginResult } =
    await ApiRoot.customers().wxRegisterAndLogin({
      input: {
        jsCode: loginRes.code,
        storeId: '12345678',
        operator: userInfo.nickName,
      },
      userInfo: {
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName,
        gender: userInfo.gender + '',
        operator: userInfo.nickName,
      },
    })
  console.log('wxLoginRes', wxLoginRes)
  Taro.setStorageSync('wxLoginRes', wxLoginRes)
  return wxLoginRes.userInfo
}

export const wxLogin = async () => {
  console.log(Taro.getStorageSync('wxLoginRes'), 'wxLoginReswxLoginReswxLoginReswxLoginRes')
  const { wxLogin: wxLoginRes }: { wxLogin: WxLoginResult } = await ApiRoot.customers().wxLogin({
    id: Taro.getStorageSync('wxLoginRes').userInfo.id,
  })
  console.log('wxLoginRes', wxLoginRes)
  Taro.setStorageSync('wxLoginRes', wxLoginRes)
  return wxLoginRes.userInfo
}

export const wxBindPhone = async (jsCode) => {
  let wxLoginRes = Taro.getStorageSync('wxLoginRes')
  if (wxLoginRes) {
    await ApiRoot.customers().wxBindPhone({
      input: {
        jsCode,
        storeID: '12345678',
        operator: 'zyq',
        customerId: wxLoginRes.userInfo.id,
      },
    })
  }
}
