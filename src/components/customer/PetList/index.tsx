import { Swiper, SwiperItem, View, Image, Text } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { petLists } from '@/mock/pet'
import Mock from 'mockjs'
import { PetGender, PetListItemProps } from '@/framework/types/customer'
import { AtIcon } from 'taro-ui'
import Taro, { useDidShow } from '@tarojs/taro'
import { getPets } from '@/framework/api/pet/get-pets'
import { customerAtom } from '@/store/customer'
import { useAtom } from 'jotai'
import { getAge } from '@/utils/utils'
import defaultCatImg from '@/assets/img/default.png'
import defaultDogImg from '@/assets/img/defaultdog.png'
import petBg from '@/assets/img/pet-bg.png'
import addImg from '@/assets/img/addNew.png'
import addIcon from '@/assets/img/add.png'
import femaleIcon from '@/assets/icons/pet/female.png'
import maleIcon from '@/assets/icons/pet/male.png'

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
  useDidShow(() => {
    // 返回页面不渲染
    getList()
  })
  const getList = async () => {
    let res = (await getPets()) || []
    res.forEach((item) => {
      item.age = getAge(item.birthday)
    })
    setPetList(res)
    let mockPets: any = []
    if (res.length === 1) {
      mockPets = [fakePetInfo, ...res, fakePetInfo]
    } else if (res.length === 2) {
      mockPets = [...res, fakePetInfo]
    } else {
      mockPets = res
    }
    console.info(res)
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
    <View className="py-2 px-4 rounded-lg  bg-contain  bg-gray-100 mt-4" style={{ backgroundImage: `url(${petBg})` }}>
      <View className="flex justify-between">
        <View className="font-semibold">我的宠物</View>
        <AtIcon value="edit" onClick={toPetList} size="22" color="#F00"></AtIcon>
      </View>
      <View className="relative w-full">
        {petList.length === 1 || petList.length === 2 ? (
          <View className="absolute right-0 top-8" onClick={toPetList}>
            <View
              className="w-6 h-6 m-auto bg-no-repeat bg-contain"
              style={{ backgroundImage: `url(${addIcon})` }}
            ></View>
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
                  {pet.id != '-1' ? (
                    <View className="w-16 bg-white h-16 rounded-full shadow-md flex items-center justify-center">
                      <Image
                        src={pet.type === 'DOG' ? defaultDogImg : defaultCatImg}
                        // src={pet.image}
                        className={`w-10 h-10 m-auto ${currentIdx === idx ? '' : 'scale-75 transform '}`}
                      />
                    </View>
                  ) : null}
                </View>
              </SwiperItem>
            ))}
          </Swiper>
          <View className="text-26 text-center flex justify-center">
            <Text className="text-red-600 font-semibold text-24 mx-2">{fakePet[currentIdx].name}</Text>

            <View
              className="w-4 h-4 mr-2"
              style={{
                backgroundImage: `url(${fakePet[currentIdx]?.gender === PetGender.Female ? femaleIcon : maleIcon})`,
              }}
            ></View>
            {fakePet[currentIdx]?.breed}
            {fakePet[currentIdx]?.age}
          </View>
        </View>
      ) : (
        <View
          onClick={toPetList}
          className="w-16 h-16 m-auto bg-no-repeat bg-contain mb-3"
          style={{ backgroundImage: `url(${addImg})` }}
        ></View>
      )}
    </View>
  )
}

export default PetList
