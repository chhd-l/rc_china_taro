import './index.less'
import { View } from '@tarojs/components'
import cloneDeep from 'lodash.cloneDeep'
import { AtButton } from 'taro-ui'
import { PetListItemProps } from '@/framework/types/customer'
import { useEffect, useState } from 'react'
import { getPets } from '@/framework/api/pet/get-pets'
import PetItem from '@/components/customer/PetItem'
import { initNewPet } from '@/lib/customer'
import { getCurrentInstance } from '@tarojs/taro'
// const pets = Mock.mock(petLists).list;
// console.info("petLists", pets);
const PetList = () => {
  const [petList, setPetList] = useState<PetListItemProps[]>([])
  const [showAddPetBtn, SetshowAddPetBtn] = useState(true)
  const { router } = getCurrentInstance()

  const getList = async () => {
    let res = (await getPets()) || []
    setPetList(res)
    SetshowAddPetBtn(true)
  }
  useEffect(() => {
    let petNumber = router?.params?.petNumber || '0'
    console.info('petNumber', petNumber)
    if (Number(petNumber) > 0) {
      getList()
    } else {
      addPet()
    }
  }, [])
  useEffect(() => {
    if (petList.length === 0) {
      addPet()
    }
  }, [petList.length])
  const addPet = () => {
    petList.push(initNewPet)
    SetshowAddPetBtn(false)
    setPetList(cloneDeep(petList))
  }
  return (
    <View className="pet-list bg-gray-200 py-2">
      {petList.map((pet, idx) => {
        return (
          <PetItem
            showAddPetBtn={showAddPetBtn}
            SetshowAddPetBtn={SetshowAddPetBtn}
            getList={getList}
            pet={pet}
            petIdx={idx}
            petList={petList}
            setPetList={setPetList}
          />
        )
      })}
      {showAddPetBtn ? (
        <AtButton onClick={addPet} circle type="secondary" size="small">
          {' '}
          添加宠物
        </AtButton>
      ) : null}
      {/* {!showAddPetBtn ? (
        <PetItem
          showAddPetBtn={showAddPetBtn}
          SetshowAddPetBtn={SetshowAddPetBtn}
          getList={getList}
          pet={initNewPet}
          petIdx={-1}
          petList={petList}
          setPetList={setPetList}
        />
      ) : (
        <AtButton onClick={addPet} circle type="secondary" size="small">
          {" "}
          添加宠物
        </AtButton>
      )} */}
    </View>
  )
}
export default PetList
