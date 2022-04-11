import { View, ScrollView } from "@tarojs/components";
import "./index.less";
import Mock from "mockjs";
import { useState } from "react";
import ActivityList from "@/components/product/ActivityList";
import { FloorType, SwiperProps } from "@/framework/types/products";
import StarsList from "@/components/product/StarsList";
import DryOrWetList from "@/components/product/DryOrWetList";
import {
  mockBanner,
  mockProduct,
  mockStar,
  mockTabOptions,
} from "@/mock/product";
import { floorList } from "@/lib/product";
import FloorNav from "@/components/product/FloorNav";
import ListBanner from "@/components/product/ListBanner";

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
  const [floorId, setFloorId] = useState<string>("");

  const queryList = (params) => {
    console.info("params", params);
    setProductList(productList);
    //getlist
  };

  return (
    <View className="product-list">
      <ScrollView
        style="height:100vh"
        className="scrollview"
        scrollIntoView={floorId}
        scrollY
        scrollWithAnimation
      >
        <ListBanner bannerList={bannerList} />
        <FloorNav setFloorId={setFloorId} />
        <View>
          {floorList.map((floor) => (
            <View>
              <View id={floor.id}></View>
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
                {floor.type == FloorType.Stars && (
                  <StarsList list={starsList} />
                )}
                {(floor.type == FloorType.Dry || FloorType.Wet) && (
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
      </ScrollView>
    </View>
  );
};

export default ProductList;
