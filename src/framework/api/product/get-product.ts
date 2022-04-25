// import { ApiRoot } from "../../fetcher";
import { mockProduct } from '@/framework/mock/product'
import { products } from '@/framework/mock/products'
import { ProductDetailProps } from '@/framework/types/products'
// import { ProductDetailProps } from '@/framework/types/products'
import ApiRoot from '../fetcher'
import { normalizeProductForFe, normalizeProductsforFe } from '../lib/normalize'

export const getProduct = async ({ storeId, goodsId }) => {
  try {
    const { productBySpuId: data } = await ApiRoot.products().getProductBySpu({
      storeId,
      goodsId,
      // goodsId: '44c5f184-9146-187f-f738-67db27bf0468',
      // storeId: '12345678',
    })
    // console.info('listlistlistlist......', data)
    // let data = mockProduct.data.FindGoodsList.records[0]
    const detail = normalizeProductForFe(data)
    console.info('productListproductList', detail)
    return detail
    // return detail.map((pet) => normalizeProductForFe(pet))
  } catch (err) {
    console.log(err, 'err')
  }
}

export const getProducts = async (params: any) => {
  // let list = mockProduct.data.FindGoodsList.records[0]
  try {
    const { products: list } = await ApiRoot.products().getAllProducts(params)
    console.info('test', list)
    // const pets = await ApiRoot.pets().getProduct({ id: "20220415" });
    const productList = normalizeProductsforFe(list)
    console.info('productList', productList)
    return productList
  } catch (err) {
    console.info('err', err)
    // debuggerdebugger
    return []
  }
}
export const getProductBySkuId = async ({ goodsVariantId }: { goodsVariantId: string }) => {
  try {
    const res = await ApiRoot.products().getProductBySku({
      goodsVariantId,
    })
    console.log('getProductBySkuId view', res)
    return res
  } catch (err) {
    console.log(err, 'err')
  }
}
export const getAttrs = async ({ storeId, categoryId }: { storeId: string; categoryId: string }) => {
  try {
    const res = await ApiRoot.products().getAttrs({
      storeId,
      categoryId,
    })
    console.log('getProductBySkuId view', res)
    return res
  } catch (err) {
    console.log(err, 'err')
  }
}
