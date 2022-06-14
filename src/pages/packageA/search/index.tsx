import { FilterListItemProps, OptionProps, PetType, ProductListItemProps } from '@/framework/types/products'
import { useEffect, useState } from 'react'
import SearchFilters from '@/components/product/SearchFilters'
import List from '@/components/product/List'
import { mockList, mocksearchPrams } from '@/mock/product'
import { filterListArr, largeButtonClass } from '@/lib/product'
import SearchFloatLayout from '@/components/product/SearchFloatLayout'
import SearchLastOrHot from '@/components/product/SearchLastOrHot'
import { getAttrs, getProducts } from '@/framework/api/product/get-product'
import Taro, { useReachBottom } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton, AtSearchBar, AtIcon, AtAvatar } from 'taro-ui'
import Mock from 'mockjs'
import './index.less'
import NavBar from '@/components/common/Navbar'

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
  const [productList, setProductList] = useState<ProductListItemProps[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [categoryId, setCategoryId] = useState<string>('')
  const [goodsName, setGoodsName] = useState<string>('')
  const [isNoMore, setIsNoMore] = useState(false)
  const [animal, setAnimal] = useState<string>('')
  let type = 1 // 0. 显示直播、预告、商品讲解、回放其中之一的挂件；1. 只显示直播的挂件；2. 只显示预告的挂件；3. 只显示商品讲解的挂件；4. 只显示回放的挂件
  let customParams = encodeURIComponent(JSON.stringify({ path: 'pages/productList/index', pid: 1 })) // 开发者在直播间页面路径上携带自定义参数（如示例中的 path 和pid参数），后续可以在分享卡片链接和跳转至商详页时获取，详见【获取自定义参数】、【直播间到商详页面携带参数】章节（上限600个字符，超过部分会被截断）
  let closePictureInPictureMode = 0 // 是否关闭小窗
  useEffect(() => {
    getCatOrDogAttrs('cat')
    getList({})
    getHotList()
    getLastList()
  }, [])

  useReachBottom(() => {
    if (isNoMore) {
      return
    }
    let current = currentPage + 1
    setCurrentPage(current)
    getList({ current, goodsName, categoryId })
  })
  const getList = async ({
    categoryId,
    goodsName = keyword,
    flterlist,
    current,
  }: {
    categoryId?: string
    goodsName?: string
    flterlist?: any
    current?: number
  }) => {
    let params: any = {}
    let offset = 0
    if (current) {
      offset = current * 10
    }
    if (categoryId) {
      params.goodsCategoryId = categoryId
      setCategoryId(categoryId)
    }
    if (goodsName) {
      params.goodsName = goodsName
    }
    ;(flterlist || filterList).map((el) => {
      el.list
        .filter((cel) => cel.active)
        .map((val) => {
          if (!params.attributeRelation?.length) {
            params.attributeRelation = []
          }
          let hasAttributeIdIdx = params.attributeRelation?.findIndex(
            (relation) => relation.attributeId === val.attributeId,
          )
          if (hasAttributeIdIdx > -1) {
            params.attributeRelation[hasAttributeIdIdx]?.attributeValueIds.push(val.value)
          } else {
            let attributeRelation = { attributeId: val.attributeId, attributeValueIds: [val.value] }
            params.attributeRelation.push(attributeRelation)
          }
          params.goodsCategoryId = val.categoryId
        })
    })
    let { productList: list, total } = await getProducts({ limit: 10, sample: params, hasTotal: true, offset })
    console.info('list, totallist, total', list, total, offset)
    let listData = list
    if (offset > 0) {
      listData = [...productList, ...list]
    }
    if (total < offset + 10) {
      setIsNoMore(true)
    } else {
      setIsNoMore(false)
    }
    setProductList(listData)
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
    getList({ goodsName: value })
    setKeyword(value)
  }

  const getCatOrDogAttrs = async (type: string) => {
    // gou:8 cat:10
    const res = await getAttrs({ storeId: '12345678', categoryId: type === 'cat' ? '10' : '8' })
    console.log('get cat Attrs', res)
    setFilterList(res)
    // setAnimal(type)
  }

  return (
    <>
      <NavBar navbarTitle="搜索" isNeedBack />
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
            onConfirm={handleSearch}
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
            {/* <View
              direction="all"
              className={`fixed right-2 bottom-28 z-50`}
              style={{ width: '100px', height: '100px' }}
            >
              <pendant type={type} customParams={customParams} closePictureInPictureMode={closePictureInPictureMode}></pendant>
            </View> */}
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
            animal={animal}
            setAnimal={setAnimal}
            getList={getList}
            openSearchMore={openSearchMore}
            setOpenSearchMore={setOpenSearchMore}
            filterList={filterList}
            setFilterList={setFilterList}
            getCatOrDogAttrs={getCatOrDogAttrs}
            handleSearch={handleSearch}
          />
          <View className="text-xs mt-2 w-full overflow-hidden">
            <SearchFilters
              isShowAll={false}
              isSearchNow
              getList={getList}
              filterList={filterList}
              setFilterList={setFilterList}
              attributeChooseCallback={() => {
                if (!animal) {
                  setAnimal('cat')
                }
              }}
            />
          </View>
        </View>
        {productList?.length ? <List list={productList} /> : null}
      </View>
    </>
  )
}

export default Search
