// import { ApiRoot } from "../../fetcher";
import { mockPetlist } from '@/framework/mock/pet'
import ApiRoot from '../fetcher'
// import ApiRoot from '@/rc-china-commerce/packages/taro/lib'
import { normalizePetsForFe } from '../lib/normalize'

export const getPets = async ({ consumerId }) => {
  try {
    const pets = await ApiRoot().pets().getPets({ consumerId })
    // const pets = mockPetlist;
    console.info('petspetspetspets', pets)
    return pets.map((pet) => normalizePetsForFe(pet))
  } catch (err) {
    console.log(err, 'err')
  }
}
