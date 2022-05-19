import { atom } from 'jotai'

// 季卡0 半年卡1 年卡2
export const currentStepAtom = atom(0)

//折后价
export const discountPriceAtom = atom('')