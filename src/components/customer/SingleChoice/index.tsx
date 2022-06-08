import { PetGender, PetListItemProps, PetType } from '@/framework/types/customer'
import { View } from '@tarojs/components'
import { ReactNode, useEffect, useState } from 'react'
import cloneDeep from 'lodash.cloneDeep'

interface OptionProps {
  active?: boolean
  label: string
  value: PetType | PetGender | boolean
}
interface SingleChoiceProps {
  setPetInfo?: (val: PetListItemProps) => void
  label: string | ReactNode
  options: OptionProps[]
  name: string
  pet: PetListItemProps
}
const SingleChoice = ({ label, options, name, pet, setPetInfo }: SingleChoiceProps) => {
  const [optionList, setOptionList] = useState(cloneDeep(options))

  const handleChange = (item, idx) => {
    optionList.forEach((value) => {
      value.active = false
    })
    optionList[idx].active = true
    pet[name] = item.value
    if (name === 'type') {
      //切换类型清空breed
      let newPet = Object.assign({}, pet, { breed: '' })
      //  Object.assign({}, pet, { breed: '' })
      setPetInfo && setPetInfo(newPet)
    }
    setOptionList(cloneDeep(optionList))
  }

  useEffect(() => {
    optionList.forEach((item) => {
      if (item.value === pet[name]) {
        item.active = true
      }
    })
    setOptionList(cloneDeep(optionList))
    console.info(optionList, 'optionList')
  }, [])

  return (
    <View className="grid grid-cols-12 text-26 py-2">
      {label}
      <View className="col-span-8 flex">
        {optionList.map((option, idx) => (
          <View
            key={idx}
            onClick={() => {
              handleChange(option, idx)
            }}
            className={`inline-block rounded-lg flex-1 py-1 text-center border-1 border-solid   ${
              option.active ? 'border-2 border-red-600 text-red-600' : 'border-gray-300'
            } ${idx == optionList.length - 1 ? '' : 'mr-2'}`}
          >
            {option.label}
          </View>
        ))}
      </View>
    </View>
  )
}
export default SingleChoice
