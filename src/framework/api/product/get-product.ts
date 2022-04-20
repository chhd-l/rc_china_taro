// import { ApiRoot } from "../../fetcher";
import { mockProduct } from '@/framework/mock/product'
import { ProductDetailProps } from '@/framework/types/products'
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
