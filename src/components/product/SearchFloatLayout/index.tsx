import { FilterListItemProps } from '@/framework/types/products'
import { largeButtonClass } from '@/lib/product'
import { Text, View } from '@tarojs/components'
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
      <View>
        <View className="flex searchfloatlayout">
          <AtButton
            className={`${animal === 'cat' && 'animal-color'} ${largeButtonClass}`}
            onClick={() => {
              getList({ categoryId: '10' })
              getCatOrDogAttrs('cat')
              setAnimal('cat')
            }}
          >
            {/* 猫图标切换 */}
            <AtAvatar
              className="w-4 h-4 leading-none bg-center align-middle mr-1"
              image={`https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/filter_cat${
                animal === 'cat' ? '_selected' : ''
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
            <AtAvatar
              // circle
              className="w-4 h-4 leading-none bg-center align-middle mr-1"
              image={`https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/filter_dog${
                animal === 'dog' ? '_selected' : ''
              }.svg`}
            />
            <Text>狗产品</Text>
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
