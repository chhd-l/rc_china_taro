// import { ApiRoot } from "../../fetcher";
import { mockPetlist } from '@/framework/mock/pet'
import ApiRoot, { baseSetting } from '../fetcher'
// import ApiRoot from '@/rc-china-commerce/packages/taro/lib'
import { normalizePetsForFe } from '../lib/normalize'

export const getBreedList = async () => {
  let params = { storeId: baseSetting.storeId }
  try {
    const { breeds } = await ApiRoot.pets().getBreeds({ body: params })
    // const breeds = mockPetlist;
    return breeds
  } catch (err) {
    return []
  }
}

export const getSortedBreeds = async (param?: any) => {
  let params: any = { storeId: baseSetting.storeId }
  if (param?.type) {
    params.type = param.type
  }
  try {
    const { breedsSortedByPy } = await ApiRoot.pets().getSortedBreeds({ body: params })
    // const breeds = mockPetlist;
    console.info('breedsSortedByPy', breedsSortedByPy)
    return breedsSortedByPy || []
  } catch (err) {
    return []
  }
}

