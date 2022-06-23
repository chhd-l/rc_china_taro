import { PetGender, PetType } from '@/framework/types/consumer'

export const initNewPet = {
  age: '',
  id: '-1',
  name: '',
  type: PetType.Cat,
  gender: PetGender.Male,
  breed: '',
  isSterilized: false,
  birthday: '',
  image: '',
  consumerId: '20220415',
}

export const editPetButton = [
  {
    text: '编辑',
    style: {
      backgroundColor: 'rgb(254, 202, 202)',
      width: '30px',
      textAlgin: 'center',
    },
  },
  {
    text: '删除',
    style: {
      backgroundColor: 'rgb(239, 68, 68)',
      textAlgin: 'center',
      width: '50px',
    },
  },
]
