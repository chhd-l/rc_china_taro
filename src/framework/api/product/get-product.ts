// import { ApiRoot } from "../../fetcher";
import { mockProduct } from '@/framework/mock/product'
import { products } from '@/framework/mock/products'
import { ProductDetailProps } from '@/framework/types/products'
import ApiRoot from '../fetcher'
import { normalizeProductForFe, normalizeProductsforFe } from '../lib/normalize'

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

export const getProducts = async () => {
  try {
    // const pets = await ApiRoot.pets().getProduct({ id: "20220415" });
    let list = mockProduct.data.FindGoodsList.records[0]
    const productList = normalizeProductsforFe(list)
    console.info('productListproductList', productList)
    return productList
    // return productList.map((pet) => normalizePetsForFe(pet));
  } catch (err) {
    console.log(err, 'err')
  }
}
