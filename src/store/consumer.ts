import { Consumer } from '@/framework/types/consumer'
import { atom } from 'jotai'

export const consumerAtom = atom<Consumer | null>(null)
export const cartSunccessToastShowAtom = atom(false)
