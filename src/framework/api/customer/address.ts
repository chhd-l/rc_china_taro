import { Address } from '@/framework/types/customer'
import { addressListMockData } from '@/mock/customer'
import Mock from 'mockjs'
import ApiRoot, { baseSetting, isMock } from '../fetcher'

export const getAddresses = async ({customerId}:{customerId:string}) => {
  try {
    if (isMock) {
      return Mock.mock(addressListMockData)
    } else {
      const addresses = await ApiRoot.addresses().getAddresses({ customerId })
      return addresses
    }
  } catch (err) {
    console.log(err)
    return []
  }
}

export const createAddress = async (params: any) => {
  try {
    const addresses = await ApiRoot.addresses().createAddress({
      body: Object.assign(params, { storeId: baseSetting.storeId, customerId: baseSetting.customerId }),
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
