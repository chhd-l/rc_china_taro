import { View, Image, Button } from '@tarojs/components'
import { AtImagePicker, AtModal, AtModalAction, AtModalContent, AtSwipeAction } from 'taro-ui'
import Taro from '@tarojs/taro'
import cloneDeep from 'lodash.cloneDeep'
import { useEffect, useState } from 'react'
import EditPet from '@/components/customer/EditPet'
import { editPetButton } from '@/lib/customer'
import { deletePet } from '@/framework/api/pet/delete-pet'
import { PetListItemProps } from '@/framework/types/customer'
interface Props {
  pet: PetListItemProps
  petIdx: number
  petList: PetListItemProps[]
  setPetList: (val: PetListItemProps[]) => void
  SetshowAddPetBtn: (val: boolean) => void
  showAddPetBtn: boolean
  getList: () => void
}
const PetItem = ({ pet, petIdx, petList, setPetList, SetshowAddPetBtn, showAddPetBtn, getList }: Props) => {
  const [editActive, setEditActive] = useState<number>(-1)
  const [showDelModal, setShowDelModal] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  useEffect(() => {
    //add 的时候编辑启用
    !showAddPetBtn && petIdx === petList.length - 1 && setIsEdit(true)
  }, [showAddPetBtn])
  const handleClick = (option, idx) => {
    if (option.text == '编辑') {
      setIsEdit(true)
    } else if (option.text === '删除') {
      setShowDelModal(true)
    }
    setEditActive(idx)
  }
  const comfirmDel = async () => {
    let { id } = petList[editActive]
    await deletePet({ id })
    setShowDelModal(false)
    getList()
  }
  const showEdit = (idx) => {
    console.info('...', idx)
    if (!petList[idx].isOpened) {
      petList.forEach((pet) => {
        pet.isOpened = false
      })
    }
    petList[idx].isOpened = !petList[idx].isOpened
    setPetList(cloneDeep(petList))
  }
  const handleImage = (files, idx) => {
    petList[idx].image = files[files.length - 1].url
    setPetList(cloneDeep(petList))
  }
  return (
    <View className="m-2">
      <View className=" rounded-lg overflow-hidden">
        <AtSwipeAction
          autoClose
          onClick={(val) => {
            handleClick(val, petIdx)
          }}
          disabled={petIdx === editActive}
          isOpened={pet.isOpened}
          options={editPetButton}
          maxDistance={154}
          //   areaWidth={380}
          areaWidth={Taro.getSystemInfoSync().windowWidth}
        >
          <View
            className="text-center pt-14 pb-2 w-screen"
            onClick={() => {
              showEdit(petIdx)
            }}
          >
            {isEdit ? (
              <AtImagePicker
                className="w-20 h-20 m-auto relative"
                length={1}
                files={[{ url: pet.image }]}
                onChange={(files) => {
                  console.info('files', files)
                  // Taro.uploadFile({
                  //   url: "https://example.weixin.qq.com/upload", //仅为示例，非真实的接口地址
                  //   filePath: files[files.length - 1].url,
                  //   name: "file",
                  //   formData: {
                  //     user: "test",
                  //   },
                  //   success(res) {
                  //     const data = res.data;
                  //     console.info("upload", data);
                  //   },
                  // });
                  handleImage(files, petIdx)
                }}
              />
            ) : (
              <Image className="w-20 h-20 rounded-full m-auto border border-solid border-gray-300" src={pet.image} />
            )}
            <View className="flex justify-center">
              <View className="text-30 text-red-600 pr-3 font-medium">{pet.name}</View>
              <View className="text-26">
                {pet.type} {pet.age}
              </View>
            </View>
          </View>
        </AtSwipeAction>
      </View>
      {isEdit ? (
        <EditPet
          petList={petList}
          setPetList={setPetList}
          setIsEdit={setIsEdit}
          SetshowAddPetBtn={SetshowAddPetBtn}
          getList={getList}
          pet={pet}
        />
      ) : null}
      <AtModal isOpened={showDelModal}>
        <AtModalContent>确定删除宠物信息？</AtModalContent>
        <AtModalAction>
          <Button
            onClick={() => {
              setShowDelModal(false)
            }}
          >
            再想想
          </Button>{' '}
          <Button onClick={comfirmDel}>狠心删除</Button>{' '}
        </AtModalAction>
      </AtModal>
    </View>
  )
}
export default PetItem
