import { View } from "@tarojs/components";
import { AtButton } from "taro-ui";
const littleSearchClassName =
  "float-left  px-3 text-gray-400 border border-gary-400 border-solid rounded-sm mr-1 mb-2";
const SearchLastOrHot = ({
  searchList,
  titleRight,
  titleLeft,
  handleLastSearch,
}) => {
  return (
    <View className="pb-2 overflow-hidden">
      <View className="flex justify-between pb-2">
        <View className="text-xs font-semibold ">{titleLeft}</View>
        {titleRight}
      </View>
      <View>
        {searchList.map((item) => (
          <AtButton
            className={littleSearchClassName}
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
  );
};
export default SearchLastOrHot;
