import { Swiper, SwiperItem, View, Image, Text } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { PetGender, PetListItemProps } from '@/framework/types/customer'
import Taro from '@tarojs/taro'
import { femaleIcon, maleIcon, petBg } from '@/lib/constants'
import { getPets } from '@/framework/api/pet/get-pets'
import { customerAtom } from '@/store/customer'
import { useAtom } from 'jotai'
import { getAge } from '@/utils/utils'
import { authLoginOpenedAtom } from '@/components/customer/AuthLogin'
import { Dog, Cat } from '@/utils/global'
import { recommendInfoAtom } from '@/store/subscription'
import { AtIcon } from 'taro-ui'
import './index.less'

interface Props {
  showCheckBox?: boolean
  handleCheckedPet?: Function
}
const PetList = (props: Props) => {
  const [petList, setPetList] = useState<PetListItemProps[]>([])
  const [fakePet, setFakePet] = useState<any>([])
  const [, setAuthLoginOpened] = useAtom(authLoginOpenedAtom)
  const [recommendInfo, setRecommendInfo] = useAtom(recommendInfoAtom)
  const { currentIdx, checkedArr } = recommendInfo
  const customerInfos = Taro.getStorageSync('wxLoginRes').userInfo
  console.log('customerInfos', customerInfos)
  const handleChange = (current: number) => {
    setRecommendInfo({ ...recommendInfo, currentIdx: current })
  }

  useEffect(() => {
    if (customerInfos?.id) {
      getList()
    }
  }, [])

  Taro.useDidShow(() => {
    console.log(customerInfos, 'customerInfogetList')
    getList()
  })

  const getList = async () => {
    console.log('customerInfos', customerInfos)
    if (!customerInfos?.id) {
      return
    }
    let res = (await getPets({ customerId: customerInfos.id })) || []
    res.forEach((item) => {
      item.age = getAge(item.birthday)
    })
    if (res.length > 1) {
      console.log('res', res)
      setRecommendInfo({ ...recommendInfo, currentIdx: 1 })
    } else {
      console.log('res2', res)
      setRecommendInfo({ ...recommendInfo, currentIdx: 0 })
    }
    setPetList(res)
    setFakePet(res)
  }
  const handleChecked = (value, index) => {
    console.log('index', index, petList.length)
    // setCheckedArr([value])
    let pet = petList.find((el) => el.id === value)
    props.handleCheckedPet?.(pet)
    setRecommendInfo({ ...recommendInfo, recommPetInfo: pet, checkedArr: [value], currentIdx: index })
  }

  const toPetList = () => {
    if (!Taro.getStorageSync('wxLoginRes')) {
      setAuthLoginOpened(true)
      return
    }
    Taro.navigateTo({
      url: `/pages/packageB/petList/index?petNumber=${petList.length}`,
    })
  }
  const CheckBoxItem = ({ id, idx }: { id: string; idx?: number }) => {
    return props.showCheckBox ? (
      <View
        className={`w-4 h-4 check-icon absolute bottom-0 right-0 flex justify-center items-center rounded-sm ${checkedArr.includes(id) && 'bg-primary-red'
          }`}
        onClick={() => {
          handleChecked(id, idx)
        }}
      >
        <AtIcon value="check" color=" #fff"></AtIcon>
      </View>
    ) : null
  }
  const renderNoPet = () => {
    return <View
      onClick={toPetList}
      className="w-16 h-16 m-auto mb-3 bg-white flex justify-center items-center Petpictureshadow text-gray-300 mt-2 relative"
      style={{ borderRadius: '50%' }}
    // src={pet.image}
    >
      <AtIcon value="add" size={16} />
    </View>
  }
  const renderOnePet = () => {
    return <View className="box-border">
      <View className="w-full flex relative mb-2">
        <View className="text-center h-full w-full flex items-center">
          <View
            className="m-auto w-18 h-18 flex items-center bg-white rounded-full shadow-md relative"
            onClick={() => {
              handleChecked(fakePet[0].id, 0)
            }}
          >
            <Image
              src={fakePet[0].image || (fakePet[0].type === 'DOG' ? Dog : Cat)}
              // src={pet.image}
              style={{ borderRadius: '50%' }}
              className="w-full h-full m-auto Petpictureshadow"
            />
            <CheckBoxItem id={fakePet[0].id} idx={0} />
          </View>
        </View>
        <View
          style={{ top: '50%', transform: 'translateY(-50%)' }}
          className="w-6 h-6 m-auto absolute right-0"
          onClick={toPetList}
        >
          <View
            className="w-full h-full bg-no-repeat bg-contain"
            style={{
              backgroundImage: `url(https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/small_add.svg)`,
              backgroundColor: '#fff',
              borderRadius: '50%',
              boxShadow: '-0.5px 0.5px 22px 0px #999',
            }}
          />
        </View>
      </View>
      <View className="text-center flex justify-center items-center">
        <Text className="text-primary-red font-semibold text-lg mx-2">{fakePet[currentIdx]?.name}</Text>
        <View
          className="w-3 h-3 mr-4  bg-contain"
          style={{
            backgroundImage: `url(${fakePet[currentIdx]?.gender === PetGender.Female ? femaleIcon : maleIcon})`,
          }}
        ></View>
        <Text className=" text-22 bg-white">
          {fakePet[currentIdx]?.breed}
          <Text className=" ml-1">{` ${fakePet[currentIdx]?.age}`}</Text>
        </Text>
      </View>
    </View>
  }
  const renderTwoPet = () => {
    return (
      <View className="box-border">
        <View className="w-full flex items-center mb-2">
          <Swiper
            style={{ height: '80px' }}
            className="w-72 flex items-center"
            circular
            nextMargin="180rpx"
            previousMargin="160rpx"
            current={currentIdx}
            onChange={({ detail }) => handleChange(detail.current)}
          >
            {fakePet.map((pet, idx: number) => {
              return (
                <SwiperItem key={idx}>
                  <View className="text-center h-full flex items-center justify-center">

                    <View
                      className={`w-16  bg-white h-16 rounded-full shadow-md flex items-center justify-center relative 
                    ${currentIdx !== idx && 'scale-75 transform'}`}
                      onClick={() => {
                        handleChecked(pet.id, idx)
                      }}
                    >
                      <Image
                        src={pet.image || (pet.type === 'DOG' ? Dog : Cat)}
                        style={{ borderRadius: '50%' }}
                        // src={pet.image}
                        className="w-full h-full m-auto Petpictureshadow"
                      />
                      <CheckBoxItem id={pet.id} idx={idx} />
                      <View className="hidden">
                        idx:{idx}
                        currentIdx:{currentIdx}
                      </View>
                    </View>

                  </View>
                </SwiperItem>
              )
            })}
          </Swiper>
          <View className="w-6 h-6 m-auto" onClick={toPetList}>
            <View
              className="w-full h-full bg-no-repeat bg-contain"
              style={{
                backgroundImage: `url(https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/small_add.svg)`,
                backgroundColor: '#fff',
                borderRadius: '50%',
                boxShadow: '-0.5px 0.5px 22px 0px #999',
              }}
            />
          </View>
        </View>
        <View className="text-center flex justify-center items-center">
          <Text className="text-primary-red font-semibold text-lg mx-2">{fakePet[currentIdx]?.name}</Text>
          <View
            className="w-3 h-3 mr-4  bg-contain"
            style={{
              backgroundImage: `url(${fakePet[currentIdx]?.gender === PetGender.Female ? femaleIcon : maleIcon})`,
            }}
          ></View>
          <Text className=" text-22 bg-white">
            {fakePet[currentIdx]?.breed}
            <Text className=" ml-1">{` ${fakePet[currentIdx]?.age}`}</Text>
          </Text>
        </View>
      </View>
    )
  }

  const renderGreaterThanOrEqualThreePet = () => {
    return (
      <View className="box-border">
        <View className="w-full flex items-center mb-2">
          <Swiper
            style={{ height: '80px' }}
            className="w-full flex items-center"
            circular
            // displayMultipleItems={fakePet.length > 1 ? 3 : fakePet.length}
            nextMargin="200rpx"
            previousMargin="200rpx"
            current={currentIdx}
            onChange={({ detail }) => handleChange(detail.current)}
          >
            {fakePet.map((pet, idx: number) => {
              return (
                <SwiperItem key={idx}>
                  <View className="text-center h-full flex items-center justify-center">
                    {pet.id != '-1' ? (
                      <View
                        className={`w-16  bg-white h-16 rounded-full shadow-md flex items-center justify-center relative 
                  ${currentIdx !== idx && 'scale-75 transform'} `}
                        onClick={() => {
                          handleChecked(pet.id, idx)
                        }}
                      >
                        <Image
                          src={pet.image || (pet.type === 'DOG' ? Dog : Cat)}
                          style={{ borderRadius: '50%' }}
                          // src={pet.image}
                          className="w-full h-full m-auto Petpictureshadow"
                        />
                        <CheckBoxItem id={pet.id} idx={idx} />
                        <View className="hidden">
                          idx:{idx}
                          currentIdx:{currentIdx}
                        </View>
                      </View>
                    ) : null}
                  </View>
                </SwiperItem>
              )
            })}
          </Swiper>
          <View className="w-6 h-6 m-auto" onClick={toPetList}>
            <View
              className="w-full h-full bg-no-repeat bg-contain"
              style={{
                backgroundImage: `url(https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/small_add.svg)`,
                backgroundColor: '#fff',
                borderRadius: '50%',
                boxShadow: '-0.5px 0.5px 22px 0px #999',
              }}
            />
          </View>
        </View>
        <View className="text-center flex justify-center items-center">
          <Text className="text-primary-red font-semibold text-lg mx-2">{fakePet[currentIdx]?.name}</Text>
          <View
            className="w-3 h-3 mr-4  bg-contain"
            style={{
              backgroundImage: `url(${fakePet[currentIdx]?.gender === PetGender.Female ? femaleIcon : maleIcon})`,
            }}
          ></View>
          <Text className=" text-22 bg-white">
            {fakePet[currentIdx]?.breed}
            <Text className=" ml-1">{` ${fakePet[currentIdx]?.age}`}</Text>
          </Text>
        </View>
      </View>
    )
  }
  const renderPetContent = () => {
    console.log('fakePet.length ', fakePet.length)
    if (!fakePet.length) return renderNoPet()
    if (fakePet.length === 1) return renderOnePet()
    if (fakePet.length === 2) return renderTwoPet()
    return renderGreaterThanOrEqualThreePet()
  }

  return (
    <View
      className="box-border py-3 px-4 rounded-lg  bg-contain  bg-gray-100 mt-4 PetListMy"
      style={{
        backgroundImage: `url(${petBg})`,
      }}
    >
      <View className="flex justify-between">
        <View className="font-semibold">我的宠物</View>
        <View className="w-4 h-4 bgacIImg" onClick={toPetList}></View>
      </View>
      {renderPetContent()}
    </View>
  )
}

export default PetList
