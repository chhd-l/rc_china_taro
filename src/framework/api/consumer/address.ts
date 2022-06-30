import { Address } from '@/framework/types/consumer'
import { addressListMockData } from '@/mock/consumer'
import Mock from 'mockjs'
import Taro from "@tarojs/taro";
import ApiRoot, { baseSetting, isMock } from '../fetcher'

export const getAddresses = async () => {
  try {
    if (isMock) {
      return Mock.mock(addressListMockData)
    } else {
      const wxLoginRes = Taro.getStorageSync('wxLoginRes')
      const addresses = await ApiRoot().addresses().getAddresses({ consumerId: wxLoginRes?.userInfo?.id })
      return addresses
    }
  } catch (err) {
    console.log(err)
    return []
  }
}

export const createAddress = async (params: any) => {
  try {
    const addresses = await ApiRoot().addresses().createAddress({
      body: Object.assign(params, { storeId: baseSetting.storeId, consumerId: baseSetting.consumerId }),
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
    const addresses = await ApiRoot().addresses().deleteAddress({
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
    const addresses = await ApiRoot().addresses().updateAddress({
      body: params,
    })
    console.log(addresses)
    return addresses
  } catch (e) {
    console.log(e)
    return []
  }
}
