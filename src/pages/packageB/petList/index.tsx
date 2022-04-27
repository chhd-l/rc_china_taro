import { View } from '@tarojs/components'
import cloneDeep from 'lodash.cloneDeep'
import { AtButton } from 'taro-ui'
import { PetListItemProps } from '@/framework/types/customer'
import { useEffect, useState } from 'react'
import { getPets } from '@/framework/api/pet/get-pets'
import PetItem from '@/components/customer/PetItem'
import { initNewPet } from '@/lib/customer'
import { getCurrentInstance } from '@tarojs/taro'
import { getAge } from '@/utils/utils'
import './index.less'

// const pets = Mock.mock(petLists).list;
// console.info("petLists", pets);
const PetList = () => {
  const [petList, setPetList] = useState<PetListItemProps[]>([])
  const [showAddPetBtn, SetshowAddPetBtn] = useState(true)
  const { router } = getCurrentInstance()

  let petNumber = router?.params?.petNumber || '0'
  const getList = async () => {
    let res = (await getPets()) || []
    console.log('res', res)
    res.forEach((item) => {
      item.age = getAge(item.birthday)
    })
    setPetList(res)
    SetshowAddPetBtn(true)
  }
  useEffect(() => {
    if (Number(petNumber) > 0) {
      getList()
    } else {
      addPet()
    }
  }, [])
  // useEffect(() => {
  //   console.info('petList.length', petList.length)
  //   // 监听长度变化，如果宠物删除完了需要处理
  //   if (petList.length === 0) {
  //     addPet()
  //   }
  // }, [petList.length])
  const addPet = () => {
    petList.push(initNewPet)
    SetshowAddPetBtn(false)
    setPetList(cloneDeep(petList))
  }
  return (
    <View className="pet-list  py-2" style={{ backgroundColor: '#eee', minHeight: '100vh' }}>
      {petList.map((pet, idx) => {
        return (
          <PetItem
            showAddPetBtn={showAddPetBtn}
            key={idx}
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
        <AtButton className="mx-3 mt-4" onClick={addPet} circle type="secondary">
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
