// import { breedListMock } from '@/mock/pet'
import { View, Image } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { AtSearchBar } from 'taro-ui'
import cloneDeep from 'lodash.cloneDeep'
import Mock from 'mockjs'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { pySegSort } from '@/utils/utils'
import BreedLists from '@/components/customer/BreedLists'
import { getBreedList } from '@/framework/api/pet/get-breeds'
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
  const [breedList, setBreedList] = useState<BreedListItemProps[]>([])
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
    let res = await getBreedList()
    let type = router?.params?.type || 'CAT'
    res = res.filter((el) => el.type == type)
    setBreedList(res)
    const lists = cloneDeep(res)
    initData(lists)
  }

  const pySegSort = (arr) => {
    if (!String.prototype.localeCompare) return []
    let letters = 'abcdefghjklmnopqrstwxyz'.split('')
    let zh = '阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀'.split('')
    let segs: PySortProps[] = []
    letters.map((item, i) => {
      let cur: PySortProps = { letter: item, data: [] }
      arr.map((el) => {
        let item = el.name
        if (item.localeCompare(zh[i]) >= 0 && item.localeCompare(zh[i + 1]) < 0) {
          cur.data.push(el)
        }
      })
      if (cur.data.length) {
        cur.data.sort(function (a, b) {
          return a.name.localeCompare(b.name, 'zh')
        })
        segs.push(cur)
      }
    })

    return segs
  }

  const handleBreed = ({ code }) => {
    const pages = Taro.getCurrentPages()
    const current = pages[pages.length - 1]
    const eventChannel = current.getOpenerEventChannel()
    eventChannel.emit('seachBreed', { breed: code })
    Taro.navigateBack()
  }
  const initData = (data: BreedListItemProps[]) => {
    let newList: PySortProps[] = pySegSort(data)
    setList(newList)
  }
  const handleSearch = () => {
    let list = breedList.filter((item) => item.name.includes(keyword))
    initData(list)
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
          <View className="fixed top-8 right-2 z-10">
            {list.map((el) => (
              <View
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
                .filter((el) => el.isHot)
                .filter((el, idx) => idx < 10)
                .map((breed) => (
                  <View
                    onClick={() => {
                      handleBreed(breed)
                    }}
                  >
                    <Image src={breed.image} className="w-full rounded-full" mode="widthFix" />
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
