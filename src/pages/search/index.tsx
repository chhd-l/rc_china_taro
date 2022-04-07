import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtButton, AtSearchBar, AtIcon } from "taro-ui";
import Mock from "mockjs";
import "./index.less";
import {
  FilterListItemProps,
  OptionProps,
  PetType,
  ProductListItemProps,
} from "@/framework/types/products";
import { useEffect, useState } from "react";
import { AtFloatLayout } from "taro-ui";
import SearchFilters from "@/components/product/SearchFilters";
import List from "@/components/product/List";
import { mockList, mocksearchPrams } from "@/mock/product";
interface SearchProps {
  keywords: string;
  type: PetType;
  specialarea: string;
  age: string;
  productFunction: string;
  breed: string;
}

const filterListArr = [
  { key: "specialarea", label: "专区", list: Mock.mock(mocksearchPrams).list },
  { key: "age", label: "年龄", list: Mock.mock(mocksearchPrams).list },
  {
    key: "productFunction",
    label: "功能",
    list: Mock.mock(mocksearchPrams).list,
  },
  { key: "breed", label: "品种", list: Mock.mock(mocksearchPrams).list },
];
const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [hotSearchList, setHotSearchList] = useState<OptionProps[]>([]);
  const [lastSearchList, setLastSearchList] = useState<OptionProps[]>([]);
  const [openSearchMore, setOpenSearchMore] = useState<boolean>(false);
  const [filterList, setFilterList] =
    useState<FilterListItemProps[]>(filterListArr);
  const [productList, setProductList] = useState<ProductListItemProps[]>(
    Mock.mock(mockList).list
  );
  useEffect(() => {
    getHotList();
    getLastList();
  }, []);
  const getHotList = () => {
    let hotList = Mock.mock(mocksearchPrams).list;
    console.info("mocksearchPrams", hotList);
    setHotSearchList(hotList);
  };
  const getLastList = async () => {
    let lastList = await getStorageLast();
    setLastSearchList(lastList);
  };
  const getStorageLast = async () => {
    let list = [];
    try {
      var value = await Taro.getStorageSync("lastSearchList");
      if (value) {
        list = value;
      }
    } catch (e) {
      list = [];
    }
    return list;
  };
  const handleSearch = async () => {
    await handleLastSearch(keyword);
    // to do search
  };
  const changeSearchHot = () => {
    getHotList();
  };
  const deleteLast = () => {
    console.info("....");
    Taro.setStorage({
      key: "lastSearchList",
      data: [],
    });
  };
  const handleLastSearch = async (value) => {
    let newLastSearchList: OptionProps[] = await getStorageLast();
    newLastSearchList.forEach((el, i) => {
      if (el.label === value) {
        newLastSearchList.splice(i, 1);
      }
    });
    newLastSearchList.unshift({
      label: value,
      value: value,
    });
    setLastSearchList(newLastSearchList);
    Taro.setStorage({
      key: "lastSearchList",
      data: newLastSearchList,
    });
    setKeyword(value);
    console.info("seach", value);
  };

  return (
    <View className="search">
      <View className=" p-2">
        <AtSearchBar
          showActionButton
          focus
          value={keyword}
          onChange={(value) => {
            setKeyword(value);
          }}
          onActionClick={handleSearch}
        />
        {lastSearchList.length > 0 ? (
          <View className="pb-2 overflow-hidden">
            <View className="flex justify-between pb-2">
              <View className="text-xs font-semibold ">最近搜索</View>
              <View>
                <AtIcon
                  onClick={deleteLast}
                  value="trash"
                  size="16"
                  color="rgb(107, 114, 128)"
                ></AtIcon>
              </View>
            </View>
            <View>
              {lastSearchList.map((item) => (
                <AtButton
                  className="float-left  px-3 text-gray-400 border border-gary-400 border-solid rounded-sm mr-1 mb-2"
                  size="small"
                  onClick={() => {
                    handleLastSearch(item.label);
                  }}
                >
                  {item.label}
                </AtButton>
              ))}
            </View>
          </View>
        ) : null}

        <View className="pb-2  overflow-hidden">
          <View className=" pb-2 flex justify-between">
            <View className="text-xs font-semibold ">热门搜索</View>
            <View className="text-xs" onClick={changeSearchHot}>
              换一批
            </View>
          </View>
          <View>
            {hotSearchList.map((item) => (
              <AtButton
                className="float-left  px-3 text-gray-400 border border-gary-400 border-solid rounded-sm mr-1 mb-2"
                size="small"
                onClick={() => {
                  console.info("item.label", item.label);
                  handleLastSearch(item.label);
                }}
              >
                {item.label}
              </AtButton>
            ))}
          </View>
        </View>

        <View className=" pb-2">
          <View className="text-xs font-semibold pb-2">我想搜</View>
          <View className="flex text-xs justify-between">
            <View className="flex-1 flex">
              <AtButton
                className="items-center h-8 flex-1 text-sm px-3 text-gray-400 border border-gary-400 border-solid rounded-sm mr-3  mb-2"
                onClick={() => {}}
              >
                猫产品
              </AtButton>
              <AtButton
                className="items-center h-8 flex-1 text-sm px-3 text-gray-400 border border-gary-400 border-solid rounded-sm mr-3  mb-2"
                onClick={() => {}}
              >
                狗产品
              </AtButton>
            </View>
            <Text
              // className="text-sm"
              onClick={() => {
                setOpenSearchMore(true);
              }}
            >
              更多
            </Text>
          </View>
        </View>
        <AtFloatLayout
          isOpened={openSearchMore}
          onClose={() => {
            setOpenSearchMore(false);
          }}
        >
          <View>
            <View className="flex">
              <AtButton
                className="items-center h-8 flex-1 text-sm px-3 text-gray-400 border border-gary-400 border-solid rounded-sm mr-3  mb-2"
                onClick={() => {}}
              >
                猫产品
              </AtButton>
              <AtButton
                className="items-center h-8 flex-1 text-sm px-3 text-gray-400 border border-gary-400 border-solid rounded-sm mr-3  mb-2"
                onClick={() => {}}
              >
                狗产品
              </AtButton>
            </View>
            <View>
              <SearchFilters
                filterList={filterList}
                setFilterList={setFilterList}
              />
            </View>
            <View className="flex justify-center mt-20">
              <View
                className="text-xs rounded-lg justify-center text-gray-400"
                onClick={() => {
                  setOpenSearchMore(false);
                }}
              >
                取消
              </View>
              <View
                className="text-xs rounded-full bg-red-600"
                onClick={() => {
                  setOpenSearchMore(false);
                  handleSearch();
                }}
              >
                确定
              </View>
            </View>
          </View>
        </AtFloatLayout>
        <View className="text-xs">
          <SearchFilters
            filterList={filterList.slice(0, 2)}
            setFilterList={setFilterList}
          />
        </View>
      </View>
      <List list={productList} />
    </View>
  );
};

export default Search;
