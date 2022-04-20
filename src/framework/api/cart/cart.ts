import ApiRoot from '../fetcher'

export const getCarts = async ({ customerId, storeId }: { customerId: string; storeId: string }) => {
  try {
    const res = await ApiRoot.carts().getCarts({ customerId, storeId })
    console.log('getCarts', res.carts)
    return res.carts
  } catch (err) {
    console.log(err)
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
