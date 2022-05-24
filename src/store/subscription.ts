import { atom } from 'jotai'

type PetInfoType = {
  discountPrice: number | string,
  originalPrice: number | string,
  recommPetInfo: any,
  couponList: any[],
  goodsList: any[],
  giftList: any[]
}
// 季卡0 半年卡1 年卡2
export const currentStepAtom = atom(0)

//宠物信息
export const petInfoAtom = atom<PetInfoType>({
  discountPrice: '',
  originalPrice: '',
  recommPetInfo: {},
  couponList: [],
  goodsList: [],
  giftList: []
})

