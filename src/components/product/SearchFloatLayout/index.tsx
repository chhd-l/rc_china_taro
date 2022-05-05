import { FilterListItemProps } from '@/framework/types/products'
import { largeButtonClass } from '@/lib/product'
import { View } from '@tarojs/components'
import { AtButton, AtFloatLayout } from 'taro-ui'
import SearchFilters from '../SearchFilters'
interface SearchFloatLayoutProps {
  getCatOrDogAttrs: Function
  openSearchMore: boolean
  setOpenSearchMore: (openSearchMore: boolean) => void
  filterList: FilterListItemProps[]
  setFilterList: (filterList: FilterListItemProps[]) => void
  handleSearch: () => void
}
const SearchFloatLayout = ({
  getCatOrDogAttrs,
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
        setOpenSearchMore(false)
      }}
    >
      <View>
        <View className="flex">
          <AtButton
            className={largeButtonClass}
            onClick={() => {
              getCatOrDogAttrs('cat')
            }}
          >
            猫产品
          </AtButton>
          <AtButton
            className={largeButtonClass}
            onClick={() => {
              getCatOrDogAttrs('dog')
            }}
          >
            狗产品
          </AtButton>
        </View>
        <View>
          <SearchFilters filterList={filterList} setFilterList={setFilterList} />
        </View>
        <View className=" mt-20 w-full h-1"></View>
        <View className="flex justify-center absolute bottom-0 w-full">
          <AtButton
            className="text-xs rounded-full flex items-center mx-1 border border-solid border-gray-400 text-gray-400 px-8 py-2  "
            onClick={() => {
              setOpenSearchMore(false)
            }}
          >
            取消
          </AtButton>
          <AtButton
            className="text-xs rounded-full  flex items-center  mx-1 bg-red-600 px-8 py-2 text-white"
            onClick={() => {
              setOpenSearchMore(false)
              handleSearch()
            }}
          >
            确定
          </AtButton>
        </View>
      </View>
    </AtFloatLayout>
  )
}
export default SearchFloatLayout
