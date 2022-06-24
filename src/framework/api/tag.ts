import Taro from '@tarojs/taro'
import ApiRoot from './fetcher'

export const getTagByConsumerIdAndTagCode = async () => {
  try {
    let wxLoginRes = Taro.getStorageSync('wxLoginRes')
    const res = await ApiRoot.tags().getTagByConsumerIdAndTagCode({
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

export const getTagsByConsumerId = async () => {
  try {
    let wxLoginRes = Taro.getStorageSync('wxLoginRes')
    const res = await ApiRoot.consumers().getConsumerTags({
      consumerId: wxLoginRes?.userInfo?.id || '',
    })
    console.log('get tags by consumerId view data', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}

export const getIsCommunity = async () => {
  try {
    const consumerTags = await getTagsByConsumerId()
    console.log('get tags by consumerId view data', consumerTags)
    const isCommunity = consumerTags.find((el) => el?.tag?.code === 'WX_GROUP_VIP')
    return isCommunity?.tag || false
  } catch (e) {
    console.log(e)
    return false
  }
}
