import { atom } from 'jotai'

type priceAtomType = {
  discountPrice: number | string,
  originalPrice: number | string
}
// 季卡0 半年卡1 年卡2
export const currentStepAtom = atom(0)

//折后价
export const priceAtom = atom<priceAtomType>({
  discountPrice: '',
  originalPrice: '',
})