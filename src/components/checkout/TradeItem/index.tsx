import { View, Text, Image } from "@tarojs/components";
import { LineItem, ProductVariant } from "@/framework/types/cart";
import { useEffect, useState } from "react";
import { formatMoney } from "@/utils/utils";

const ProductItem = ({ product }: { product: LineItem }) => {
  const { name, quantity } = product;
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

  return (
    <View className="flex flex-row justify-between items-center">
      <Image src={image} className="text-sm w-32 h-32" />
      <View className="w-full pl-4">
        <View>{name}</View>
        <View>{specs}</View>
        {tags.map((el) => (
          <View className="text-xs text-gray-400">{el}</View>
        ))}
        <View className="flex flex-row justify-between">
          <Text className="text-red-500">{formatMoney(price)}</Text>
          <Text className="text-xs text-gray-400">x {quantity}</Text>
        </View>
      </View>
    </View>
  );
};

const TradeItem = ({ tradeItems }: { tradeItems: LineItem[] }) => {
  return (
    <View className="">
      {tradeItems.map((item) => (
        <ProductItem product={item} />
      ))}
    </View>
  );
};
export default TradeItem;
