// import { breedListMock } from '@/mock/pet'
import { View, Image } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { AtSearchBar } from 'taro-ui'
import cloneDeep from 'lodash.cloneDeep'
import Mock from 'mockjs'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { pySegSort } from '@/utils/utils'
import BreedLists from '@/components/customer/BreedLists'
import { getBreedList, getSortedBreeds } from '@/framework/api/pet/get-breeds'
// const breedLists = Mock.mock(breedListMock).list
// console.info('breedLists', breedLists)
export interface BreedListItemProps {
  id: string
  code: string
  name: string
  type: string
  isHot: boolean
  image: string
}
export interface PySortProps {
  letter: string
  data: BreedListItemProps[]
}
const BreedList = () => {
  const [breedList, setBreedList] = useState<any>([])
  const [activeId, setActiveId] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('')
  const [list, setList] = useState<PySortProps[]>([])
  const { router } = getCurrentInstance()
  const handleKeyword = (val) => {
    setKeyword(val)
  }
  useEffect(() => {
    getList()
  }, [])
  const getList = async () => {
    let type = router?.params?.type || 'CAT'

    let res = await getSortedBreeds({ type })
    setBreedList(res)
    const lists = cloneDeep(res).filter(el => el.letter !== 'hot')
    setList(lists)

    // initData(lists)
  }

  const handleBreed = ({ name, code }) => {
    const pages = Taro.getCurrentPages()
    const current = pages[pages.length - 1]
    const eventChannel = current.getOpenerEventChannel()
    eventChannel.emit('seachBreed', { breed: name, code })
    Taro.navigateBack()
  }
  // const initData = (data: BreedListItemProps[]) => {
  //   let newList: PySortProps[] = pySegSort(data)
  //   console.info('newList', newList)
  //   setList(newList)
  // }
  const handleSearch = () => {
    let searchedList: any = []
    breedList.filter(el => el.letter !== 'hot').map(el => {
      el.data.forEach(breed => {
        if (breed?.name?.indexOf(keyword) > -1) {
          let idx = searchedList.findIndex(item => item?.letter === el.letter)
          if (idx > -1) {
            if (!searchedList[idx]) {
              searchedList[idx] = { letter: el.letter, data: [] }
            }
            if (!searchedList[idx]?.data) {
              searchedList[idx].data = []
            }
            searchedList[idx].data.push(breed)
          } else {
            searchedList.push({ letter: el.letter, data: [breed] })
          }
        }
      })
    })
    setList(searchedList)
    // let list = breedList.filter((item) => item.name.includes(keyword))
    // initData(list)
  }

  return (
    <>
      {breedList.length ? (
        <View className="bg-gray-200">
          <AtSearchBar
            className="bg-gray-200"
            showActionButton
            value={keyword}
            onChange={handleKeyword}
            onActionClick={handleSearch}
          />
          <View className="fixed text-24 top-16 right-2 z-10">
            {list.map((el) => (
              <View
                className="mt-2"
                onClick={() => {
                  setActiveId(`item-${el.letter}`)
                }}
              >
                {el.letter?.toUpperCase()}
              </View>
            ))}
          </View>
          <View className="px-4">
            <View className="text-30 py-3">热门品种</View>
            <View className="grid grid-cols-5 gap-6 px-4">
              {breedList
                .filter((el) => el.letter === 'hot')?.[0]?.data?.map((breed) => (
                  <View
                    onClick={() => {
                      console.info('breedbreed', breed)
                      handleBreed(breed)
                    }}
                  >
                    <Image lazyLoad src={breed.image} className="w-full rounded-full  h-8" mode="widthFix" />
                    <View className="text-24 whitespace-nowrap overflow-hidden overflow-ellipsis">{breed.name}</View>
                  </View>
                ))}
            </View>
          </View>
          <View>
            <View className="px-4 text-30 pt-3">品种列表</View>
            <BreedLists activeId={activeId} list={list} handleBreed={handleBreed} />
          </View>
        </View>
      ) : null}
    </>
  )
}
export default BreedList
