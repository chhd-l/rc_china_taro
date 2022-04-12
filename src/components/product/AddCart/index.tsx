import { View } from "@tarojs/components";
import { AtBadge, AtIcon } from "taro-ui";
interface handleShowSpec {
  handleShowSpec: () => void;
}
const AddCart = ({ handleShowSpec }: handleShowSpec) => {
  return (
    <View className="fixed bottom-0 left-0 right-0" style="z-index:1000">
      <View className="text-30 flex h-12">
        <View className="flex flex-col justify-center items-center text-26 px-4">
          <AtBadge value={10} maxValue={99}>
            <AtIcon value="shopping-cart" size="22" color="#F00"></AtIcon>
          </AtBadge>
          购物车
        </View>
        <View
          onClick={handleShowSpec}
          className="flex justify-center items-center flex-1"
        >
          加入购物车
        </View>
        <View
          onClick={handleShowSpec}
          className="flex justify-center items-center bg-red-600 text-white flex-1"
        >
          立即购买
        </View>
      </View>
    </View>
  );
};
export default AddCart;
