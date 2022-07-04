import ApiRoot from '@/framework/api/fetcher'
import Taro from '@tarojs/taro'

export const getConsumerAccounts = async () => {
  try {
    let wxLoginRes = Taro.getStorageSync('wxLoginRes')
    if (wxLoginRes?.userInfo?.id) {
      const res = await ApiRoot().consumers().getConsumerAccounts(wxLoginRes?.userInfo?.id)
      console.log('get consumer accounts view data', res)
      return res
    }else{
      return []
    }
  } catch (e) {
    console.log(e)
    return []
  }
}
