import { View, Image, Button } from '@tarojs/components'
import { AtImagePicker, AtModal, AtModalAction, AtModalContent, AtSwipeAction } from 'taro-ui'
import { petBg } from '@/lib/constants'
import Taro from '@tarojs/taro'
import cloneDeep from 'lodash.cloneDeep'
import { useEffect, useState } from 'react'
import EditPet from '@/components/customer/EditPet'
import { editPetButton } from '@/lib/customer'
import { deletePet } from '@/framework/api/pet/delete-pet'
import { PetListItemProps } from '@/framework/types/customer'
import defaultCatImg from '@/assets/img/default.png'
import defaultDogImg from '@/assets/img/defaultdog.png'
import addImg from '@/assets/img/addNew.png'
// import petBg from '@/assets/img/pet-bg.png'
import './index.less'

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
  const [imgUrl, setImgUrl] = useState<string>('')
  const [item, setItem] = useState<any>(pet)
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
      petList.forEach((el) => {
        el.isOpened = false
      })
    }
    petList[idx].isOpened = !petList[idx].isOpened
    setPetList(cloneDeep(petList))
  }
  const handleImage = (files, idx) => {
    Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        Taro.uploadFile({
          url: 'https://dtc-faas-dtc-plaform-dev-woyuxzgfcv.cn-shanghai.fcapp.run/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          header: { 'Content-Type': 'multipart/form-data' },
          name: 'file',
          success(vla: any) {
            const { url } = JSON.parse(vla.data)
            setItem({
              ...item,
              image: url,
            })
            setImgUrl(url)
            //do something
          },
        })
      },
    })
  }
  return (
    <View className="my-2 mx-3">
      <View className=" rounded-lg overflow-hidden">
        {pet.id !== '-1' ? (
          <AtSwipeAction
            className="PetItem"
            autoClose
            onClick={(val) => {
              console.log('val', val)
              handleClick(val, petIdx)
            }}
            disabled={petIdx === editActive}
            isOpened={pet.isOpened}
            options={editPetButton}
            maxDistance={134}
            //   areaWidth={380}
            areaWidth={Taro.getSystemInfoSync().windowWidth}
          >
            <View
              className="text-center pt-14 pb-2 w-screen"
              style={{ backgroundImage: `url(${petBg})` }}
              onClick={() => {
                showEdit(petIdx)
              }}
            >
              {isEdit ? (
                <Image
                  className="w-20 h-20 m-auto relative"
                  src={pet.image || addImg}
                  style={{ borderRadius: '50%' }}
                  onClick={(files) => {
                    handleImage(files, petIdx)
                  }}
                />
              ) : (
                <View className="w-20 bg-white h-20 rounded-full shadow-md flex items-center justify-center m-auto">
                  <Image
                    src={pet.image || (pet.type === 'DOG' ? defaultDogImg : defaultCatImg)}
                    style={{ borderRadius: '50%' }}
                    className={`w-12 h-12 m-auto `}
                  />
                </View>
              )}
              {pet.id === '-1' ? null : (
                <View className="flex justify-center pt-3">
                  <View className="text-lg text-red-600 pr-3 font-medium">{pet.name}</View>
                  <View className="text-xs flex items-center">
                    <View className="mr-1">{pet.breed}</View>
                    <View>{pet.age}</View>
                  </View>
                </View>
              )}
            </View>
          </AtSwipeAction>
        ) : (
          <View
            className="text-center pt-14 pb-2 w-screen"
            style={{ backgroundImage: `url(${petBg})` }}
            onClick={() => {
              showEdit(petIdx)
            }}
          >
            <Image
              className="w-20 h-20 m-auto relative"
              style={{ borderRadius: '50%' }}
              // length={1}
              src={imgUrl || addImg || pet.image}
              onClick={(files) => {
                handleImage(files, petIdx)
              }}
            />
          </View>
        )}
      </View>
      {isEdit ? (
        <EditPet
          petList={petList}
          setPetList={setPetList}
          setIsEdit={setIsEdit}
          SetshowAddPetBtn={SetshowAddPetBtn}
          getList={getList}
          pet={item}
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
