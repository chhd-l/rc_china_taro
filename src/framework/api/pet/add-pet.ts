import { mockPetlist } from '@/framework/mock/pet'
import { PetItemSchema } from '@/framework/schema/pet.schema'
import ApiRoot from '../fetcher'
import { normalizePetsForApi } from '../lib/normalize'

export const addPet = async (petInfo) => {
  let params: Omit<PetItemSchema, 'id'> = normalizePetsForApi(petInfo)
  // delete params.id
  console.info('addPet params', params)
  try {
    // const pets = mockPetlist.push(params);
    const pets = await ApiRoot().pets().createPet({ body: params })
    return pets
  } catch (err) {
    console.log(err)
  }
}
