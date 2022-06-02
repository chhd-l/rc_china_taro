import { atom } from 'jotai'

type RecommendInfoType = {
  recommPetInfo: any;
  couponList: any[];
  goodsList: any[];
  giftList: any[]
  currentIdx: number;
  checkedArr: string[];
}

type RecommendProductType = {
  goodsVariantInfo?: any;
  cycleList?: any[];
  quantity?: number;
  giftList: any[];
  cycle?: any;
  freshType: string;
  couponList: any[];
  cardType: number
  subscriptionRecommendRuleId?: string;
  discountPrice: number | string;
  originalPrice: number | string;
}

type DeliveryDetailType = {
  nextDeliveryTime: string;
  completedDeliveries: any[];
  no: string
}
// 季卡0 半年卡1 年卡2
export const currentStepAtom = atom(0)

//宠物信息、推荐商品信息
export const recommendInfoAtom = atom<RecommendInfoType>({
  recommPetInfo: {},
  couponList: [],
  goodsList: [],
  giftList: [],
  currentIdx: 0,
  checkedArr: []
})

// 当前推荐商品
export const recommendProductAtom = atom<RecommendProductType>({
  giftList: [],
  couponList: [],
  cardType: 0,
  freshType: 'FRESH_NORMAL',
  discountPrice: '',
  originalPrice: '',
  goodsVariantInfo: {
    goodsVariants: {}, goodsAttributeValueRel: [], goodsAsserts: {}, goodsName: ''
  }
})

export const deliveryDetailAtom = atom<any>({
  nextDeliveryTime: '',
  completedDeliveries: [],
  no: ''
  // giftList: [],
  // couponList: [],
  // freshType: 'FRESH_NORMAL',
})