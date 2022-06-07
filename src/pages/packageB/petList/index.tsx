import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View } from '@tarojs/components'
import cloneDeep from 'lodash.cloneDeep'
import { AtButton } from 'taro-ui'
import { PetListItemProps } from '@/framework/types/customer'
import { useEffect, useState } from 'react'
import { getPets } from '@/framework/api/pet/get-pets'
import PetItem from '@/components/customer/PetItem'
import { initNewPet } from '@/lib/customer'
import { getAge } from '@/utils/utils'
import NavBar from '@/components/common/Navbar'
import './index.less'

const PetList = () => {
  const [petList, setPetList] = useState<PetListItemProps[]>([])
  const [showAddPetBtn, SetshowAddPetBtn] = useState(true)
  const { router } = getCurrentInstance()
  let petNumber = router?.params?.petNumber || '0'

  const getList = async () => {
    const customerInfo = Taro.getStorageSync('wxLoginRes').userInfo
    let res = (await getPets({ customerId: customerInfo.id })) || []
    console.log('res', res)
    res.forEach((item) => {
      item.age = getAge(item.birthday)
    })
    setPetList(res)
    SetshowAddPetBtn(true)
  }

  const addPet = () => {
    petList.push(initNewPet)
    SetshowAddPetBtn(false)
    setPetList(cloneDeep(petList))
  }

  useEffect(() => {
    if (Number(petNumber) > 0) {
      getList()
    } else {
      addPet()
    }
  }, [])

  return (
    <>
      <NavBar navbarTitle="宠物管理" isNeedBack />
      <View className="pet-list  py-2" style={{ backgroundColor: '#eee', minHeight: '100vh' }}>
        {petList.map((pet, idx) => {
          return (
            <PetItem
              showAddPetBtn={showAddPetBtn}
              key={pet.id}
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
      </View>
    </>
  )
}
export default PetList
