// import { ApiRoot } from "../../fetcher";
import { mockPetlist } from '@/framework/mock/pet'
import ApiRoot, { baseSetting } from '../fetcher'
// import ApiRoot from '@/rc-china-commerce/packages/taro/lib'
import { normalizePetsForFe } from '../lib/normalize'
import apis from '@/framework/config/api-config'

export const getBreedList = async () => {
  let params = { storeId: baseSetting.storeId }
  try {
    const breeds = await ApiRoot({ url: apis?.wx_pet }).pets().getBreeds({ body: params })
    // const breeds = mockPetlist;
    return breeds
  } catch (err) {
    return []
  }
}