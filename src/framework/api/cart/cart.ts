import { normalizeCartData } from '@/framework/api/lib/normalize'
import { getProductBySkuId } from '@/framework/api/product/get-product'
import ApiRoot, { baseSetting } from '../fetcher'

export const getCarts = async () => {
  try {
    const res = await ApiRoot.carts().getCarts({ customerId: baseSetting.customerId, storeId: baseSetting.storeId })
    const carts = res?.carts || []
    console.log('cart data', carts)
    for (let i = 0; i < carts.length; i++) {
      let data = await getProductBySkuId({ goodsVariantId: carts[i].goodsVariantID })
      carts[i] = normalizeCartData(carts[i], data.productBySkuId)
    }
    console.log('cart products data', carts)
    return carts
  } catch (err) {
    console.log('err', err)
    return []
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
    return data
  } catch (e) {
    console.log(e)
    return []
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
