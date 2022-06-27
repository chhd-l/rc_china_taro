import { View } from '@tarojs/components'
import './index.less'
import { AtButton } from 'taro-ui'
const littleSearchClassName =
  'flex-1 border-2  border-solid search-filter-round text-xs truncate text-center serach-item py-2 px-2 text-gray-400 mr-2'
const SearchLastOrHot = ({ searchList, titleRight, titleLeft, handleLastSearch }) => {
  return (
    <View className="pb-2 overflow-hidden">
      <View className="flex justify-between pb-2">
        <View className="text-xs font-semibold ">{titleLeft}</View>
        {titleRight}
      </View>
      <View className="flex flex-wrap pr-2">
        {searchList.map((item) => (
          <View
            style={{ width: '25%' }}
            onClick={() => {
              handleLastSearch(item.label)
            }}
            className="mb-2 flex serach-item-wrap"
          >
            <View style={{ borderColor: '#CECECE' }} className={littleSearchClassName}>
              {item.label}
            </View>
          </View>

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
