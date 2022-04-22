// import { ApiRoot } from "../../fetcher";
import { mockProduct } from '@/framework/mock/product'
// import { ProductDetailProps } from '@/framework/types/products'
import ApiRoot from '../fetcher'
import { normalizeProductForFe } from '../lib/normalize'

export const getProduct = async () => {
  try {
    // const pets = await ApiRoot.pets().getProduct({ id: "20220415" });
    let list = mockProduct.data.FindGoodsList.records[0]
    const productList = normalizeProductForFe(list)
    console.info('productListproductList', productList)
    return productList
    // return productList.map((pet) => normalizePetsForFe(pet));
  } catch (err) {
    console.log(err, 'err')
  }
}

export const getProductBySkuId = async () => {
  try {
    const res = await ApiRoot.products().getProductBySku({
      goodsVariantId: '2fde6f65-a83a-0760-b9a1-be9411376461',
    })
    console.log('getProductBySkuId view',res)
    return res
  } catch (err) {
    console.log(err, 'err')
  }
}
