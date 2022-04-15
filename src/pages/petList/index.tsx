import Mock from "mockjs";
import "./index.less";
import { petLists } from "@/mock/pet";
import { View, Image } from "@tarojs/components";
import { AtButton, AtSwipeAction } from "taro-ui";
import {
  PetGender,
  PetListItemProps,
  PetType,
  Sterilized,
} from "@/framework/types/customer";
import Taro from "@tarojs/taro";
import cloneDeep from "lodash.cloneDeep";
import { useState } from "react";
import EditPet from "@/components/customer/EditPet";
import { editPetButton } from "@/lib/product";
const pets = Mock.mock(petLists).list;
console.info("petLists", pets);
const PetList = () => {
  const [petList, setPetList] = useState<PetListItemProps[]>(pets);
  const [editActive, setEditActive] = useState<number>(-1);

  const handleClick = (option, idx) => {
    if (option.text == "编辑") {
      setEditActive(idx);
    }
    console.info("...", option);
  };
  const showEdit = (idx) => {
    console.info("...", idx);
    if (!petList[idx].isOpened) {
      petList.forEach((pet) => {
        pet.isOpened = false;
      });
    }
    petList[idx].isOpened = !petList[idx].isOpened;
    setPetList(cloneDeep(petList));
  };
  const addPet = () => {
    petList.push({
      age: "",
      id: -1,
      name: "",
      type: PetType.Cat,
      gender: PetGender.Male,
      breed: "",
      isSterilized: Sterilized.No,
      birthday: "",
      image: "",
      customer: "",
    });
    setPetList(cloneDeep(petList));
    setEditActive(petList.length - 1);
  };
  console.info(
    "Taro.getSystemInfoSync().windowWidth",
    Taro.getSystemInfoSync().windowWidth
  );
  return (
    <View className="pet-list bg-gray-200 py-2">
      {petList.map((pet, idx) => {
        return (
          <View className="m-2">
            <View className=" rounded-lg overflow-hidden">
              <AtSwipeAction
                autoClose
                onClick={(val) => {
                  handleClick(val, idx);
                }}
                isOpened={pet.isOpened}
                options={editPetButton}
                maxDistance={154}
                //   areaWidth={380}
                areaWidth={Taro.getSystemInfoSync().windowWidth}
              >
                <View
                  className="text-center pt-14 pb-2 w-screen"
                  onClick={() => {
                    showEdit(idx);
                  }}
                >
                  <Image
                    className="w-20 h-20 rounded-full m-auto border border-solid border-gray-300"
                    src={pet.image}
                  />
                  <View className="flex justify-center">
                    <View className="text-30 text-red-600 pr-3 font-medium">
                      {pet.name}
                    </View>
                    <View className="text-26">
                      {pet.type} {pet.age}
                    </View>
                  </View>
                </View>
              </AtSwipeAction>
            </View>
            {idx === editActive ? <EditPet pet={pet} /> : null}
          </View>
        );
      })}
      <AtButton onClick={addPet} circle type="secondary" size="small">
        添加宠物
      </AtButton>
    </View>
  );
};
export default PetList;
