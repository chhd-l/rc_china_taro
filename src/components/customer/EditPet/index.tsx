import { PetGender, PetListItemProps, PetType } from '@/framework/types/customer'
import { Form, Input, Picker, Text, View } from '@tarojs/components'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import { addPet } from '@/framework/api/pet/add-pet'
import { AtIcon, AtList, AtListItem, AtToast } from 'taro-ui'
import { updatePet } from '@/framework/api/pet/update-pet'
import birthdayIcon from '@/assets/icons/pet/birthday.png'
import breedIcon from '@/assets/icons/pet/breed.png'
import genderIcon from '@/assets/icons/pet/gender.png'
import nicknameIcon from '@/assets/icons/pet/nickname.png'
import sterilizedIcon from '@/assets/icons/pet/sterilized.png'
import cloneDeep from 'lodash.cloneDeep'
import SingleChoice from '../SingleChoice'
import './index.less'

interface EditPetProps {
  pet: PetListItemProps
  getList: () => void
  SetshowAddPetBtn: (val: boolean) => void
  setIsEdit: (val: boolean) => void
  petList: PetListItemProps[]
  setPetList: (val: PetListItemProps[]) => void
  petItem: PetListItemProps
}
const typeOption = [
  { label: '喵星人', value: PetType.Cat },
  { label: '汪星人', value: PetType.Dog },
]
const genderOption = [
  { label: '公', value: PetGender.Male },
  { label: '母', value: PetGender.Female },
]
const isSterilizedOption = [
  { label: '是', value: true },
  { label: '否', value: false },
]
const EditPet = ({ pet, petItem, getList, SetshowAddPetBtn, setIsEdit, petList, setPetList }: EditPetProps) => {
  const [petInfo, setPetInfo] = useState<PetListItemProps>(cloneDeep(pet))
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleSave = async () => {
    console.info('petInfo', petInfo)
    if (!petInfo.name || !petInfo.breed || !petInfo.birthday) {
      setIsOpen(true)
      return
    }
    if (petInfo.id === '-1') {
      await addPet(petInfo)
    } else {
      await updatePet(petInfo, petItem)
    }
    getList()
    handleCancel()
  }
  const handleChange = (name, value) => {
    petInfo[name] = value
  }
  const handleChangeDate = (e) => {
    petInfo.birthday = e.detail.value
    setPetInfo(cloneDeep(petInfo))
  }
  const handleBreed = () => {
    Taro.navigateTo({
      url: `/pages/packageB/breedList/index?type=${petInfo.type}`,
      events: {
        seachBreed: function ({ breed, code }) {
          console.log('返回的数据---', breed, code)
          let newPetInfo = Object.assign({}, petInfo, { breed, code })
          setPetInfo(newPetInfo)
        },
      },
    })
  }
  const handleCancel = () => {
    SetshowAddPetBtn(true) // add
    if (petInfo.id === '-1') {
      if (petList.length === 1) {
        Taro.switchTab({
          url: '/pages/account/index',
        })
        return
      }
      petList.pop()
      setPetList(cloneDeep(petList))
    }
    setIsEdit(false) //edit
  }
  return (
    <View className="px-2 bg-white edit-pet pt-4 shadow-inner mx-3 pb-2">
      <Form>
        <View className="">
          <SingleChoice
            label={
              <View className="col-span-4 flex items-center">
                <View
                  className="w-4 h-4 bg-contain bg-no-repeat"
                  style={{
                    backgroundImage: 'url(https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/pet_type.png)',
                  }}
                ></View>
                <Text className="pl-2 ">宠物类型</Text>
              </View>
            }
            setPetInfo={setPetInfo}
            options={typeOption}
            name="type"
            pet={petInfo}
          />
          <View className="grid grid-cols-12 text-26 py-2">
            <View className="col-span-4 flex items-center">
              <View
                className="w-4 h-4 bg-contain bg-no-repeat"
                style={{ backgroundImage: `url(${nicknameIcon})` }}
              ></View>
              <Text className="pl-2 ">宠物昵称</Text>
            </View>
            <Input
              className="col-span-8 border border-solid border-gray-300 rounded-lg my-1 px-2 py-1"
              name="name"
              value={petInfo.name}
              onBlur={(e) => {
                console.info('valuevalue', e.detail.value)
                handleChange('name', e.detail.value)
              }}
              type="text"
              placeholder="点击输入宠物名"
            />
          </View>
          <View className="grid grid-cols-12 text-26 py-2 relative">
            <View className="col-span-4 flex items-center">
              <View className="w-4 h-4 bg-contain" style={{ backgroundImage: `url(${breedIcon})` }}></View>
              <Text className="pl-2 ">宠物品种</Text>
            </View>
            <Input
              className="col-span-8 border border-solid border-gray-300 rounded-lg my-1 px-2 py-1"
              name="breed"
              value={petInfo.breed}
              disabled
              onClick={handleBreed}
              // onInput={(e) => {
              //   console.info("valuevalue", e.detail.value);
              //   handleChange("breed", e.detail.value);
              // }}
              type="text"
              placeholder="点击选择宠物品种"
            />
            <AtIcon
              value="chevron-down"
              size="24"
              color="#d33024"
              className="right-1 absolute"
              customStyle={{ transform: 'translateY(-50%)', top: '50%' }}
            ></AtIcon>
          </View>
          <SingleChoice
            label={
              <View className="col-span-4 flex items-center">
                <View className="w-4 h-4 bg-contain" style={{ backgroundImage: `url(${genderIcon})` }}></View>
                <Text className="pl-2 ">宠物性别</Text>
              </View>
            }
            options={genderOption}
            name="gender"
            pet={petInfo}
          />
          <SingleChoice
            label={
              <View className="col-span-4 flex items-center">
                <View className="w-4 h-4 bg-contain" style={{ backgroundImage: `url(${sterilizedIcon})` }}></View>
                <Text className="pl-2 ">是否绝育</Text>
              </View>
            }
            options={isSterilizedOption}
            name="isSterilized"
            pet={petInfo}
          />
          <View className="date-item border-0 grid grid-cols-12 text-26 relative">
            <View className="col-span-4 flex items-center  py-2">
              <View className="w-4 h-4 bg-contain" style={{ backgroundImage: `url(${birthdayIcon})` }}></View>
              <Text className="pl-2 ">宠物生日</Text>
            </View>
            {/* <View className="w-4 h-4 bg-contain" style={{ backgroundImage: `url(${birthdayIcon})` }}></View> */}
            <View className="col-span-8 border border-solid h-8 border-gray-300 rounded-lg my-1 px-2">
              <Picker
                style={{ border: 0 }}
                mode="date"
                className="flex-1 PickerItem"
                end={new Date().toLocaleString().split(' ')[0].replace(/\//g, '-')}
                onChange={handleChangeDate}
              >
                <AtList>
                  <AtListItem title="" extraText={petInfo.birthday} />
                </AtList>
              </Picker>
            </View>
            <AtIcon
              value="chevron-down"
              size="24"
              color="#d33024"
              className="right-1 absolute"
              customStyle={{ transform: 'translateY(-50%)', top: '50%' }}
            ></AtIcon>
          </View>
        </View>
        <View className="text-30 my-4 flex justify-around">
          <View
            onClick={() => {
              handleCancel()
            }}
            className="inline-block px-8 py-2 rounded-full text-gray-600 bg-gray-200"
          >
            取消
          </View>
          <View onClick={handleSave} className="inline-block px-8 py-2 rounded-full text-white bg-red-600">
            保存
          </View>
        </View>
      </Form>
      <AtToast
        isOpened={isOpen}
        duration={1200}
        text="请填写宠物完整信息"
        icon="close"
        onClose={() => setIsOpen(false)}
      />
    </View>
  )
}
export default EditPet
