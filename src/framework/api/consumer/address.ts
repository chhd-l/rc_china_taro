import { Address } from '@/framework/types/consumer'
import { addressListMockData } from '@/mock/consumer'
import Mock from 'mockjs'
import Taro from '@tarojs/taro'
import apis from '@/framework/config/api-config'
import ApiRoot, { isMock } from '../fetcher'

export const getAddresses = async () => {
  try {
    if (isMock) {
      return Mock.mock(addressListMockData)
    } else {
      const wxLoginRes = Taro.getStorageSync('wxLoginRes')
      const addresses = await ApiRoot({ url: apis.address })
        .addresses()
        .getAddresses({ consumerId: wxLoginRes?.userInfo?.id })
      return addresses
    }
  } catch (err) {
    console.log(err)
    return []
  }
}

export const createAddress = async (params: any) => {
  try {
    const addresses = await ApiRoot({ url: apis.address }).addresses().createAddress({
      body: params,
    })
    console.log(addresses)
    return addresses
  } catch (e) {
    console.log(e)
    return false
  }
}

export const deleteAddress = async ({ id }: { id: string }) => {
  try {
    const addresses = await ApiRoot({ url: apis.address }).addresses().deleteAddress({
      id,
    })
    console.log(addresses)
    return addresses
  } catch (e) {
    console.log(e)
    return false
  }
}

export const updateAddress = async ({ params }: { params: Address | any }) => {
  try {
    const addresses = await ApiRoot({ url: apis.address }).addresses().updateAddress({
      body: params,
    })
    console.log(addresses)
    return addresses
  } catch (e) {
    console.log(e)
    return false
  }
}
