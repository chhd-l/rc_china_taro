import { breedListMock } from '@/mock/pet'
import { View, Image } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { AtSearchBar } from 'taro-ui'
import cloneDeep from 'lodash.cloneDeep'
import Mock from 'mockjs'
import Taro from '@tarojs/taro'
import { imageOptionProps, PySortProps } from '@/framework/types/common'
import { pySegSort } from '@/utils/utils'
import BreedLists from '@/components/customer/BreedLists'
const breedLists = Mock.mock(breedListMock).list
console.info('breedLists', breedLists)

const BreedList = () => {
  const [breedList, setBreedList] = useState<imageOptionProps[]>(breedLists)
  const [activeId, setActiveId] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('')
  const [list, setList] = useState<PySortProps[]>([])
  const handleKeyword = (val) => {
    setKeyword(val)
  }

  const handleBreed = ({ value }) => {
    const pages = Taro.getCurrentPages()
    const current = pages[pages.length - 1]
    const eventChannel = current.getOpenerEventChannel()
    eventChannel.emit('seachBreed', { breed: value })
    Taro.navigateBack()
  }
  useEffect(() => {
    const lists = cloneDeep(breedLists)
    initData(lists)
  }, [])
  const initData = (data) => {
    let newList = pySegSort(data)
    setList(newList)
  }
  const handleSearch = () => {
    let list = breedLists.filter((item) => item.value.includes(keyword))
    initData(list)
  }
  return (
    <View className="bg-gray-200">
      <AtSearchBar
        className="bg-gray-200"
        showActionButton
        value={keyword}
        onChange={handleKeyword}
        onActionClick={handleSearch}
      />
      <View className="fixed top-8 right-2 z-10">
        {list.map((el) => (
          <View
            onClick={() => {
              setActiveId(`item-${el.letter}`)
            }}
          >
            {el.letter.toUpperCase()}
          </View>
        ))}
      </View>
      <View className="px-4">
        <View className="text-30 py-3">热门品种</View>
        <View className="grid grid-cols-5 gap-6 px-4">
          {breedList.map((breed) => (
            <View
              onClick={() => {
                handleBreed(breed)
              }}
            >
              <Image src={breed.image} className="w-full rounded-full" mode="widthFix" />
              <View className="text-24 whitespace-nowrap">{breed.value}</View>
            </View>
          ))}
        </View>
      </View>
      <View>
        <View className="px-4 text-30 pt-3">品种列表</View>
        <BreedLists activeId={activeId} list={list} handleBreed={handleBreed} />
      </View>
    </View>
  )
}
export default BreedList
