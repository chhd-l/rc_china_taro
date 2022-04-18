import { PetGender, PetType, Sterilized } from "@/framework/types/customer";
export const initNewPet = {
  age: "",
  id: "-1",
  name: "",
  type: PetType.Cat,
  gender: PetGender.Male,
  breed: "",
  isSterilized: false,
  birthday: new Date(),
  image: "http://dummyimage.com/100x100",
  customerId: "20220415",
};

export const editPetButton = [
  {
    text: "编辑",
    style: {
      backgroundColor: "rgb(254, 202, 202)",
    },
  },
  {
    text: "删除",
    style: {
      backgroundColor: "rgb(239, 68, 68)",
    },
  },
];
