// import {normalizeProductForFe} from "@/framework/api/lib/normalize";
import ApiRoot from '../fetcher'


export const getCarts = async ({ customerId, storeId }: { customerId: string; storeId: string }) => {
  try {
    const res = await ApiRoot.carts().getCarts({ customerId, storeId })
    const carts = res?.carts || []
    console.log('cart data',carts)
    for (let i = 0; i < carts.length; i++) {
      let data=await ApiRoot.products().getProductBySku({goodsVariantId:carts[i].goodsVariantID})
      carts[i].skuGoodInfo=data.productBySkuId
      carts[i].select=false
      carts[i].localData={
        name:data.productBySkuId.goodsName,
        image:data.productBySkuId.goodsVariants[0].defaultImage,
        price:data.productBySkuId.goodsVariants[0].listPrice,
        tags:[]
      }
    }
    console.log('cart products data',carts)
    return carts
  } catch (err) {
    console.log('err',err)
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

export const updateCart = async ({
  id,
  goodsNum,
  operator,
  storeId,
}: {
  id: string
  goodsNum: number
  operator: string
  storeId: string
}) => {
  try {
    const cart = await ApiRoot.carts().updateCart({
      body: {
        id,
        goodsNum,
        operator,
        storeId,
      },
    })
    console.log(cart)
    return cart
  } catch (e) {
    console.log(e)
    return []
  }
}

// const addCartProduct = async () => {
//   await createCart({
//     customerId: 'test001',
//     storeId: '12345678',
//     goodsId: 'testspuId001',
//     goodsVariantId: 'testskuId002',
//     goodsNum: 1,
//     petId: 'ss',
//     petType: 'test',
//     operator: 'test',
//   })
// }
