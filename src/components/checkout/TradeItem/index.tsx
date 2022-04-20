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
      <Image src={image} className="w-32 h-32" />
      <View className="w-full pl-2">
        <View className="font-semibold text-32 text-black">{name}</View>
        <View className="font-semibold text-32 text-black mt-1">{specs}</View>
        {tags.map((el) => (
          <View className="text-24 text-gray-400 mt-1">{el}</View>
        ))}
        <View className="flex flex-row justify-between pr-4 mt-1">
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
