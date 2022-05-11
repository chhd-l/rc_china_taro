import { FilterListItemProps } from '@/framework/types/products'
import { largeButtonClass } from '@/lib/product'
import { Text, View, Image } from '@tarojs/components'
import { useState } from 'react'
import { AtAvatar, AtButton, AtFloatLayout } from 'taro-ui'
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
      <View className="height-80vh">
        <View className="flex searchfloatlayout  mt-4">
          <AtButton
            className={`${animal === 'cat' && 'animal-color'} ${largeButtonClass}`}
            onClick={() => {
              getList({ categoryId: '10' })
              getCatOrDogAttrs('cat')
              setAnimal('cat')
            }}
          >
            {/* 猫图标切换 */}
            <Image
              className="w-7 h-8 line-height bg-center align-middle mr-1"
              src={`https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/filter_cat${
                animal === 'cat' ? '_selected_1' : '_1'
              }.svg`}
            />
            <Text>猫产品</Text>
          </AtButton>
          <AtButton
            className={`${animal === 'dog' && 'animal-color'} ${largeButtonClass}`}
            onClick={() => {
              getList({ categoryId: '8' })
              getCatOrDogAttrs('dog')
              setAnimal('dog')
            }}
          >
            <Image
              // circle
              className="w-7 h-8 line-height bg-center align-middle mr-1"
              src={`https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/filter_dog${
                animal === 'dog' ? '_selected_1' : '_1'
              }.svg`}
            />
            <Text>狗产品</Text>
          </AtButton>
        </View>
        <View className="text-xs">
          <SearchFilters getList={getList} filterList={filterList} setFilterList={setFilterList} />
        </View>
        <View className=" mt-20 w-full h-1"></View>
        <View className="flex justify-center absolute bottom-10 w-full">
          <AtButton
            className="cancelButton rounded-full flex h-10 w-30 items-center mx-1 text-gray-400 px-8 py-2  "
            onClick={() => {
              setOpenSearchMore(false)
            }}
          >
            取消
          </AtButton>
          <AtButton
            className="rounded-full flex h-10 w-30 items-center  mx-1 bg-red-600 px-8 py-2 text-white"
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
