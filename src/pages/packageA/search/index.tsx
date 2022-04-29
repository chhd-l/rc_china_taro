import { FilterListItemProps, OptionProps, PetType, ProductListItemProps } from '@/framework/types/products'
import { useEffect, useState } from 'react'
import SearchFilters from '@/components/product/SearchFilters'
import List from '@/components/product/List'
import { mockList, mocksearchPrams } from '@/mock/product'
import { filterListArr, largeButtonClass } from '@/lib/product'
import SearchFloatLayout from '@/components/product/SearchFloatLayout'
import SearchLastOrHot from '@/components/product/SearchLastOrHot'
import {getAttrs, getProducts} from '@/framework/api/product/get-product'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtSearchBar, AtIcon } from 'taro-ui'
import Mock from 'mockjs'
import './index.less'

interface SearchProps {
  keywords: string
  type: PetType
  specialarea: string
  age: string
  productFunction: string
  breed: string
}
const Search = () => {
  const [keyword, setKeyword] = useState('')
  const [hotSearchList, setHotSearchList] = useState<OptionProps[]>([])
  const [lastSearchList, setLastSearchList] = useState<OptionProps[]>([])
  const [openSearchMore, setOpenSearchMore] = useState<boolean>(false)
  const [filterList, setFilterList] = useState<FilterListItemProps[]>(filterListArr)
  const [productList, setProductList] = useState<ProductListItemProps[]>()
  useEffect(() => {
    getList()
    getHotList()
    getLastList()
  }, [])
  const getList = async () => {
    let res = await getProducts({ limit: 100, sample: {}, isNeedTotal: true, operator: 'sss', offset: 0 })
    setProductList(res)
  }
  const getHotList = () => {
    let hotList = Mock.mock(mocksearchPrams).list
    console.info('mocksearchPrams', hotList)
    setHotSearchList(hotList)
  }
  const getLastList = async () => {
    let lastList = await getStorageLast()
    setLastSearchList(lastList)
  }
  const getStorageLast = async () => {
    let list = []
    try {
      var value = await Taro.getStorageSync('lastSearchList')
      if (value) {
        list = value
      }
    } catch (e) {
      list = []
    }
    return list
  }
  const handleSearch = async () => {
    await handleLastSearch(keyword)
    // to do search
  }
  const changeSearchHot = () => {
    getHotList()
  }
  const deleteLast = () => {
    console.info('....')
    Taro.setStorage({
      key: 'lastSearchList',
      data: [],
    })
  }
  const handleLastSearch = async (value) => {
    let newLastSearchList: OptionProps[] = await getStorageLast()
    newLastSearchList.forEach((el, i) => {
      if (el.label === value) {
        newLastSearchList.splice(i, 1)
      }
    })
    newLastSearchList.unshift({
      label: value,
      value: value,
    })
    setLastSearchList(newLastSearchList)
    Taro.setStorage({
      key: 'lastSearchList',
      data: newLastSearchList,
    })
    setKeyword(value)
    console.info('seach', value)
  }

  const getCatOrDogAttrs=async (type:string)=>{
    // gou:8 cat:10
    const res=await getAttrs({ storeId:"12345678", categoryId:type==='cat'?"10":'8' })
    console.log('get cat Attrs',res)
    setFilterList(res)
  }

  return (
    <View className="search">
      <View className=" p-2">
        <AtSearchBar
          showActionButton
          focus
          value={keyword}
          onChange={(value) => {
            setKeyword(value)
          }}
          onActionClick={handleSearch}
        />
        {lastSearchList.length > 0 ? (
          <SearchLastOrHot
            handleLastSearch={handleLastSearch}
            titleLeft="最近搜索"
            titleRight={
              <View>
                <AtIcon onClick={deleteLast} value="trash" size="16" color="rgb(107, 114, 128)"></AtIcon>
              </View>
            }
            searchList={lastSearchList}
          />
        ) : null}
        <SearchLastOrHot
          handleLastSearch={handleLastSearch}
          titleLeft="热门搜索"
          titleRight={
            <View className="text-xs" onClick={changeSearchHot}>
              换一批
            </View>
          }
          searchList={hotSearchList}
        />

        <View className=" pb-2">
          <View className="text-xs font-semibold pb-2">我想搜</View>
          <View className="flex text-xs justify-between">
            <View className="flex-1 flex">
              <AtButton className={largeButtonClass} onClick={() => {getCatOrDogAttrs('cat')}}>
                猫产品
              </AtButton>
              <AtButton className={largeButtonClass} onClick={() => {getCatOrDogAttrs('dog')}}>
                狗产品
              </AtButton>
            </View>
            <Text
              // className="text-sm"
              onClick={() => {
                setOpenSearchMore(true)
              }}
            >
              更多
            </Text>
          </View>
        </View>
        <SearchFloatLayout
          openSearchMore={openSearchMore}
          setOpenSearchMore={setOpenSearchMore}
          filterList={filterList}
          setFilterList={setFilterList}
          handleSearch={handleSearch}
        />
        <View className="text-xs">
          <SearchFilters filterList={filterList.slice(0, 2)} setFilterList={setFilterList} />
        </View>
      </View>
      {productList?.length ? <List list={productList} /> : null}
    </View>
  )
}

export default Search
