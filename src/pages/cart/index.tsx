import { View } from "@tarojs/components";
import { ProductItem, Empty, TotalSettle, Navbar } from "@/components/cart";
import { useEffect, useState } from "react";
import { LineItem } from "@/framework/types/cart";
import Mock from "mockjs";
import { dataSource } from "@/mock/cart";
import "./index.less";

const Cart = () => {
  const [productList, setProductList] = useState<LineItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<LineItem[]>([]);

  const changeProduct = (id, name, value) => {
    setProductList(
      productList.map((item) => {
        if (item.productId === id) {
          item[name] = value;
        }
        return item;
      })
    );
  };

  const changeAllSelect = (isAllSelect) => {
    setProductList(
      productList.map((item) => {
        item.select = isAllSelect;
        return item;
      })
    );
  };

  const getSelectProduct = () => {
    setSelectedProduct(productList.filter((item) => item.select));
  };

  useEffect(() => {
    setProductList(Mock.mock(dataSource));
    console.log(Mock.mock(dataSource));
  }, []);

  useEffect(() => {
    getSelectProduct();
  }, [productList]);

  return (
    <View>
      <Navbar num={productList.length} />
      <View className="index bg-gray-50 py-2">
        {productList.length > 0 ? (
          productList.map((item) => (
            <ProductItem
              product={item}
              key={item.productId}
              changeProduct={changeProduct}
            />
          ))
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
  );
};

export default Cart;
