import { View } from '@tarojs/components'
import { ProductItem, Empty, TotalSettle } from '@/components/cart'
import { useEffect, useState } from 'react'
import { getCartAndProducts, updateCart } from '@/framework/api/cart/cart'
import { useDidShow } from '@tarojs/taro'
import { session } from '@/utils/global'
import InvalidProductList from '@/components/cart/InvalidProductList'
import NavBar from '@/components/common/Navbar'
import './index.less'

const Cart = () => {
  const [productList, setProductList] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any[]>([])
  const [invalidProducts, setInvalidProducts] = useState<any[]>([])

  //获取购物车商品列表
  const getCartProductList = async () => {
    setProductList([])
    setInvalidProducts([])
    const res = await getCartAndProducts(true)
    handleIsValidProduct(res)
  }

  //过滤出失效商品（整个spu已删除、已下架、不可售,单个sku已删除、已下架、无库存）
  const handleIsValidProduct = (res) => {
    let validProductList: any[] = []
    let invalidProductList: any[] = []
    res.map((el) => {
      if (
        el?.skuGoodInfo?.isDeleted ||
        !el?.skuGoodInfo?.shelvesStatus ||
        !el?.skuGoodInfo?.salesStatus ||
        el?.localData?.stock === 0 ||
        !el?.localData?.shelvesStatus ||
        el?.localData?.isDeleted
      ) {
        invalidProductList.push(el)
      } else {
        validProductList.push(el)
      }
    })
    setInvalidProducts(invalidProductList)
    setProductList(validProductList)
  }

  //勾选商品或者更改商品购买数量
  const changeProduct = async (id, name, value) => {
    let res = true
    if (name === 'goodsNum') {
      res = await updateCart({
        id: id,
        goodsNum: value,
        operator: 'test',
      })
      if (res) {
        session.set(
          'cart-data',
          productList.map((item) => {
            if (item.id === id) {
              item[name] = value
            }
            return item
          }),
        )
      }
    }
    if (res) {
      setProductList(
        productList.map((item) => {
          if (item.id === id) {
            item[name] = value
          }
          return item
        }),
      )
    }
  }

  //全选按钮点击事件
  const changeAllSelect = (isAllSelect) => {
    setProductList(
      productList.map((item) => {
        item.select = isAllSelect
        return item
      }),
    )
  }

  //实时获取当前选择的商品
  const getSelectProduct = () => {
    setSelectedProduct(productList.filter((item) => item.select))
  }

  //删除商品成功处理本地购物车数据
  const delCartSuccess = (ids) => {
    const tempProductList = productList.concat(invalidProducts)
    ids.map((item) => {
      const delIndex = tempProductList.findIndex((data) => data.id === item)
      tempProductList.splice(delIndex, 1)
    })
    session.set('cart-data', tempProductList)
    handleIsValidProduct(tempProductList)
  }

  useDidShow(() => {
    getCartProductList()
  })

  useEffect(() => {
    getSelectProduct()
  }, [productList])

  return (
    <View>
      <NavBar
        navbarTitle={`购物车${
          productList.length + invalidProducts.length > 0 ? `(${productList.length + invalidProducts.length})` : ''
        }`}
      />
      <View className="index cart-content">
        <View className="h-2" style={{ backgroundColor: '#fbfbfb' }} />
        {productList.length > 0 || invalidProducts.length > 0 ? (
          <View className="mb-8">
            <View className="pb-2" style={{ backgroundColor: '#fbfbfb' }}>
              {productList.map((item, index) => (
                <View key={index} className={`${index !== productList.length - 1 ? 'mb-2' : ''}`}>
                  <ProductItem
                    product={item}
                    key={item.id}
                    changeProduct={changeProduct}
                    delCartSuccess={delCartSuccess}
                  />
                </View>
              ))}
            </View>
            <InvalidProductList productList={invalidProducts} delCartSuccess={delCartSuccess} />
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
