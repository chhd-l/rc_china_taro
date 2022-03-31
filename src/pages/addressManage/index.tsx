import Taro from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { AddressItem } from "@/components/customer";
import "./index.less";

const Index = () => {
  const getWechatAddress = () => {
    Taro.chooseAddress({
      success: function (res) {
        console.log(res);
      },
    });
  };

  return (
    <View className="index bg-gray-200 p-2 h-screen">
      <AddressItem />
      <View className="m-0 flex flex-row justify-end mt-2">
        <Button
          className="text-xs m-0 h-6 bg-white mr-2 flex items-center text-gray-400"
          onClick={() => {
            Taro.navigateTo({
              url: "/pages/newAddress/index",
            });
          }}
        >
          +新增地址
        </Button>
        <Button
          className="text-xs m-0 bg-white flex items-center text-gray-400"
          onClick={() => getWechatAddress()}
        >
          +获取微信收货地址
        </Button>
      </View>
    </View>
  );
};

export default Index;
