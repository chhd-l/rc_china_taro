import { ProductDetailProps, SkuItemProps } from "@/framework/types/products";
import { View, Image, Text } from "@tarojs/components";
import { AtFloatLayout, AtInputNumber } from "taro-ui";
import cloneDeep from "lodash.cloneDeep";
interface ChooseSpecProps {
  choosedSku: SkuItemProps | ProductDetailProps;
  detailInfo: ProductDetailProps;
  buyCount: number;
  handleShowSpec: () => void;
  showSpecs: boolean;
  setShowSpecs: (show: boolean) => void;
  setDetailInfo: (info: ProductDetailProps) => void;
  setBuyCount: (buycount: number) => void;
}
const ChooseSpec = ({
  choosedSku,
  showSpecs,
  detailInfo,
  setShowSpecs,
  setBuyCount,
  buyCount,
  setDetailInfo,
}: ChooseSpecProps) => {
  const handleChangeSku = (detail: SkuItemProps) => {
    let newDetailInfo = cloneDeep(detailInfo);
    newDetailInfo.skus.forEach((item) => {
      if (item.id === detail.id) {
        item.defaultChoose = true;
      } else {
        item.defaultChoose = false;
      }
    });
    setDetailInfo(newDetailInfo);
  };
  return (
    <AtFloatLayout
      isOpened={showSpecs}
      onClose={() => {
        setShowSpecs(false);
      }}
    >
      <View className="px-2">
        <View className="flex">
          <Image
            className="w-24 h-auto"
            mode="widthFix"
            src={choosedSku.img?.[0] || ""}
          />
          <View className="pl-1">
            <View>{choosedSku.name}</View>
            <View className="pt-1 text-gray-400 text-26">{choosedSku.no}</View>
            <View className="pt-3">
              <Text className="text-red-600 pr-4">{choosedSku.price}</Text>
              <Text className="text-gray-300  text-26 line-through">
                {choosedSku.originalPrice}
              </Text>
            </View>
          </View>
        </View>
        <View className="text-28">规格</View>
        <View className="py-1">
          {detailInfo.skus.map((detail) => (
            <Text
              onClick={() => {
                handleChangeSku(detail);
              }}
              className={`mr-2 inline-block w-15 text-center text-26  border border-solid  rounded-full ${
                detail.id == choosedSku.id
                  ? "text-red-600 border-red-600"
                  : "text-gray-400 border-gray-400"
              }`}
            >
              {detail.specs}
            </Text>
          ))}
        </View>
        <View className="flex py-1 items-center justify-between">
          <View>数量</View>
          <View>
            {" "}
            <AtInputNumber
              min={1}
              max={99}
              step={1}
              type="number"
              value={buyCount}
              onChange={(value) => {
                setBuyCount(value);
              }}
            />
          </View>
        </View>
      </View>
    </AtFloatLayout>
  );
};

export default ChooseSpec;
