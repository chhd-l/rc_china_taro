import { normalizeCartData } from '@/framework/api/lib/normalize'
import { getProductBySkuId } from '@/framework/api/product/get-product'
import { dataSource } from '@/mock/cart'
import Mock from 'mockjs'
import { session } from '@/utils/global'
import ApiRoot, { baseSetting, isMock } from '../fetcher'

export const getCarts = async (isNeedReload = false) => {
  try {
    if (isMock) {
      return Mock.mock(dataSource)
    } else {
      let cartProducts = session.get('cart-data')
      if (!cartProducts || isNeedReload) {
        const res = await ApiRoot.carts().getCarts({ customerId: baseSetting.customerId, storeId: baseSetting.storeId })
        cartProducts = res?.carts || []
        console.log('cart data', cartProducts)
        for (let i = 0; i < cartProducts.length; i++) {
          //查询商品信息
          let data = await getProductBySkuId({ goodsVariantId: cartProducts[i].goodsVariantID })
          //todo 商品被删除之后的处理方案
          if (!data?.productBySkuId) {
            cartProducts.splice(i, 1)
          } else {
            cartProducts[i] = normalizeCartData(cartProducts[i], data?.productBySkuId)
          }
        }
        session.set('cart-data', cartProducts)
      }
      console.log('cart products data', cartProducts)
      return cartProducts || []
    }
  } catch (err) {
    console.log('err', err)
    return []
  }
}
export const getCartNumber = async (goodsId) => {
  const res = await ApiRoot.carts().getCarts({ customerId: baseSetting.customerId, storeId: baseSetting.storeId })
  const cartNumber = (res?.carts || []).reduce((prev, cur) => {
    return prev + cur.goodsNum
  }, 0)
  let currentCartSpu = (res?.carts || []).filter(el => el.goodsId === goodsId)

  return {
    cartNumber: cartNumber || 0,
    currentCartSpu
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
