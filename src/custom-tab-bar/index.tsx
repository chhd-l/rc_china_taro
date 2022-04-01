import { CoverView, CoverImage } from "@tarojs/components";
import { useState } from "react";
import Taro from "@tarojs/taro";

const color = "#bfbfbf";
const selectedColor = "#d81e06";

const CustomTabBar = () => {
  const list = [
    {
      pagePath: "pages/index/index",
      text: "首页",
      iconPath: "../assets/icons/icon-home.png",
      selectedIconPath: "../assets/icons/icon-home-selected.png",
    },
    {
      pagePath: "pages/productList/index",
      text: "商城",
      iconPath: "../assets/icons/icon-mall.png",
      selectedIconPath: "../assets/icons/icon-mall-selected.png",
    },
    {
      pagePath: "pages/subscription/index",
      text: "订阅",
      iconPath: "../assets/icons/icon-subscription.png",
      selectedIconPath: "../assets/icons/icon-subscription-selected.png",
    },
    {
      pagePath: "pages/cart/index",
      text: "购物车",
      iconPath: "../assets/icons/icon-cart.png",
      selectedIconPath: "../assets/icons/icon-cart-selected.png",
    },
    {
      pagePath: "pages/account/index",
      text: "我的",
      iconPath: "../assets/icons/icon-account.png",
      selectedIconPath: "../assets/icons/icon-account-selected.png",
    },
  ];
  const [selected, setSelected] = useState(0);
  const switchTab = (index: any) => {
    setSelected(index);
    Taro.switchTab({ url: list[index].pagePath });
  };
  return (
    <CoverView style={{display:'flex',justifyContent:'space-around'}}>
      {list.map((item, index) => (
        <CoverView
          key={index}
          data-path={item?.pagePath}
          data-index={index}
          onClick={() => switchTab(index)}
        >
          <CoverImage
            src={selected === index ? item.selectedIconPath : item.iconPath}
            style={{width:'20px',height:'20px'}}
          />
          <CoverView
            style={{ color: selected === index ? selectedColor : color }}
          >
            {item.text}
          </CoverView>
        </CoverView>
      ))}
    </CoverView>
  );
};

export default CustomTabBar;
