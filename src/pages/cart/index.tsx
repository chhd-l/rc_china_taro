import { View } from '@tarojs/components'
import { ProductItem, Empty, TotalSettle, Navbar } from '@/components/cart'
import { useEffect, useState } from 'react'
// import { LineItem } from '@/framework/types/cart'
import Mock from 'mockjs'
import { dataSource } from '@/mock/cart'
import { getCarts, updateCart } from '@/framework/api/cart/cart'
import './index.less'

const Cart = () => {
  const [productList, setProductList] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const getCartProductList = async () => {
    setLoading(true)
    const res = await getCarts({ customerId: 'test001', storeId: '12345678' })
    setProductList(res)
    setLoading(false)
  }

  const updateCartProduct = async () => {
    await updateCart({
      id: 'cad331c1-4211-a6a3-3f24-05d8ad2d743d',
      storeId: '12345678',
      goodsNum: 4,
      operator: 'test',
    })
  }

  const changeProduct = async (id, name, value) => {
    if (name === 'quantity') {
      await updateCartProduct()
    }
    setProductList(
      productList.map((item) => {
        if (item.productId === id) {
          item[name] = value
        }
        return item
      }),
    )
  }

  const changeAllSelect = (isAllSelect) => {
    setProductList(
      productList.map((item) => {
        item.select = isAllSelect
        return item
      }),
    )
  }

  const getSelectProduct = () => {
    setSelectedProduct(productList.filter((item) => item.select))
  }

  useEffect(() => {
    setProductList(Mock.mock(dataSource))
    console.log(Mock.mock(dataSource))
    getCartProductList()
  }, [])

  useEffect(() => {
    getSelectProduct()
  }, [productList])

  return (
    <View>
      <Navbar num={productList.length} />
      <View className="index bg-gray-50 py-2 h-screen">
        {!loading && productList.length > 0 ? (
          productList.map((item) => <ProductItem product={item} key={item.productId} changeProduct={changeProduct} />)
        ) : (
          <Empty />
        )}
        <View className="fixed bottom-0 w-full">
          <TotalSettle
            isAllSelect={productList.every((item) => item.select)}
            changeAllSelect={changeAllSelect}
            selectedProduct={selectedProduct}
          />
        </View>
      </View>
    </View>
  )
}

export default Cart
