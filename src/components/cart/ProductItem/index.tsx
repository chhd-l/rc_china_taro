import { Radio, View, Image } from "@tarojs/components";
import { AtInputNumber, AtSwipeAction } from "taro-ui";
import { LineItem, ProductVariant } from "@/framework/types/cart";
import { useEffect, useState } from "react";
import { formatMoney } from "@/utils/utils";

const ProductItem = ({
  product,
  changeProduct,
}: {
  product: LineItem;
  changeProduct: Function;
}) => {
  const { select, productId, name, quantity } = product;
  const [selectedSkuInfo, setSelectedSkuInfo] = useState<ProductVariant>({
    skuId: "",
    isOnStock: true,
    availableQuantity: 0,
    price: 0,
    image: "",
    isMatchingVariant: true,
    availableForSale: true,
    tags: [],
    specs: "",
  });
  const { image, price, specs, tags } = selectedSkuInfo;

  const getSelectSkuInfo = () => {
    setSelectedSkuInfo(
      product.variant.filter((item) => item.isMatchingVariant)[0]
    );
  };

  useEffect(() => {
    getSelectSkuInfo();
  }, [product]);

  const delCartProduct = () => {
    console.log("333333");
  };

  return (
    <View>
      <AtSwipeAction
        options={[
          {
            text: "删除",
            style: {
              backgroundColor: "#FF4949",
            },
          },
        ]}
        autoClose
        onClick={delCartProduct}
        areaWidth={360}
        maxDistance={40}
      >
        <View className="flex flex-row items-center p-2">
          <Radio
            value="选中"
            checked={select}
            style={{ transform: "scale(0.6)" }}
            color="red"
            className="text-48"
            onClick={() =>
              changeProduct && changeProduct(productId, "select", !select)
            }
          />
          <Image className="w-20 h-20" src={image} />
          <View>
            <View>{name}</View>
            <View className="mt-1">{specs}</View>
            <View className="flex flex-row mt-1 text-xs">
              {tags.map((el) => (
                <View className="border border-solid rounded-md border-red-500 mr-2 px-1">
                  {el}
                </View>
              ))}
            </View>
            <View className="flex flex-row mt-1 justify-between items-center pr-8">
              <View>{formatMoney(price)}</View>
              <View>
                <AtInputNumber
                  min={0}
                  max={10}
                  step={1}
                  value={quantity}
                  onChange={(value) => {
                    changeProduct &&
                      changeProduct(productId, "quantity", value);
                  }}
                  type="number"
                />
              </View>
            </View>
          </View>
        </View>
      </AtSwipeAction>
    </View>
  );
};
export default ProductItem;
