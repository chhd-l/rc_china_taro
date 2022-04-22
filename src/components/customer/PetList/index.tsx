import { Swiper, SwiperItem, View, Image, Text } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { petLists } from '@/mock/pet'
import Mock from 'mockjs'
import { PetListItemProps } from '@/framework/types/customer'
import { AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import { getPets } from '@/framework/api/pet/get-pets'
import { customerAtom } from '@/store/customer'
import { useAtom } from 'jotai'

const pets = Mock.mock(petLists).list
const fakePetInfo = { id: '-1' }
const PetList = () => {
  const [petList, setPetList] = useState<PetListItemProps[]>([])
  const [customerInfo, setCustomerInfo] = useAtom(customerAtom)
  const [fakePet, setFakePet] = useState<any>([])
  const [currentIdx, setCurrentIdx] = useState(1)
  const handleChange = (current: number) => {
    setCurrentIdx(current)
  }
  useEffect(() => {
    console.log(customerInfo, 'customerInfogetList')
    getList()
  }, [customerInfo])
  useEffect(() => {
    getList()
  }, [])
  const getList = async () => {
    let res = (await getPets()) || []
    setPetList(res)
    let mockPets: any = []
    if (res.length === 1) {
      mockPets = [fakePetInfo, ...res, fakePetInfo]
    } else if (res.length === 2) {
      mockPets = [...res, fakePetInfo]
    } else {
      mockPets = res
    }
    setFakePet(mockPets)
  }
  const toPetList = () => {
    Taro.navigateTo({
      url: `/pages/packageB/petList/index?petNumber=${petList.length}`,
    })
  }
  useEffect(() => {
    console.info('currentIdx', currentIdx)
  }, [currentIdx])
  return (
    <View className="py-2 px-4 rounded-lg  bg-gray-100 mt-4">
      <View className="flex justify-between">
        <View className="font-semibold">我的宠物</View>
        <AtIcon value="edit" onClick={toPetList} size="26" color="#F00"></AtIcon>
      </View>
      <View className="relative w-full">
        {petList.length === 1 || petList.length === 2 ? (
          <View className="absolute right-0 top-8" onClick={toPetList}>
            +
          </View>
        ) : null}
      </View>
      {fakePet.length ? (
        <View className="mt-4">
          <Swiper
            style={{ height: '80px' }}
            circular
            displayMultipleItems={3}
            onChange={({ detail }) => {
              let current = detail.current < fakePet.length - 1 ? detail.current + 1 : 0
              handleChange(current)
            }}
          >
            {fakePet.map((pet, idx) => (
              <SwiperItem>
                <View className="text-center  h-16">
                  <Image
                    src={pet.image}
                    className={`w-16 h-16 rounded-full shadow-md ${currentIdx === idx ? '' : 'scale-75 transform '}`}
                  />
                </View>
              </SwiperItem>
            ))}
          </Swiper>
          <View className="text-26 text-center">
            <Text className="text-red-600 font-semibold text-24 mx-2">{fakePet[currentIdx].name}</Text>
            {fakePet[currentIdx]?.gender} {fakePet[currentIdx]?.breed}
            {fakePet[currentIdx]?.age}
          </View>
        </View>
      ) : (
        <View className="">Add pet</View>
      )}
    </View>
  )
}

export default PetList
