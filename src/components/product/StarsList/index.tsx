import { View, Image, ScrollView, Video } from "@tarojs/components";
interface StarsListProps {
  list: any;
}
const StarsList = ({ list }: StarsListProps) => {
  return (
    <ScrollView className="whitespace-nowrap" scrollX>
      {list.map((product) => (
        <View className="inline-block  px-2 bg-gray-300" style="width:88%">
          <Video
            id="video"
            className="w-full"
            src={product.video}
            poster="https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg"
            //   initialTime='0'
            controls={true}
            autoplay={false}
            loop={false}
            muted={false}
          />
          <View className="flex items-center rounded-b-lg bg-white p-2">
            <Image
              style="width:100%"
              lazyLoad
              mode="widthFix"
              src={product.img}
            />
            <View className="pl-2">
              <View>{product.name}</View>
              <View className="text-16px pb-2">室内成猫全粮价2kg/袋</View>
              <View className="text-xs">高易消化蛋白</View>
              <View className="text-xs">减少粪便量和异味</View>
              <View className="text-center pt-1 text-red-600">
                ¥{product.price}
              </View>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default StarsList;
