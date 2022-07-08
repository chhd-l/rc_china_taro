import { normalizeCartData } from '@/framework/api/lib/normalize'
import { dataSource } from '@/mock/cart'
import Mock from 'mockjs'
import { session } from '@/utils/global'
import { getProductInfoBySkuIds } from '@/framework/api/product/get-product'
import apis from '@/framework/config/api-config'
import Taro from "@tarojs/taro";
import ApiRoot, { isMock } from './fetcher'

export const getCarts = async (isNeedReload = false) => {
  try {
    if(!Taro.getStorageSync('wxLoginRes')?.userInfo?.id){
      return []
    }
    if (isMock) {
      return Mock.mock(dataSource)
    } else {
      let cartProducts = session.get('cart-data')
      let finallyCartDatas: any[] = []
      if (!cartProducts || isNeedReload) {
        cartProducts = await ApiRoot({ url: apis.cart }).carts().getCarts()
        let skuIds = cartProducts
          .filter((el: any) => {
            return el.productVariantId
          })
          .map((item) => item.productVariantId) //把map换成filter，避免出现[null]情况
        if (skuIds.length > 0) {
          const data = await getProductInfoBySkuIds({ skuIds })
          console.log('getProductInfoBySkuIds view data', data)
          cartProducts = cartProducts.map((el: any) => {
            const productGetByProductVariantId = data.find((item: any) => {
              const productVariants = (item?.variants || []).filter(
                (productVariant: any) => productVariant?.id === el.productVariantId,
              )
              if (productVariants.length > 0) {
                return { ...item, productVariants }
              }
            })
            el.productGetByProductVariantId = productGetByProductVariantId
            return el
          })
          for (let i = 0; i < cartProducts.length; i++) {
            if (cartProducts[i]?.productGetByProductVariantId) {
              finallyCartDatas.push(normalizeCartData(cartProducts[i], cartProducts[i]?.productGetByProductVariantId))
            }
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
    if(!Taro.getStorageSync('wxLoginRes')?.userInfo?.id){
      return []
    }
    if (isMock) {
      return Mock.mock(dataSource)
    } else {
      let cartProducts = session.get('cart-data')
      let finallyCartDatas: any[] = []
      if (!cartProducts || isNeedReload) {
        let wxLoginRes = Taro.getStorageSync('wxLoginRes')
        const res = await ApiRoot({url:apis?.cart})
          .carts()
          .getCartAndProduct({
            consumerId: wxLoginRes?.consumerAccount?.consumerId || '',
            storeId: wxLoginRes?.consumerAccount?.storeId || '',
          })
        cartProducts = res || []
        console.log('cart data', cartProducts)
        for (let i = 0; i < cartProducts.length; i++) {
          if (cartProducts[i]?.productGetByProductVariantId) {
            finallyCartDatas.push(normalizeCartData(cartProducts[i], cartProducts[i]?.productGetByProductVariantId))
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

export const getCartNumber = async (productId, consumerInfo) => {
  // let { consumerAccount } = Taro.getStorageSync('wxLoginRes')
  if (!consumerInfo?.id) {
    return {
      cartNumber: 0,
      currentCartSpu: [],
    }
  }
  const res = await ApiRoot({ url: apis.cart }).carts().getCarts()
  const cartNumber = res.reduce((prev, cur) => {
    return prev + cur.productNum
  }, 0)
  let currentCartSpu = res.filter((el) => el.productId === productId)

  return {
    cartNumber: cartNumber || 0,
    currentCartSpu,
  }
}

export const createCart = async (params: any) => {
  try {
    const cart = await ApiRoot({ url: apis.cart }).carts().createCart({
      body: params,
    })
    console.log('create cart view', cart)
    return cart
  } catch (e) {
    console.log(e)
    return []
  }
}

export const deleteCart = async ({ id }: { id: string }) => {
  try {
    const data = await ApiRoot({ url: apis.cart }).carts().deleteCart({
      body: { id },
    })
    console.log('delete cart view', data)
    return data
  } catch (e) {
    console.log(e)
    return false
  }
}

export const batchDeleteCart = async ({ ids }: { ids: any[] }) => {
  try {
    const data = await ApiRoot({ url: apis.cart }).carts().batchDeleteCart({
      ids,
    })
    console.log('batch delete cart view', data)
    return data
  } catch (e) {
    console.log(e)
    return false
  }
}

export const updateCart = async ({ id, productNum }: { id: string; productNum: number }) => {
  try {
    const cart = await ApiRoot({ url: apis.cart }).carts().updateCart({
      body: {
        id,
        productNum,
      },
    })
    console.log(cart)
    return cart
  } catch (e) {
    console.log(e)
    return []
  }
}
