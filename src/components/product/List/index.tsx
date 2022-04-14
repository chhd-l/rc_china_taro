import { ProductListItemProps } from "@/framework/types/products";
import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.less";
interface ListProps {
  list: ProductListItemProps[];
}
const List = ({ list }: ListProps) => {
  const toDetail = ({ spu }) => {
    Taro.navigateTo({
      url: `/pages/productDetail/index?id=${spu}`,
    });
  };
  console.info("productList", list);
  return (
    <View className="px-1 product-list">
      <View className="at-row at-row--wrap">
        {list.map((product) => (
          <View className="at-col at-col-6">
            <View className=" mx-1 border border-solid border-gray-300 rounded-sm pb-2 mb-2">
              <Image
                style="width:100%"
                lazyLoad
                mode="widthFix"
                src={product.img}
              />
              <View className="text-xs">{product.name}</View>
              <View className="flex justify-between px-1 items-center">
                <View>
                  <View className="origin-price line-through text-gray-400">
                    原价：{product.originalPrice}
                  </View>
                  <View className="font-medium text-red-600">
                    ¥{product.price}
                  </View>
                </View>
                <View
                  onClick={() => {
                    toDetail(product);
                  }}
                  className="buy-button px-2 py-1 bg-white text-red-600 border border-solid border-red-600 rounded-full"
                >
                  立即购买
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
export default List;
