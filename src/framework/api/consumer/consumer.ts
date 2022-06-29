import { Consumer } from '@/framework/types/consumer'
import Taro from '@tarojs/taro'
import ApiRoot, { baseSetting } from '../fetcher'
import apis from '@/framework/config/api-config'

export const getConsumer = async () => {
  try {
    const consumer = await ApiRoot().consumers().getConsumer({ id: baseSetting.consumerId })
    console.log('get consumer view', consumer)
    return consumer
  } catch (err) {
    console.log(err)
    return []
  }
}

interface WxLoginResult {
  access_token: string
  userInfo: Consumer
}
export const wxRegisterAndLogin = async (): Promise<Consumer> => {
  const { userInfo } = await Taro.getUserProfile({
    lang: 'zh_CN',
    desc: '获取授权',
  })
  const loginRes = await Taro.login()
  const { wxRegisterAndLogin: wxLoginRes }: { wxRegisterAndLogin: WxLoginResult } =
    await ApiRoot({ url: apis.auth }).consumers().wxRegisterAndLogin({
      input: {
        jsCode: loginRes.code,
        storeId: '12345678',
      },
      userInfo: {
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName,
        gender: userInfo.gender + '',
      },
    }, userInfo.nickName)
  console.log('wxLoginRes', wxLoginRes)
  Taro.setStorageSync('wxLoginRes', wxLoginRes)
  return wxLoginRes.userInfo
}

export const wxLogin = async () => {
  let wxLoginResStorage = Taro.getStorageSync('wxLoginRes')
  const { wxLogin: wxLoginRes }: { wxLogin: WxLoginResult } = await ApiRoot({ url: apis.auth }).consumers().wxLogin({
    id: wxLoginResStorage.userInfo.id,
  })
  console.log('wxLoginRes', wxLoginRes)
  Taro.setStorageSync('wxLoginRes', Object.assign(wxLoginResStorage, wxLoginRes))
  return wxLoginRes.userInfo
}

export const wxBindPhone = async (jsCode) => {
  let wxLoginRes = Taro.getStorageSync('wxLoginRes')
  if (wxLoginRes) {
    const res = await ApiRoot({ url: apis.auth }).consumers().wxBindPhone({
      input: {
        jsCode,
        storeID: '12345678',
        consumerId: wxLoginRes.userInfo.id,
      },
    })
    if (res?.wxBindPhoneNumber) {
      Taro.showToast({ icon: 'success', title: '绑定成功' })
    }
  }
}
