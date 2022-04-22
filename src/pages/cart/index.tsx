import { View } from '@tarojs/components'
import { ProductItem, Empty, TotalSettle, Navbar } from '@/components/cart'
import { useEffect, useState } from 'react'
import { getCarts, updateCart } from '@/framework/api/cart/cart'
import './index.less'

const Cart = () => {
  const [productList, setProductList] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const getCartProductList = async () => {
    setLoading(true)
    const res = await getCarts()
    setProductList(res)
    setLoading(false)
  }

  const changeProduct = async (id, name, value) => {
    if (name === 'goodsNum') {
      await updateCart({
        id: id,
        goodsNum: value,
        operator: 'test',
      })
    }
    setProductList(
      productList.map((item) => {
        if (item.id === id) {
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
          productList.map((item) => <ProductItem product={item} key={item.id} changeProduct={changeProduct} />)
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
