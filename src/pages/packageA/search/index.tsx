import { FilterListItemProps, OptionProps, PetType, ProductListItemProps } from '@/framework/types/products'
import { useEffect, useState } from 'react'
import SearchFilters from '@/components/product/SearchFilters'
import List from '@/components/product/List'
import { mockList, mocksearchPrams } from '@/mock/product'
import { filterListArr, largeButtonClass } from '@/lib/product'
import SearchFloatLayout from '@/components/product/SearchFloatLayout'
import SearchLastOrHot from '@/components/product/SearchLastOrHot'
import {
  addSearchInfoRecordRecently,
  getAttrs,
  getProducts,
  hotSearchFindPage,
  searchInfoRecordRecentlyDelete,
  searchInfoRecordRecentlyFind,
} from '@/framework/api/product/get-product'
import Taro, { useReachBottom } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton, AtSearchBar, AtIcon, AtAvatar } from 'taro-ui'
import Mock from 'mockjs'
import './index.less'
import NavBar from '@/components/common/Navbar'
import { consumerAtom } from '@/store/consumer'
import { useAtom } from 'jotai'
import moment from 'moment'

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
  const [productName, setProductName] = useState<string>('')
  const [placeholderName, setPlaceholderName] = useState<string>()
  const [isNoMore, setIsNoMore] = useState(false)
  const [animal, setAnimal] = useState<string>('')
  const [consumerInfo, setConsumerInfo] = useAtom(consumerAtom)
  const [hotCurrentCount, setHotCurrentCount] = useState(0)
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
    getList({ current, name: productName, productCategoryId: categoryId })
  })
  useEffect(() => {
    console.info('consumerInfo', consumerInfo)
    if (!productName) {
      return
    }
    let params = {
      id: consumerInfo?.id,
      searchInfoItem: {
        searchInfo: productName,
        searchTime: moment(new Date()),
      },
    }
    console.info('searchInfoRecordRecently', params)
    addSearchInfoRecordRecently(params)
  }, [productName])
  const getList = async ({
    productCategoryId,
    name = placeholderName || keyword,
    flterlist,
    current,
  }: {
    productCategoryId?: string
    name?: string
    flterlist?: any
    current?: number
  }) => {
    let params: any = {}
    let offset = 0
    if (current) {
      offset = current * 10
    }
    if (productCategoryId) {
      params.categoryId = productCategoryId
      setCategoryId(productCategoryId)
    }
    if (name) {
      params.name = name
    }
    ;(flterlist || filterList).map((el) => {
      el.list
        .filter((cel) => cel.active)
        .map((val) => {
          if (!params.attributeRelations?.length) {
            params.attributeRelations = []
          }
          let hasAttributeIdIdx = params.attributeRelations?.findIndex(
            (relation) => relation.attributeId === val.attributeId,
          )
          if (hasAttributeIdIdx > -1) {
            params.attributeRelations[hasAttributeIdIdx]?.attributeValueIds.push(val.value)
          } else {
            let attributeRelations = { attributeId: val.attributeId, attributeValueIds: [val.value] }
            params.attributeRelations.push(attributeRelations)
          }
          params.categoryId = val.categoryId
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
  const getHotList = async () => {
    // let hotList = Mock.mock(mocksearchPrams).list
    let offset = hotCurrentCount
    let params = {
      offset,
      limit: 4,
      isNeedTotal: true,
      sample: { storeId: '12345678' },
    }
    let { total, records } = await hotSearchFindPage(params)
    if (offset + 4 >= total) {
      offset = 1
    } else {
      offset += 4
    }
    setHotCurrentCount(offset)
    let hotList = records.map((el) => {
      return { label: el.topName }
    })
    console.info('mocksearchPrams', hotList)
    setHotSearchList(hotList)
  }
  const getLastList = async () => {
    if (!consumerInfo?.id) {
      return
    }
    let lastList = await searchInfoRecordRecentlyFind(consumerInfo.id)
    // let lastList = await getStorageLast()
    lastList =
      lastList.map((el) => {
        return { label: el.searchInfo }
      }) || []
    lastList = lastList.splice(0, 7)
    Taro.setStorage({
      key: 'lastSearchList',
      data: lastList,
    })
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
    let name = keyword?.trim()
    setProductName(name)
    await handleLastSearch(name)
    // to do search
  }
  const changeSearchHot = () => {
    getHotList()
  }
  const deleteLast = async () => {
    console.info('....')
    await searchInfoRecordRecentlyDelete({ id: consumerInfo?.id })
    Taro.removeStorage({
      key: 'lastSearchList',
      success: () => {
        console.info('成功')
      },
      fail: (err) => {
        console.info('err', err)
      },
    })
    setLastSearchList([])
    // Taro.setStorage({
    //   key: 'lastSearchList',
    //   data: [],
    // })
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
    newLastSearchList = newLastSearchList.splice(0, 7)
    setLastSearchList(newLastSearchList)
    Taro.setStorage({
      key: 'lastSearchList',
      data: newLastSearchList,
    })
    getList({ name: value })
    if (!productName) {
      setPlaceholderName(value)
    }
  }

  const getCatOrDogAttrs = async (petType: string) => {
    // gou:8 cat:10
    const res = await getAttrs({ storeId: '12345678', categoryId: petType === 'cat' ? '10' : '8' })
    console.log('get cat Attrs', res)
    setFilterList(res)
    // setAnimal(type)
  }
  const handleCancel = () => {
    setPlaceholderName('猫奶罐')
  }

  return (
    <>
      <NavBar navbarTitle="搜索" isNeedBack />
      <View className="search">
        <View className=" p-2">
          <AtSearchBar
            showActionButton
            // focus
            onClear={handleCancel}
            value={keyword}
            className="search-bar"
            onChange={(value) => {
              setKeyword(value)
            }}
            placeholder={placeholderName || '猫奶罐'}
            onConfirm={handleSearch}
            onActionClick={handleSearch}
          />
          {lastSearchList.length > 0 ? (
            <SearchLastOrHot
              handleLastSearch={handleLastSearch}
              titleLeft="最近搜索"
              titleRight={
                <View>
                  <AtIcon onClick={deleteLast} value="trash" size="16" color="#CECECE"></AtIcon>
                </View>
              }
              searchList={lastSearchList}
            />
          ) : null}
          {hotSearchList?.length ? (
            <SearchLastOrHot
              handleLastSearch={handleLastSearch}
              titleLeft="热门搜索"
              titleRight={
                <View className="text-xs" style={{ color: '#CECECE' }} onClick={changeSearchHot}>
                  换一批
                </View>
              }
              searchList={hotSearchList}
            />
          ) : null}

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
                    getList({ productCategoryId: '10' })
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
                    getList({ productCategoryId: '8' })
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
