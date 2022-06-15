import { normalizeCartData } from '@/framework/api/lib/normalize'
import { getProductBySkuId } from '@/framework/api/product/get-product'
import { dataSource } from '@/mock/cart'
import Mock from 'mockjs'
import { session } from '@/utils/global'
import Taro from '@tarojs/taro'
import ApiRoot, { baseSetting, isMock } from '../fetcher'

export const getCarts = async (isNeedReload = false) => {
  try {
    if (isMock) {
      return Mock.mock(dataSource)
    } else {
      let cartProducts = session.get('cart-data')
      let finallyCartDatas: any[] = []
      if (!cartProducts || isNeedReload) {
        let wxLoginRes = Taro.getStorageSync('wxLoginRes')
        const res = await ApiRoot.carts().getCarts({
          customerId: wxLoginRes?.customerAccount?.customerId,
          storeId: wxLoginRes?.customerAccount?.storeId,
        })
        cartProducts = res?.carts || []
        console.log('cart data', cartProducts)
        for (let i = 0; i < cartProducts.length; i++) {
          //查询商品信息
          let data = await getProductBySkuId({ goodsVariantId: cartProducts[i].goodsVariantID })
          if (data?.productBySkuId) {
            finallyCartDatas.push(normalizeCartData(cartProducts[i], data?.productBySkuId))
          }
        }
        session.set('cart-data', finallyCartDatas)
      } else {
        finallyCartDatas = cartProducts
      }
      console.log('cart products data', finallyCartDatas)
      return finallyCartDatas || []
    }
  } catch (err) {
    console.log('err', err)
    return []
  }
}

export const getCartAndProducts = async (isNeedReload = false) => {
  try {
    if (isMock) {
      return Mock.mock(dataSource)
    } else {
      let cartProducts = session.get('cart-data')
      let finallyCartDatas: any[] = []
      if (!cartProducts || isNeedReload) {
        let wxLoginRes = Taro.getStorageSync('wxLoginRes')
        const res = await ApiRoot.carts().getCartAndProduct({
          customerId: wxLoginRes?.customerAccount?.customerId || '',
          storeId: wxLoginRes?.customerAccount?.storeId || '',
        })
        cartProducts = res || []
        console.log('cart data', cartProducts)
        for (let i = 0; i < cartProducts.length; i++) {
          if (cartProducts[i]?.productBySkuId) {
            finallyCartDatas.push(normalizeCartData(cartProducts[i], cartProducts[i]?.productBySkuId))
          }
        }
        session.set('cart-data', finallyCartDatas)
      } else {
        finallyCartDatas = cartProducts
      }
      console.log('cart products data', finallyCartDatas)
      return finallyCartDatas || []
    }
  } catch (err) {
    console.log('err', err)
    return []
  }
}

export const getCartNumber = async (goodsId, customerInfo) => {
  // let { customerAccount } = Taro.getStorageSync('wxLoginRes')
  if (!customerInfo?.id) {
    return {
      cartNumber: 0,
      currentCartSpu: [],
    }
  }
  const res = await ApiRoot.carts().getCarts({
    customerId: customerInfo?.id,
    storeId: '12345678',
  })
  const cartNumber = (res?.carts || []).reduce((prev, cur) => {
    return prev + cur.goodsNum
  }, 0)
  let currentCartSpu = (res?.carts || []).filter((el) => el.goodsId === goodsId)

  return {
    cartNumber: cartNumber || 0,
    currentCartSpu,
  }
}

export const createCart = async (params: any) => {
  try {
    const cart = await ApiRoot.carts().createCart({
      body: params,
    })
    console.log('create cart view', cart)
    return cart
  } catch (e) {
    console.log(e)
    return []
  }
}

export const deleteCart = async ({ id, operator }: { id: string; operator: string }) => {
  try {
    const data = await ApiRoot.carts().deleteCart({
      body: { id, operator },
    })
    console.log('delete cart view', data)
    return data?.deleteCart || false
  } catch (e) {
    console.log(e)
    return false
  }
}

export const batchDeleteCart = async ({ ids, operator }: { ids: any[]; operator: string }) => {
  try {
    const data = await ApiRoot.carts().batchDeleteCart({
      ids,
      operator,
    })
    console.log('batch delete cart view', data)
    return data || false
  } catch (e) {
    console.log(e)
    return false
  }
}

export const updateCart = async ({ id, goodsNum, operator }: { id: string; goodsNum: number; operator: string }) => {
  try {
    const cart = await ApiRoot.carts().updateCart({
      body: {
        id,
        goodsNum,
        operator,
        storeId: baseSetting.storeId,
      },
    })
    console.log(cart)
    return cart
  } catch (e) {
    console.log(e)
    return []
  }
}
