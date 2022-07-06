import ApiRoot from '@/framework/api/fetcher'
import Taro from '@tarojs/taro'
import apis from '@/framework/config/api-config'

export const getConsumerAccounts = async () => {
  try {
    let wxLoginRes = Taro.getStorageSync('wxLoginRes')
    if (wxLoginRes?.userInfo?.id) {
      const res = await ApiRoot({url:apis?.consumer}).consumers().getConsumerAccounts(wxLoginRes?.userInfo?.id)
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
