import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { FC, useEffect, useState } from "react";
interface Props {}
const NarBar: FC<Props> = ({ children }) => {
  const [paddingTop, setPaddingTop] = useState<any>(0);

  useEffect(() => {
    //将状态栏高度挂载全局，方便自定义页面导航栏
    Taro.getSystemInfo({}).then((res) => {
      console.log(res.statusBarHeight);
      setPaddingTop(res.statusBarHeight);
    });
  }, []);

  return <View style={{ paddingTop: paddingTop + "px" }}>{children}</View>;
};
export default NarBar;
