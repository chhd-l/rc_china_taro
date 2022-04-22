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
  label: string | ReactNode
  options: OptionProps[]
  name: string
  pet: PetListItemProps
}
const SingleChoice = ({ label, options, name, pet }: SingleChoiceProps) => {
  const [optionList, setOptionList] = useState(cloneDeep(options))
  const handleChange = (item, idx) => {
    console.info('item, idx', item, idx)
    optionList.forEach((item) => {
      item.active = false
    })
    optionList[idx].active = true
    pet[name] = item.value
    console.info('pet', pet)
    setOptionList(cloneDeep(optionList))
  }
  useEffect(() => {
    console.info('optionList', optionList)
    console.info('petname', pet[name])
    optionList.forEach((item) => {
      if (item.value === pet[name]) {
        item.active = true
      }
    })
    setOptionList(cloneDeep(optionList))
    console.info(optionList, 'optionList')
  }, [])
  return (
    <View className="grid grid-cols-12 text-26 py-1">
      {label}
      <View className="col-span-8 flex">
        {optionList.map((option, idx) => (
          <View
            onClick={() => {
              handleChange(option, idx)
            }}
            className={`inline-block rounded-lg flex-1 py-1 text-center border border-solid   ${
              option.active ? 'border-red-600' : 'border-gray-300'
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
