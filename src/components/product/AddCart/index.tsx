import { addToTypeEnum } from "@/framework/types/common";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtBadge, AtIcon } from "taro-ui";
interface Props {
  handleShowSpec: (type: addToTypeEnum) => void;
}
const AddCart = ({ handleShowSpec }: Props) => {
  return (
    <View className="fixed bottom-0 left-0 right-0 z-10">
      <View className="text-30 flex h-12">
        <View
          className="flex flex-col justify-center items-center text-26 px-4"
          onClick={() => {
            Taro.navigateTo({
              url: "/pages/cart/index",
            });
          }}
        >
          <AtBadge value={10} maxValue={99}>
            <AtIcon value="shopping-cart" size="22" color="#F00"></AtIcon>
          </AtBadge>
          购物车
        </View>
        <View
          onClick={() => {
            handleShowSpec(addToTypeEnum.Cart);
          }}
          className="flex justify-center items-center flex-1"
        >
          加入购物车
        </View>
        <View
          onClick={() => {
            handleShowSpec(addToTypeEnum.Checkout);
          }}
          className="flex justify-center items-center bg-red-600 text-white flex-1"
        >
          立即购买
        </View>
      </View>
    </View>
  );
};
export default AddCart;
