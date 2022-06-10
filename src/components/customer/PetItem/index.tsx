import { View, Image, Button } from '@tarojs/components'
import { AtIcon, AtModal, AtModalAction, AtModalContent, AtSwipeAction } from 'taro-ui'
import { Cat, Dog, petBg, UPLOADPATH } from '@/lib/constants'
import Taro from '@tarojs/taro'
import cloneDeep from 'lodash.cloneDeep'
import { useEffect, useState } from 'react'
import EditPet from '@/components/customer/EditPet'
import { editPetButton } from '@/lib/customer'
import { deletePet } from '@/framework/api/pet/delete-pet'
import { PetListItemProps } from '@/framework/types/customer'
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
  const [imgUrl, setImgUrl] = useState<string>(pet.image)
  const [item, setItem] = useState<any>(pet)
  const [showDelModal, setShowDelModal] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  useEffect(() => {
    //add 的时候编辑启用
    console.log('pet', pet)
    !showAddPetBtn && petIdx === petList.length - 1 && setIsEdit(true)
  }, [showAddPetBtn, isEdit])

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

  const handleImage = () => {
    Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        Taro.uploadFile({
          url: UPLOADPATH, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          header: { 'Content-Type': 'multipart/form-data' },
          name: 'file',
          success(vla: any) {
            const { url } = JSON.parse(vla.data)
            console.log('url', url)
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
      <View className=" rounded-lg overflow-hidden relative" style={{ zIndex: 1 }}>
        {pet.id !== '-1' ? (
          isEdit ? (
            <View
              className="text-center pt-14 pb-2 w-screen bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${petBg})` }}
              onClick={() => {
                showEdit(petIdx)
              }}
            >
              <View
                className={`w-22 ${
                  pet.image ? ' bg-white   image-pad shadow-little' : ''
                } h-22 rounded-full  flex items-center justify-center m-auto `}
              >
                <Image
                  className={`w-full h-full  rounded-full`}
                  src={imgUrl || pet.image || (pet.type === 'DOG' ? Dog : Cat)}
                  // style={{ borderRadius: '50%' }}
                  onClick={() => {
                    handleImage()
                  }}
                />
              </View>
            </View>
          ) : (
            // 宠物列表
            <AtSwipeAction
              className="PetItem"
              autoClose
              onClick={(val) => {
                console.log('val', val)
                handleClick(val, petIdx)
              }}
              onOpened={() => {
                showEdit(petIdx)
              }}
              disabled={isEdit}
              isOpened={pet.isOpened}
              options={editPetButton}
              maxDistance={175}
              areaWidth={Taro.getSystemInfoSync().windowWidth}
            >
              <View
                className="text-center pt-14 pb-2 w-screen bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${petBg})` }}
                onClick={() => {
                  showEdit(petIdx)
                }}
              >
                <View
                  className={`w-22 ${
                    pet.image ? ' bg-white   image-pad shadow-little' : ''
                  } h-22 rounded-full  flex items-center justify-center m-auto `}
                >
                  <Image
                    src={pet.image || (pet.type === 'DOG' ? Dog : Cat)}
                    // style={{ borderRadius: '50%' }}
                    className="w-full h-full m-auto Petpictureshadow rounded-full"
                  />
                </View>
                <View className="flex justify-center pt-3">
                  <View className="text-lg text-red-600 pr-3 font-medium">{pet.name}</View>
                  <View className="text-xs flex items-center">
                    <View className="mr-1">{pet.breed}</View>
                    <View>{pet.age}</View>
                  </View>
                </View>
              </View>
            </AtSwipeAction>
          )
        ) : (
          // 新增
          <View
            className="text-center py-8 w-screen z-50 bg-cover"
            style={{ backgroundImage: `url(${petBg})` }}
            onClick={() => {
              showEdit(petIdx)
            }}
          >
            {imgUrl ? (
              <View
                className="w-22 h-22 m-auto relative rounded-full image-pad shadow-little"
                // style={{ borderRadius: '50%' }}
              >
                <Image
                  className="w-full h-full rounded-full"
                  src={imgUrl}
                  // style={{ borderRadius: '50%' }}
                  onClick={() => {
                    handleImage()
                  }}
                />
              </View>
            ) : (
              <View
                style={{
                  backgroundImage: `url(https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/Pet_Add.png)`,
                }}
                className="w-22 h-22 m-auto mb-3 rounded-full   bg-no-repeat  bg-contain flex justify-center items-center Petpictureshadow text-gray-300 mt-2"
                // src={pet.image}
                onClick={() => {
                  handleImage()
                }}
              >
                {/* <AtIcon value="add" size={16} /> */}
              </View>
            )}
            {/* <Image
              className="w-24 h-24 m-auto relative"
              src={imgUrl}
              style={{ borderRadius: '50%' }}
              onClick={(files) => {
                handleImage(files, petIdx)
              }}
            />
            <View
              className="w-16 h-16 m-auto mb-3 bg-white flex justify-center items-center Petpictureshadow text-gray-300 mt-2"
              style={{ borderRadius: '50%' }}
            // src={pet.image}
            >
              <AtIcon value="add" size={16} />
            </View> */}
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
          petItem={item}
          pet={pet}
        />
      ) : null}
      <AtModal
        key="shipnow"
        isOpened={showDelModal}
        title="提示"
        content="确定删除宠物信息？"
        confirmText="狠心删除"
        cancelText="再想想"
        onClose={() => {
          setShowDelModal(false)
        }}
        onCancel={() => {
          setShowDelModal(false)
        }}
        onConfirm={comfirmDel}
        className="rc_modal"
      />
      {/* <AtModal isOpened={showDelModal}>
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
      </AtModal> */}
    </View>
  )
}
export default PetItem
