import { mockPetlist } from '@/framework/mock/pet'
import { PetItemSchema } from '@/framework/schema/pet.schema'
import ApiRoot from '../fetcher'
import { normalizePetsForApi } from '../lib/normalize'
import apis from '@/framework/config/api-config'

export const addPet = async (petInfo) => {
  let params: any = normalizePetsForApi(petInfo)
  // delete params.id
  console.info('addPet params', params)
  try {
    // const pets = mockPetlist.push(params);
    const pets = await ApiRoot({ url: apis.wx_pet }).pets().createPet({ body: params })
    return pets
  } catch (err) {
    console.log(err)
  }
}
