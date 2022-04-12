import { ScrollView, View, Text, Image } from "@tarojs/components";
interface ShopProductListProps {
  list: any;
}
const ShopProductList = ({ list }: ShopProductListProps) => {
  return (
    <ScrollView className="whitespace-nowrap bg-gray-300" scrollX>
      <View className="inline-block px-1">
        <View className="flex h-96 flex-col flex-wrap">
          {list.map((item) => (
            <View className="inline-block px-1 h-48 w-28">
              <View className="bg-white rounded-lg">
                <Image src={item.img} className="w-28 h-28" />
                <View
                  className="text-center text-28 pb-1 px-1 whitespace-normal"
                  style="height:3em"
                >
                  {item.name}
                </View>
              </View>
              <View className="text-right">
                <Text className="pr-2 ">{item.price}</Text>
                <Text className="bg-red-600 px-1 text-white text-26">
                  {item.tag}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ShopProductList;
