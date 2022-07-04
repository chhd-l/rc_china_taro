import Taro from '@tarojs/taro'
import apis from '@/framework/config/api-config'
import ApiRoot from './fetcher'

export const getTagByConsumerIdAndTagCode = async () => {
  try {
    let wxLoginRes = Taro.getStorageSync('wxLoginRes')
    const res = await ApiRoot({url:apis?.tag}).tags().getTagByConsumerIdAndTagCode({
      code: 'WX_GROUP_VIP',
      consumerId: wxLoginRes?.userInfo?.id || '',
    })
    console.log('get tag by consumerId and tagCode list view data', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}
