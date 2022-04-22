import { Customer } from '@/framework/types/customer'
import { atom } from 'jotai'
export const customerAtom = atom<Customer | null>(null)
