import { Swiper, SwiperItem, View, Image, Text } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { petLists } from '@/mock/pet'
import Mock from 'mockjs'
import { PetGender, PetListItemProps } from '@/framework/types/customer'
import { AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import { getPets } from '@/framework/api/pet/get-pets'
import { customerAtom } from '@/store/customer'
import { useAtom } from 'jotai'
import { getAge } from '@/utils/utils'
import { authLoginOpenedAtom } from '@/components/customer/AuthLogin'
import defaultCatImg from '@/assets/img/default.png'
import defaultDogImg from '@/assets/img/defaultdog.png'
import petBg from '@/assets/img/pet-bg.png'
import addImg from '@/assets/img/addNew.png'
import addIcon from '@/assets/img/add.png'
import './index.less'
import { femaleIcon, maleIcon } from '@/lib/constants'

const PetList = () => {
  const [petList, setPetList] = useState<PetListItemProps[]>([])
  const [customerInfo, setCustomerInfo] = useAtom(customerAtom)
  const [fakePet, setFakePet] = useState<any>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [, setAuthLoginOpened] = useAtom(authLoginOpenedAtom)

  const handleChange = (current: number) => {
    setCurrentIdx(current)
  }

  useEffect(() => {
    getList()
  }, [])

  Taro.useDidShow(() => {
    console.log(customerInfo, 'customerInfogetList')
    getList()
  })

  const getList = async () => {
    let res = (await getPets()) || []
    res.forEach((item) => {
      item.age = getAge(item.birthday)
    })
    if (res.length > 1) {
      console.log('res', res)
      setCurrentIdx(1)
    } else {
      console.log('res2', res)
      setCurrentIdx(0)
    }
    setPetList(res)
    if (res.length === 2 || res.length === 3) {
      console.log('res3', res)
      setFakePet([...res, ...res])
    } else {
      console.log('res4', res)
      setFakePet(res)
    }
  }

  // const displayMultipleItems = () => {
  //   if(petList.length <= 1 || petList.length > 3) return petList.length
  //   if(petList.length === 2) {
  //     return 2
  //   } else {
  //     return 3
  //   }
  // }

  const toPetList = () => {
    if (!Taro.getStorageSync('wxLoginRes')) {
      setAuthLoginOpened(true)
      return
    }
    Taro.navigateTo({
      url: `/pages/packageB/petList/index?petNumber=${petList.length}`,
    })
  }

  return (
    <View className="py-2 px-4 rounded-lg  bg-contain  bg-gray-100 mt-4" style={{ backgroundImage: `url(${petBg})` }}>
      <View className="flex justify-between">
        <View className="font-semibold">我的宠物</View>
        <View
          className="w-4 h-4"
          onClick={toPetList}
          style="background:url(https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/pet_edit.png);background-size: contain;"
        ></View>
        {/* <AtIcon value="edit" onClick={toPetList} size="22" color="#d33024"></AtIcon> */}
      </View>
      {fakePet.length ? (
        <View>
          <View className="w-full flex item-center">
            <Swiper
              style={{ height: '80px' }}
              className="w-full"
              circular
              displayMultipleItems={fakePet.length > 1 ? 3 : fakePet.length}
              onChange={({ detail }) => {
                let current = fakePet.length > 1 ? detail.current + 1 : detail.current
                if (current >= fakePet.length) {
                  current = 0
                }
                console.log(' current', current)
                handleChange(current)
              }}
            >
              {fakePet.map((pet, idx) => (
                <SwiperItem key={idx}>
                  <View className="text-center h-full">
                    {pet.id != '-1' ? (
                      <View
                        className={`w-16 h-16 bg-white h-full rounded-full shadow-md flex items-center justify-center  ${
                          currentIdx === idx ? '' : 'scale-75 transform '
                        }`}
                      >
                        <Image
                          src={pet.type === 'DOG' ? defaultDogImg : defaultCatImg}
                          // src={pet.image}
                          className="w-10 h-10 m-auto"
                        />
                      </View>
                    ) : null}
                  </View>
                </SwiperItem>
              ))}
            </Swiper>
            {(petList.length === 1 || petList.length === 2) && (
              <View className="w-6 h-6 m-auto" onClick={toPetList}>
                <View
                  className="w-full h-full bg-no-repeat bg-contain"
                  style={{ backgroundImage: `url(${addIcon})` }}
                ></View>
              </View>
            )}
          </View>
          <View className="text-28 text-center flex justify-center">
            <Text className="text-primary-red font-semibold text-sm mx-2">{fakePet[currentIdx].name}</Text>
            <View
              className="w-4 h-4 mr-2"
              style={{
                backgroundImage: `url(${fakePet[currentIdx]?.gender === PetGender.Female ? femaleIcon : maleIcon})`,
              }}
            ></View>
            <Text className="text-primary-red text-24">
              {fakePet[currentIdx]?.breed}
              {fakePet[currentIdx]?.age}
            </Text>
          </View>
        </View>
      ) : (
        <View
          onClick={toPetList}
          className="w-16 h-16 m-auto bg-no-repeat bg-contain mb-3"
          style={{ backgroundImage: `url(https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/pet_add_2.png)` }}
        ></View>
      )}
    </View>
  )
}

export default PetList
