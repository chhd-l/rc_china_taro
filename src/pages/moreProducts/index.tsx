import { View } from "@tarojs/components";
import List from "@/components/product/List";
import { ProductListItemProps } from "@/framework/types/products";
import { mockList } from "@/mock/product";
import Mock from "mockjs";
import { useRouter } from "@tarojs/taro";
import { FC, useState } from "react";
interface Props {
  title: string;
}
const MoreProduct: FC<Props> = ({}) => {
  const router = useRouter();
  const [productList, setProductList] = useState<ProductListItemProps[]>(
    Mock.mock(mockList).list
  );
  console.info("..", router);
  const title = router?.params.title;
  return (
    <View className="more-product">
      <View className="p-2 text-28 font-semibold">查看更多 — {title}</View>
      <List list={productList} />
    </View>
  );
};

export default MoreProduct;
