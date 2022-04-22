import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import EmptyCart from "@/assets/img/empty-cart-img.png";
import { AtButton } from "taro-ui";
import "./index.less";

const Empty = () => {
  return (
    <View className="bg-white flex flex-col items-center pt-4 h-full">
      <Image className="w-32 h-32" src={EmptyCart} />
      <View className="mt-2 text-base font-bold">购物车有点空</View>
      <View className="my-2 text-xs text-gray-400">赶紧犒劳一下爱宠吧</View>
      <AtButton
        className="my-button w-24 h-24"
        onClick={() => {
          Taro.switchTab({
            url: '/pages/productList/index'
          })
        }}
        customStyle={{height:'40px'}}
      >
        去逛逛
      </AtButton>
    </View>
  );
};
export default Empty;
