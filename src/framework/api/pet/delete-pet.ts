import { mockPetlist } from '@/framework/mock/pet'
import ApiRoot from '../fetcher'

export const deletePet = async ({ id }) => {
  console.info('params', id)
  // mockPetlist.forEach((el, index) => {
  //   if (el.id === id) {
  //     mockPetlist.splice(index, 1);
  //   }
  // });
  try {
    return await ApiRoot.pets().deletePet({ id })
    return true
  } catch (err) {
    console.log(err)
  }
}
