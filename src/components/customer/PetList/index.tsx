import { Swiper, SwiperItem, View, Image, Text } from '@tarojs/components'
import { useState } from 'react'
import { petLists } from '@/mock/pet'
import Mock from 'mockjs'
import { PetListItemProps } from '@/framework/types/customer'
import { AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
const pets = Mock.mock(petLists).list

const PetList = () => {
  const [petList, setPetList] = useState<PetListItemProps[]>(pets)
  const [currentIdx, setCurrentIdx] = useState(1)
  const handleChange = (current: number) => {
    setCurrentIdx(current)
  }
  const toPetList = () => {
    Taro.navigateTo({
      url: '/pages/packageB/petList/index',
    })
  }
  return (
    <View className="py-2 px-4 rounded-lg  bg-gray-100 mt-4">
      <View className="flex justify-between">
        <View className="font-semibold">我的宠物</View>
        <AtIcon value="edit" onClick={toPetList} size="26" color="#F00"></AtIcon>
      </View>
      <Swiper
        style={{ height: '80px' }}
        circular
        displayMultipleItems={3}
        onChange={({ detail }) => {
          let current = detail.current < petList.length - 1 ? detail.current + 1 : 0
          handleChange(current)
        }}
      >
        {petList.map((pet, idx) => (
          <SwiperItem>
            <View className="text-center  h-16 ">
              <Image
                src={pet.image}
                className={`w-16 h-16 rounded-full shadow-md ${currentIdx === idx ? '' : 'scale-75 transform '}`}
              />
            </View>
          </SwiperItem>
        ))}
      </Swiper>
      <View className="text-26 text-center">
        {currentIdx}
        <Text className="text-red-600 font-semibold text-24 mx-2">{petList[currentIdx].name}</Text>
        {petList[currentIdx].gender} {petList[currentIdx].breed}
        {petList[currentIdx].age}
      </View>
    </View>
  )
}

export default PetList
