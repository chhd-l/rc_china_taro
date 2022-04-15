import { OptionsProps } from "@/framework/types/common";
import cloneDeep from "lodash.cloneDeep";
import { ScrollView, View, Image, Text } from "@tarojs/components";
import { useEffect, useState } from "react";
import ShopProductList from "../ShopProductList";
import { AtButton } from "taro-ui";
import Taro from "@tarojs/taro";
interface TabOptionsProps extends OptionsProps {
  icon: string;
  active: boolean | undefined;
  subLabel: string;
  children?: TabOptionsProps[];
  headerImg?: string;
  seeMoreUrl?: string;
}
interface DryListProps {
  list: any;
  lifestageList: TabOptionsProps[];
  queryList: (params: any) => void;
  setLifestageList: (lifestageList: TabOptionsProps[]) => void;
}
const DryOrWetList = ({
  list,
  lifestageList,
  queryList,
  setLifestageList,
}: DryListProps) => {
  console.info("lifestageList", lifestageList);
  const [breedList, setBreedList] = useState<TabOptionsProps[]>(
    lifestageList[0].children || []
  );
  const [seeMoreUrl, setseeMoreUrl] = useState<string>("");
  const [headerImg, setHeaderImg] = useState<string>("");
  useEffect(() => {
    let newItem = { headerImg: "", seeMoreUrl: "" } as TabOptionsProps;
    if (breedList?.length) {
      newItem = breedList.find((breed) => breed.active) || breedList[0];
    } else {
      newItem =
        lifestageList.find((lifestage) => lifestage.active) || lifestageList[0];
    }
    setHeaderImg(newItem.headerImg || "");
    setseeMoreUrl(newItem.seeMoreUrl || "");
  }, [lifestageList, breedList]);
  const handleChangeLifestage = (lifestage) => {
    let params: any = {};
    lifestageList.forEach((item) => {
      if (item.value === lifestage.value) {
        item.active = !item.active;
        params.lifestage = lifestage.value;
        // 更换lifestage的时候切换breed并重置到第一个默认active
        if (item.children) {
          item.children.forEach((breed) => {
            breed.active = false;
          });
          item.children[0].active = true;
          params.breed = item.children[0].value;
          setBreedList(item.children);
        }
      }
    });

    queryList(params);
    setLifestageList(cloneDeep(lifestageList));
  };
  const handleSeeMore = () => {
    Taro.navigateTo({
      url: seeMoreUrl,
    });
  };
  return (
    <View>
      {lifestageList ? (
        <ScrollView className="whitespace-nowrap pb-2" scrollX>
          {lifestageList.map((lifestage) => (
            <View
              className="px-1 inline-block text-center"
              onClick={() => {
                handleChangeLifestage(lifestage);
              }}
            >
              <View
                className={` inline-block w-12 h-12 rounded-full border-10 border-solid ${
                  lifestage.active ? "border-red-600" : "border-transparent"
                }`}
              >
                <Image
                  className={`box-border w-12 h-12 rounded-full border-1 border-solid  ${
                    lifestage.active ? "border-transparent" : "border-gary-300"
                  }`}
                  src={lifestage.icon}
                />
              </View>
              <View className="text-24">{lifestage.label}</View>
            </View>
          ))}
        </ScrollView>
      ) : null}
      {breedList ? (
        <ScrollView className="whitespace-nowrap" scrollX>
          {breedList.map((breed) => (
            <View
              className="inline-block text-center px-1"
              onClick={() => {
                handleChangeLifestage(breed);
              }}
            >
              <View>
                <Image
                  className={`box-border w-4 h-4  border-1 border-solid  ${
                    breed.active ? "border-transparent" : "border-gary-300"
                  }`}
                  src={breed.icon}
                />
                <Text className="text-26">{breed.label}</Text>
              </View>

              <View className="text-26">{breed.subLabel}</View>
            </View>
          ))}
        </ScrollView>
      ) : null}
      <Image src={headerImg} />
      <ShopProductList list={list} />
      <View className="p-2">
        <AtButton size="small" type="primary" circle onClick={handleSeeMore}>
          查看更多
        </AtButton>
      </View>
    </View>
  );
};
export default DryOrWetList;
