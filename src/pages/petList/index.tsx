import "./index.less";
import { View, Image, Button } from "@tarojs/components";
import { cloneDeep } from "lodash";
import {
  AtButton,
  AtImagePicker,
  AtModal,
  AtModalAction,
  AtModalContent,
  AtSwipeAction,
} from "taro-ui";
import {
  PetGender,
  PetListItemProps,
  PetType,
  Sterilized,
} from "@/framework/types/customer";
import { useEffect, useState } from "react";
import { getPets } from "@/framework/api/pet/get-pets";
import { initNewPet } from "@/lib/customer";
import PetItem from "@/components/customer/PetItem";
// const pets = Mock.mock(petLists).list;
// console.info("petLists", pets);
const PetList = () => {
  const [petList, setPetList] = useState<PetListItemProps[]>([]);
  const [showAddPetBtn, SetshowAddPetBtn] = useState(true);
  const getList = async () => {
    let res = (await getPets()) || [];
    setPetList(res);
    SetshowAddPetBtn(true);
    console.info("resg1111111111111111111111111111111111111111111etss", res);
  };
  useEffect(() => {
    getList();
  }, []);
  const addPet = () => {
    petList.push(initNewPet);
    SetshowAddPetBtn(false);
    setPetList(cloneDeep(petList));
  };
  return (
    <View className="pet-list bg-gray-200 py-2">
      {petList.map((pet, idx) => {
        return (
          <PetItem
            showAddPetBtn={showAddPetBtn}
            SetshowAddPetBtn={SetshowAddPetBtn}
            getList={getList}
            pet={pet}
            petIdx={idx}
            petList={petList}
            setPetList={setPetList}
          />
        );
      })}
      {showAddPetBtn ? (
        <AtButton onClick={addPet} circle type="secondary" size="small">
          {" "}
          添加宠物
        </AtButton>
      ) : null}
      {/* {!showAddPetBtn ? (
        <PetItem
          showAddPetBtn={showAddPetBtn}
          SetshowAddPetBtn={SetshowAddPetBtn}
          getList={getList}
          pet={initNewPet}
          petIdx={-1}
          petList={petList}
          setPetList={setPetList}
        />
      ) : (
        <AtButton onClick={addPet} circle type="secondary" size="small">
          {" "}
          添加宠物
        </AtButton>
      )} */}
    </View>
  );
};
export default PetList;
