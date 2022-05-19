import { atom } from 'jotai'

type PetInfoType = {
  discountPrice: number | string,
  originalPrice: number | string,
  petInfo: any[]
}
// 季卡0 半年卡1 年卡2
export const currentStepAtom = atom(0)

//宠物信息
export const petInfoAtom = atom<PetInfoType>({
  discountPrice: '',
  originalPrice: '',
  petInfo: []
})

