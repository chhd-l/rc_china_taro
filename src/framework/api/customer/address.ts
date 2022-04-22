import { Address } from '@/framework/types/customer'
import Taro from '@tarojs/taro'
import ApiRoot from '../fetcher'

export const getAddresses = async ({ customerId }: { customerId: string }) => {
  try {
    const addresses = await ApiRoot.addresses().getAddresses({ customerId })
    return addresses
  } catch (err) {
    console.log(err)
    return []
  }
}

export const createAddress = async (params: any) => {
  try {
    const addresses = await ApiRoot.addresses().createAddress({
      body: params,
    })
    console.log(addresses)
    return addresses
  } catch (e) {
    console.log(e)
    return []
  }
}

export const deleteAddress = async ({ id }: { id: string }) => {
  try {
    const addresses = await ApiRoot.addresses().deleteAddress({
      id,
      operator: 'system',
    })
    console.log(addresses)
    return addresses
  } catch (e) {
    console.log(e)
    return []
  }
}

export const updateAddress = async ({ params }: { params: Address | any }) => {
  try {
    const addresses = await ApiRoot.addresses().updateAddress({
      body: params,
    })
    console.log(addresses)
    return addresses
  } catch (e) {
    console.log(e)
    return []
  }
}

export const wxLogin = async () => {
  const { userInfo } = await Taro.getUserProfile({
    lang: 'zh_CN',
    desc: '获取授权',
  })
  const loginRes = await Taro.login()

  const data = await ApiRoot.customers().wxLogin({
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
  Taro.setStorageSync('loginInfo', data.wxLogin)
  return data.wxLogin
}
