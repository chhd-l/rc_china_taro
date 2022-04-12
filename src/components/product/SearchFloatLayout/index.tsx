import { FilterListItemProps } from "@/framework/types/products";
import { largeButtonClass } from "@/lib/product";
import { View } from "@tarojs/components";
import { AtButton, AtFloatLayout } from "taro-ui";
import SearchFilters from "../SearchFilters";
interface SearchFloatLayoutProps {
  openSearchMore: boolean;
  setOpenSearchMore: (openSearchMore: boolean) => void;
  filterList: FilterListItemProps[];
  setFilterList: (filterList: FilterListItemProps[]) => void;
  handleSearch: () => void;
}
const SearchFloatLayout = ({
  openSearchMore,
  setOpenSearchMore,
  filterList,
  setFilterList,
  handleSearch,
}: SearchFloatLayoutProps) => {
  return (
    <AtFloatLayout
      isOpened={openSearchMore}
      onClose={() => {
        setOpenSearchMore(false);
      }}
    >
      <View>
        <View className="flex">
          <AtButton className={largeButtonClass} onClick={() => {}}>
            猫产品
          </AtButton>
          <AtButton className={largeButtonClass} onClick={() => {}}>
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
  );
};
export default SearchFloatLayout;
