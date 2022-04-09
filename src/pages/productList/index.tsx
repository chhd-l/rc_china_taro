import {
  View,
  Text,
  Image,
  Swiper,
  SwiperItem,
  ScrollView,
} from "@tarojs/components";
import "./index.less";
import Mock from "mockjs";
import { useState } from "react";
import ActivityList from "@/components/product/ActivityList";
import {
  FloorListProps,
  FloorType,
  SwiperProps,
} from "@/framework/types/products";
import StarsList from "@/components/product/StarsList";
import DryOrWetList from "@/components/product/DryOrWetList";
// import {
//   mockBanner,
//   mockProduct,
//   mockStar,
//   mockTabOptions,
// } from "@/mock/product";
// 提出去白屏不报错，暂未想到解决方案
export const mockBanner = {
  "list|4": [
    {
      url: Mock.Random.name(),
      // img: "../assets/icons/icon-cart.png",
      img: Mock.Random.image("200x200"),
    },
  ],
};

export const mockTabOptions = {
  "list|4": [
    {
      subLabel: Mock.Random.name(),
      label: Mock.Random.cname(),
      value: Mock.Random.guid(),
      // icon: "../assets/icons/icon-cart.png",
      // headerImg: "../assets/icons/icon-cart.png",
      icon: Mock.Random.image("100x100"),
      headerImg: Mock.Random.image("200x100"),
      seeMoreUrl: Mock.Random.url(),
      "children|3": [
        {
          subLabel: Mock.Random.name(),
          label: Mock.Random.cname(),
          value: Mock.Random.guid(),
          icon: Mock.Random.image("100x100"),
          headerImg: Mock.Random.image("200x100"),
          seeMoreUrl: Mock.Random.url(),
          // icon: "../assets/icons/icon-cart.png",
          // headerImg: "../assets/icons/icon-cart.png",
        },
      ],
    },
  ],
};

export const mockStar = {
  "list|4": [
    {
      url: Mock.Random.name(),
      name: Mock.Random.name(),
      price: Mock.Random.county(),
      // img: "../assets/icons/icon-cart.png",
      img: Mock.Random.image("200x200"),
      video:
        "https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
    },
  ],
};

export const mockProduct = {
  "list|7": [
    {
      // img: "../assets/icons/icon-cart.png",
      img: Mock.Random.image("200x200"),
      name: Mock.Random.name(),
      price: Mock.Random.integer(0, 10),
      tag: Mock.Random.name(),
    },
  ],
};

const floorList: FloorListProps[] = [
  {
    title: "活动专区",
    label: "活动专区",
    subTitle: "订阅商城  社群福利",
    icon: "",
    type: FloorType.Activity,
    active: true,
  },
  {
    title: "明星猫粮",
    label: "明星猫粮",
    subTitle: "省薪囤货  爆款猫粮",
    icon: "",
    type: FloorType.Stars,
    active: false,
  },
  {
    title: "全价猫干粮",
    label: "猫干粮",
    subTitle: "让不同年龄、品种、健康问题的猫咪定制专属营养",
    icon: "",
    type: FloorType.Dry,
    active: false,
  },
  {
    title: "全价主食级猫湿粮",
    label: "猫湿粮",
    subTitle: "宠爱升级，享受肉食乐趣同时满足每日所需营养",
    icon: "",
    type: FloorType.Wet,
    active: false,
  },
  {
    title: "明星犬粮",
    label: "活动专区",
    subTitle: "省薪囤货  爆款犬粮",
    icon: "",
    type: FloorType.Stars,
    active: false,
  },
  {
    title: "犬干粮",
    label: "活动专区",
    subTitle: "让不同年龄、品种、健康问题的狗狗都有自己的精准营养",
    icon: "",
    type: FloorType.Dry,
    active: false,
  },
  {
    title: "犬湿粮",
    label: "活动专区",
    subTitle: "宠爱升级，享受肉食乐趣同时满足每日所需营养",
    icon: "",
    type: FloorType.Wet,
    active: false,
  },
];
const bannerLists = Mock.mock(mockBanner).list;
const starsLists = Mock.mock(mockStar).list;
const productLists = Mock.mock(mockProduct).list;
const lifestageLists = Mock.mock(mockTabOptions).list;
console.info("bannerList", lifestageLists);
const ProductList = () => {
  const [bannerList, setBannerList] = useState<SwiperProps[]>(bannerLists);
  const [activityList, setActivityList] = useState<SwiperProps[]>(bannerLists);
  const [starsList, setStarsList] = useState<SwiperProps[]>(starsLists);
  const [productList, setProductList] = useState(productLists);
  const [lifestageList, setLifestageList] = useState(lifestageLists);
  const queryList = (params) => {
    console.info("params", params);
    setProductList(productList);
    //getlist
  };
  // const [breedList, setbreedList] = useState(breedLists);
  return (
    <View className="product-list">
      <Swiper
        indicatorColor="#999"
        indicatorActiveColor="#333"
        circular
        indicatorDots
        autoplay
      >
        {bannerLists.map((banner) => (
          <SwiperItem>
            {banner.img ? (
              <Image
                src={banner.img}
                lazyLoad
                mode="widthFix"
                style="width:100%"
              />
            ) : null}
          </SwiperItem>
        ))}
      </Swiper>
      <ScrollView className="whitespace-nowrap" scrollX>
        <View className="bg-red-600 text-white text-xs">
          {floorList.map((floor) => (
            <Text
              className={`inline-block p-2 ${
                floor.active ? "bg-white font-medium text-red-600" : ""
              }`}
            >
              {floor.label}
            </Text>
          ))}
        </View>
      </ScrollView>
      <View>
        {floorList.map((floor) => (
          <View>
            <View className="p-2">
              <View className="text-red-600 font-medium py-1">
                {floor.title}
              </View>
              <View className="text-26  text-gray-400">{floor.subTitle}</View>
            </View>
            <View>
              {floor.type == FloorType.Activity && (
                <ActivityList list={activityList} />
              )}
              {floor.type == FloorType.Stars && <StarsList list={starsList} />}
              {floor.type == FloorType.Dry && (
                <DryOrWetList
                  list={productList}
                  queryList={queryList}
                  lifestageList={lifestageList}
                  setLifestageList={setLifestageList}
                />
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ProductList;
