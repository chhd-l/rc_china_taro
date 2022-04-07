import { FilterListItemProps } from "@/framework/types/products";
import { ScrollView, View, Text } from "@tarojs/components";
import { cloneDeep } from "lodash";
interface SearchFiltersProps {
  filterList: FilterListItemProps[];
  setFilterList: (a: FilterListItemProps[]) => void;
}
const SearchFilters = ({ filterList, setFilterList }: SearchFiltersProps) => {
  console.info("filterList", filterList);
  const onChangeFilter = (key, index) => {
    filterList.forEach((el) => {
      if (el.key === key) {
        el.list[index].active = !el.list[index].active;
      }
    });
    setFilterList(cloneDeep(filterList));
    console.info("tets");
  };
  return (
    <>
      {filterList.map((filter) => (
        <View className="text-xxs">
          <View className="px-2 py-1 border border-transparent  border-solid z-10 bg-white absolute">
            {filter.label}
          </View>
          <ScrollView className="whitespace-nowrap" scrollX>
            <Text className="px-2 py-1 text-white mr-1">{filter.label}</Text>
            {filter.list.map((item, index) => (
              <Text
                onClick={() => {
                  onChangeFilter(filter.key, index);
                }}
                className={`inline-block py-1 px-2  rounded-sm mr-3 border  border-solid  mb-2 ${
                  item.active
                    ? "bg-red-600 border-red-500 text-white"
                    : "text-gray-400 border-gary-300"
                }}`}
              >
                {item.label}
              </Text>
            ))}
          </ScrollView>
        </View>
      ))}
    </>
  );
};
export default SearchFilters;
