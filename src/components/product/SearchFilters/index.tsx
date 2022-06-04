import { FilterListItemProps } from '@/framework/types/products'
import { ScrollView, View, Text } from '@tarojs/components'
import cloneDeep from 'lodash.cloneDeep'
import { useEffect } from 'react'
import './index.less'

interface SearchFiltersProps {
  filterList: FilterListItemProps[]
  setFilterList: (a: FilterListItemProps[]) => void
  isSearchNow?: boolean
  getList: Function
  isShowAll?: boolean
  attributeChooseCallback?: Function
}
const SearchFilters = ({
  isShowAll = true,
  filterList,
  setFilterList,
  isSearchNow,
  getList,
  attributeChooseCallback,
}: SearchFiltersProps) => {
  console.info('filterList', filterList)
  const onChangeFilter = (key, index) => {
    filterList.forEach((el) => {
      if (el.key === key) {
        el.list[index].activeColor = !el.list[index].activeColor
        if (isSearchNow) {
          el.list[index].active = !el.list[index].active
        }
      }
    })
    if (isSearchNow) {
      //搜索
      getList({ flterlist: filterList })
    }
    setFilterList(cloneDeep(filterList))
    attributeChooseCallback && attributeChooseCallback()
  }
  return (
    <>
      {(isShowAll ? filterList : filterList?.slice(0, 2))?.map((filter, idx) => (
        <View key={idx} className="text-xxs relative scorll-view-filter filterItem flex items-center">
          <View className="flex-none w-8 overflow-hidden text-ellipsis whitespace-nowrap border border-transparent  border-solid z-10 bg-white attributeTitle">
            {filter.label}
          </View>
          {/* <View className="flex-1"> */}
          <ScrollView className="whitespace-nowrap " scrollX overflow-anchor={false}>
            {filter.list.map((item, index) => (
              <Text
                key={index}
                onClick={() => {
                  onChangeFilter(filter.key, index)
                }}
                className={`inline-block py-2 px-2 text-center attributeItem search-filter-round mr-2 border border-solid ${(isSearchNow ? item.active : item.activeColor) ? 'bg-red-600 border-red-500 text-white' : 'text-gray-400 border-gary-300'
                  }}`}
              >
                {item.label}
              </Text>
            ))}
          </ScrollView>
          {/* </View> */}
        </View>
      ))}
    </>
  )
}
export default SearchFilters
