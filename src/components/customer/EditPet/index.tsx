import {
  PetGender,
  PetListItemProps,
  PetType,
  Sterilized,
} from "@/framework/types/customer";
import { Button, Form, Input, Text, View } from "@tarojs/components";
import { useState } from "react";
import { cloneDeep } from "lodash";
import SingleChoice from "../SingleChoice";
interface EditPetProps {
  pet: PetListItemProps;
}
const typeOption = [
  { label: "喵星人", value: PetType.Cat },
  { label: "汪星人", value: PetType.Dog },
];
const genderOption = [
  { label: "公", value: PetGender.Male },
  { label: "母", value: PetGender.Female },
];
const isSterilizedOption = [
  { label: "是", value: Sterilized.Yes },
  { label: "否", value: Sterilized.No },
];
const EditPet = ({ pet }: EditPetProps) => {
  const [petInfo, setPetInfo] = useState<PetListItemProps>(cloneDeep(pet));
  const handleSave = () => {
    console.info("est", petInfo);
  };
  const handleChange = (name, value) => {
    petInfo[name] = value;
    console.info("name, value", name, value);
  };
  return (
    <View className="px-2 bg-white pt-4 shadow-inner mx-2 pb-2">
      <Form>
        <View className="">
          <SingleChoice
            label={
              <View className="col-span-4 flex items-center">
                <View className="at-icon at-icon-tag"></View>
                <Text className="pl-2 ">宠物类型</Text>
              </View>
            }
            options={genderOption}
            name="type"
            pet={petInfo}
          />
          <View className="grid grid-cols-12 text-26 py-1">
            <View className="col-span-4 flex items-center">
              <View className="at-icon at-icon-tag"></View>
              <Text className="pl-2 ">宠物昵称</Text>
            </View>
            <Input
              className="col-span-8 border border-solid border-gray-300 rounded-lg my-1 px-2 py-1"
              name="name"
              value={petInfo.name}
              onInput={(e) => {
                console.info("valuevalue", e.detail.value);
                handleChange("name", e.detail.value);
              }}
              type="text"
              placeholder="点击输入宠物名"
            />
          </View>
          <SingleChoice
            label={
              <View className="col-span-4 flex items-center">
                <View className="at-icon at-icon-tag"></View>
                <Text className="pl-2 ">宠物性别</Text>
              </View>
            }
            options={typeOption}
            name="gender"
            pet={petInfo}
          />
          <SingleChoice
            label={
              <View className="col-span-4 flex items-center">
                <View className="at-icon at-icon-tag"></View>
                <Text className="pl-2 ">是否绝育</Text>
              </View>
            }
            options={isSterilizedOption}
            name="isSterilized"
            pet={petInfo}
          />
        </View>
        <View className="text-30 my-4 flex justify-around">
          <View className="inline-block px-8 py-2 rounded-full text-gray-600 bg-gray-200">
            取消
          </View>
          <View
            onClick={handleSave}
            className="inline-block px-8 py-2 rounded-full text-white bg-red-600"
          >
            保存
          </View>
        </View>
      </Form>
    </View>
  );
};
export default EditPet;
