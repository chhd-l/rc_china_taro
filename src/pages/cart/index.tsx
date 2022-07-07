import { View } from '@tarojs/components'
import { ProductItem, Empty, TotalSettle } from '@/components/cart'
import { useEffect, useState } from 'react'
import {batchDeleteCart, getCartAndProducts, getCarts, updateCart} from '@/framework/api/cart/cart'
import Taro, { useDidShow } from '@tarojs/taro'
import { session } from '@/utils/global'
import NavBar from '@/components/common/Navbar'
import { AtModal } from 'taro-ui'
import './index.less'

const Cart = () => {
  const [productList, setProductList] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any[]>([])
  const [invalidProducts, setInvalidProducts] = useState<any[]>([])
  const [showDelAllTipModal, setShowDelAllTipModal] = useState(false)
  const [loading, setLoading] = useState(false)

  //获取购物车商品列表
  const getCartProductList = async () => {
    setLoading(true)
    setProductList([])
    setInvalidProducts([])
    // const res = await getCarts(true)
    const res=await getCartAndProducts(true)
    handleIsValidProduct(res)
    setLoading(false)
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
    if (name === 'productNum') {
      res = await updateCart({
        id: id,
        productNum: value,
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

  //清空失效商品
  const clearInvalidProduct = async () => {
    const ids = invalidProducts.map((el) => {
      return el.id
    })
    const res = await batchDeleteCart({
      ids,
    })
    if (res) {
      delCartSuccess && delCartSuccess(ids)
    }
    setShowDelAllTipModal(false)
  }

  useDidShow(() => {
    Taro.setStorageSync('commerce-loading', 1)
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
        <View className="h-2 bg-gray-fb" />
        {loading ? null : productList.length > 0 || invalidProducts.length > 0 ? (
          <View className="mb-8">
            <View className="pb-2 bg-gray-fb">
              {productList.map((item, index) => (
                <View
                  key={index}
                  className={`${
                    index !== productList.length - 1 ||
                    (index === productList.length - 1 && invalidProducts.length == 0)
                      ? 'mb-2'
                      : ''
                  }`}
                >
                  <ProductItem
                    product={item}
                    key={item.id}
                    changeProduct={changeProduct}
                    delCartSuccess={delCartSuccess}
                  />
                </View>
              ))}
            </View>
            {invalidProducts.length > 0 ? (
              <View>
                <View className="flex justify-between py-2 px-4">
                  <View>失效商品{invalidProducts.length}件</View>
                  <View className="text-primary-red" onClick={() => setShowDelAllTipModal(true)}>
                    清空失效商品
                  </View>
                </View>
                <View>
                  {invalidProducts.map((item, index) => (
                    <ProductItem isInvalid product={item} key={index} delCartSuccess={delCartSuccess} />
                  ))}
                </View>
                <View className="h-2 bg-gray-fb" />
              </View>
            ) : null}
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
      <AtModal
        key="delete-all-product-modal"
        isOpened={showDelAllTipModal}
        title="确认"
        cancelText="取消"
        confirmText="确定"
        onClose={() => {
          setShowDelAllTipModal(false)
        }}
        onCancel={() => {
          setShowDelAllTipModal(false)
        }}
        onConfirm={() => clearInvalidProduct()}
        content="确定清空全部失效商品吗？"
        className="error-tips-modal"
      />
    </View>
  )
}

export default Cart
