import Taro from "@tarojs/taro";
import { FC, useEffect, useState } from "react";
import { View } from "@tarojs/components";

interface Props { }

const NarBar: FC<Props> = ({ children }) => {
  const [paddingTop, setPaddingTop] = useState<any>(0);

  useEffect(() => {
    //将状态栏高度挂载全局，方便自定义页面导航栏
    Taro.getSystemInfo({}).then((res) => {
      console.log(res.statusBarHeight);
      setPaddingTop(res.statusBarHeight);
    });
  }, []);

  return <View className="sticky top-0 left-0 z-50 bg-white" style={{ paddingTop: paddingTop + "px", height: '2.625rem' }}>{children}</View>;
};
export default NarBar;
