import ApiRoot from '@/framework/api/fetcher'
import Taro from '@tarojs/taro'

export const getConsumerAccounts = async () => {
  try {
    let wxLoginRes = Taro.getStorageSync('wxLoginRes')
    const res = await ApiRoot().consumers().getConsumerAccounts(wxLoginRes?.userInfo?.id)
    console.log('get consumer accounts view data', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}
