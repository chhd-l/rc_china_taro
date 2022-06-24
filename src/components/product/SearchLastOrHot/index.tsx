import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
const littleSearchClassName =
  'flex-1 block text-gray-400 border border-gary-400 border-solid search-filter-round mr-2 text-xs mb-2 truncate text-center py-2 px-1'
const SearchLastOrHot = ({ searchList, titleRight, titleLeft, handleLastSearch }) => {
  return (
    <View className="pb-2 overflow-hidden">
      <View className="flex justify-between pb-2">
        <View className="text-xs font-semibold ">{titleLeft}</View>
        {titleRight}
      </View>
      <View className="flex flex-wrap">
        {searchList.map((item) => (
          <View className={littleSearchClassName}>{item.label}</View>
          // <AtButton
          //   className={littleSearchClassName}
          //   size="small"
          //   onClick={() => {
          //     handleLastSearch(item.label)
          //   }}
          // >
          //   {item.label}
          // </AtButton>
        ))}
      </View>
    </View>
  )
}
export default SearchLastOrHot
