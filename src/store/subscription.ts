import { atom } from 'jotai'

type RecommendInfoType = {
  discountPrice: number | string;
  originalPrice: number | string;
  recommPetInfo: any;
  couponList: any[];
  goodsList: any[];
  giftList: any[]
}

type RecommendProductType = {
  goodsVariantInfo?: any;
  cycleList?: any[];
  quantity?: number;
  giftList: any[];
  cycle?: string;
  freshType: string;
  couponList: any[]
}

// type PetInfoType={

// }
// 季卡0 半年卡1 年卡2
export const currentStepAtom = atom(0)

//宠物信息、推荐商品信息
export const recommendInfoAtom = atom<RecommendInfoType>({
  discountPrice: '',
  originalPrice: '',
  recommPetInfo: {},
  couponList: [],
  goodsList: [],
  giftList: []
})

// 当前推荐商品
export const recommendProductAtom = atom<RecommendProductType>({
  giftList: [],
  couponList: [],
  freshType: 'FRESH_NORMAL'
})

