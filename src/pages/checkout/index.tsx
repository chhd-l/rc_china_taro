import { View, Text } from "@tarojs/components";
import { useEffect } from "react";
import "./index.less";

const Checkout = () => {
  useEffect(() => {
    // Taro.getStorage({
    //   key: 'select-product',
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
  }, []);

  return (
    <View className="index">
      <Text>Checkout</Text>
    </View>
  );
};

export default Checkout;
