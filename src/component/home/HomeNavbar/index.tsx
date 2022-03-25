import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { useEffect, useState } from "react";

const HomeNarBar = () => {
  const [paddingTop, setPaddingTop] = useState<any>(0);
  useEffect(() => {
    //将状态栏高度挂载全局，方便自定义页面导航栏
    Taro.getSystemInfo({}).then((res) => {
      console.log(res.statusBarHeight);
      setPaddingTop(res.statusBarHeight);
    });
  });
  return (
    <View style={{ paddingTop: paddingTop + "px" }}>
      <View className='mt-4 mb-10'>自定义导航栏</View>
    </View>
  );
};
export default HomeNarBar;
