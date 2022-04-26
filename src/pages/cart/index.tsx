import { View } from '@tarojs/components'
import { ProductItem, Empty, TotalSettle, Navbar } from '@/components/cart'
import { useEffect, useState } from 'react'
import { getCarts, updateCart } from '@/framework/api/cart/cart'
import { useTabItemTap, useDidShow } from '@tarojs/taro'
import {getOrderSetting} from "@/framework/api/order/order";
import './index.less'

const Cart = () => {
  const [productList, setProductList] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any[]>([])

  const getCartProductList = async () => {
    const res = await getCarts()
    setProductList(res)
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

  const getOrderSettings=async()=>{
    const res=await getOrderSetting();
    console.log('orderSetting',res)
  }

  useDidShow(() => {
    getCartProductList()
    getOrderSettings()
  })

  useTabItemTap(() => {
    getCartProductList()
  })

  useEffect(() => {
    getSelectProduct()
  }, [productList])

  return (
    <View>
      <Navbar num={productList.length} />
      <View className="index cart-content">
        <View className="h-2" style={{ backgroundColor: '#fbfbfb' }} />
        {productList.length > 0 ? (
          <View className="pb-2" style={{ backgroundColor: '#fbfbfb' }}>
            {productList.map((item, index) => (
              <View className={`${index !== productList.length - 1 ? 'mb-2' : ''}`}>
                <ProductItem
                  product={item}
                  key={item.id}
                  changeProduct={changeProduct}
                  delCartSuccess={() => getCartProductList()}
                />
              </View>
            ))}
          </View>
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
