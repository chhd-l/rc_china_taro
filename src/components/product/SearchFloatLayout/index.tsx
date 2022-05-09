import { FilterListItemProps } from '@/framework/types/products'
import { largeButtonClass } from '@/lib/product'
import { View } from '@tarojs/components'
import { useState } from 'react'
import { AtButton, AtFloatLayout } from 'taro-ui'
import SearchFilters from '../SearchFilters'
import './index.less'

interface SearchFloatLayoutProps {
  getCatOrDogAttrs: Function
  openSearchMore: boolean
  getList: Function
  setOpenSearchMore: (openSearchMore: boolean) => void
  filterList: FilterListItemProps[]
  setFilterList: (filterList: FilterListItemProps[]) => void
  handleSearch: Function
}
const SearchFloatLayout = ({
  getCatOrDogAttrs,
  openSearchMore,
  setOpenSearchMore,
  filterList,
  getList,
  setFilterList,
  handleSearch,
}: SearchFloatLayoutProps) => {
  const [animal, setAnimal] = useState<String>()
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
            className={`${animal === 'cat' && 'animal-color'} ${largeButtonClass}`}
            onClick={() => {
              getList({ categoryId: '10' })
              getCatOrDogAttrs('cat')
              setAnimal('cat')
            }}
          >
            <View className="at-icon at-icon-trash"></View>
            猫产品
          </AtButton>
          <AtButton
            className={`${animal === 'dog' && 'animal-color'} ${largeButtonClass}`}
            onClick={() => {
              getList({ categoryId: '8' })
              getCatOrDogAttrs('dog')
              setAnimal('dog')
            }}
          >
            狗产品
          </AtButton>
        </View>
        <View>
          <SearchFilters getList={getList} filterList={filterList} setFilterList={setFilterList} />
        </View>
        <View className=" mt-20 w-full h-1"></View>
        <View className="flex justify-center absolute bottom-0 w-full">
          <AtButton
            className="text-xs rounded-full flex h-8 w-25 items-center mx-1 border border-solid border-gray-400 text-gray-400 px-8 py-2  "
            onClick={() => {
              setOpenSearchMore(false)
            }}
          >
            取消
          </AtButton>
          <AtButton
            className="text-xs rounded-full  flex h-8 w-25 items-center  mx-1 bg-red-600 px-8 py-2 text-white"
            onClick={() => {
              setOpenSearchMore(false)
              filterList.forEach((el: any) => {
                el.list.forEach((cel) => {
                  cel.active = cel.activeColor
                })
              })
              getList({ filterlist: filterList })
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
