import { FilterListItemProps, OptionProps, PetType, ProductListItemProps } from '@/framework/types/products'
import { useEffect, useState } from 'react'
import SearchFilters from '@/components/product/SearchFilters'
import List from '@/components/product/List'
import { mockList, mocksearchPrams } from '@/mock/product'
import { filterListArr, largeButtonClass } from '@/lib/product'
import SearchFloatLayout from '@/components/product/SearchFloatLayout'
import SearchLastOrHot from '@/components/product/SearchLastOrHot'
import { getAttrs, getProducts } from '@/framework/api/product/get-product'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton, AtSearchBar, AtIcon, AtAvatar } from 'taro-ui'
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
  const [filterList, setFilterList] = useState<FilterListItemProps[]>([])
  const [productList, setProductList] = useState<ProductListItemProps[]>()
  const [animal, setAnimal] = useState<string>()
  useEffect(() => {
    getCatOrDogAttrs('cat')
    getList({})
    getHotList()
    getLastList()
  }, [])
  const getList = async ({
    categoryId,
    goodsName,
    flterlist,
  }: {
    categoryId?: string
    goodsName?: string
    flterlist?: any
  }) => {
    let params: any = {}
    if (categoryId) {
      params.goodsCategoryId = categoryId
    }
    if (goodsName) {
      params.goodsName = goodsName
    }
    ;(flterlist || filterList).map((el) => {
      console.info(
        'el.list.filter((cel) => cel.active)',
        el.list.filter((cel) => cel.active),
      )
      el.list
        .filter((cel) => cel.active)
        .map((val) => {
          if (!params.attributeIds) {
            params.attributeIds = []
          }

          if (!params.attributeValueIds) {
            params.attributeValueIds = []
          }
          params.goodsCategoryId = val.categoryId
          params.attributeIds.push(val.attributeId)
          params.attributeValueIds.push(val.value)
        })
    })
    let res = await getProducts({ limit: 100, sample: params, hasTotal: true, offset: 0 })
    console.info('res', res)
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

  const getCatOrDogAttrs = async (type: string) => {
    // gou:8 cat:10
    const res = await getAttrs({ storeId: '12345678', categoryId: type === 'cat' ? '10' : '8' })
    console.log('get cat Attrs', res)
    setFilterList(res)
    // setAnimal(type)
  }

  return (
    <View className="search">
      <View className=" p-2">
        <AtSearchBar
          showActionButton
          // focus
          value={keyword}
          className="search-bar"
          onChange={(value) => {
            setKeyword(value)
          }}
          placeholder="猫奶罐"
          onActionClick={handleSearch}
        />
        {/* {lastSearchList.length > 0 ? (
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
        ) : null} */}
        {/* <SearchLastOrHot
          handleLastSearch={handleLastSearch}
          titleLeft="热门搜索"
          titleRight={
            <View className="text-xs" onClick={changeSearchHot}>
              换一批
            </View>
          }
          searchList={hotSearchList}
        /> */}

        <View className="border-0">
          <View className="text-md font-semibold pb-4 pt-2">我想搜</View>
          <View className="flex text-xs justify-between">
            <View className="flex-1 flex items-center">
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
                  className="w-7 h-8 line-height bg-center align-middle mr-1"
                  src={`https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/filter_dog${
                    animal === 'dog' ? '_selected_1' : '_1'
                  }.svg`}
                />
                <Text>狗产品</Text>
              </AtButton>
            </View>
            <Image
              className="w-5 h-5 line-height bg-center align-middle moreIcon mr-1"
              src="https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/filter_MP_1.svg"
            />
            <Text
              className="more text-gray-400 text-base align-middle cursor-pointer"
              onClick={() => {
                setOpenSearchMore(true)
              }}
            >
              更多
            </Text>
          </View>
        </View>
        <SearchFloatLayout
          getList={getList}
          openSearchMore={openSearchMore}
          setOpenSearchMore={setOpenSearchMore}
          filterList={filterList}
          setFilterList={setFilterList}
          getCatOrDogAttrs={getCatOrDogAttrs}
          handleSearch={handleSearch}
        />
        <View className="text-xs">
          <SearchFilters
            isSearchNow
            getList={getList}
            filterList={filterList?.slice(0, 2)}
            setFilterList={setFilterList}
          />
        </View>
      </View>
      {productList?.length ? <List list={productList} /> : null}
    </View>
  )
}

export default Search
