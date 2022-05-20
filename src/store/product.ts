import { SkuItemProps } from '@/framework/types/products'
import { atom } from 'jotai'
// 当前商品spu在购物车的集合
export const currentCartSpuAtom = atom<any[]>([])
