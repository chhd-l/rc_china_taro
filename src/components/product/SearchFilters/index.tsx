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
}
const SearchFilters = ({ filterList, setFilterList, isSearchNow, getList }: SearchFiltersProps) => {
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
    console.info('tets', filterList)
  }
  return (
    <>
      {filterList.map((filter, idx) => (
        <View key={idx} className="text-xxs relative scorll-view-filter">
          <View className="w-8 overflow-hidden text-ellipsis whitespace-nowrap  pb-1 pt-3 py-1 border border-transparent  border-solid z-10 bg-white absolute top-2">
            {filter.label}
          </View>
          <ScrollView className="whitespace-nowrap " scrollX overflow-anchor={false}>
            <Text className="inline-block pr-1 py-1 mb-2 text-white w-8 overflow-hidden text-ellipsis whitespace-nowrap">
              {filter.label}
            </Text>
            {filter.list.map((item, index) => (
              <Text
                key={index}
                onClick={() => {
                  onChangeFilter(filter.key, index)
                }}
                className={`inline-block py-1 px-2 text-center w-16 search-filter-round mr-2 border border-solid  mb-2 ${
                  item.activeColor ? 'bg-red-600 border-red-500 text-white' : 'text-gray-400 border-gary-300'
                }}`}
              >
                {item.label}
              </Text>
            ))}
          </ScrollView>
        </View>
      ))}
    </>
  )
}
export default SearchFilters
