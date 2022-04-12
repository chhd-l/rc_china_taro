import {
  PetGender,
  PetListItemProps,
  PetType,
  Sterilized,
} from "@/framework/types/customer";
import { View } from "@tarojs/components";
import { ReactNode, useState } from "react";
import { cloneDeep } from "lodash";
interface OptionProps {
  active?: boolean;
  label: string;
  value: PetType | PetGender | Sterilized;
}
interface SingleChoiceProps {
  label: string | ReactNode;
  options: OptionProps[];
  name: string;
  pet: PetListItemProps;
}
const SingleChoice = ({ label, options, name, pet }: SingleChoiceProps) => {
  const [optionList, setOptionList] = useState(cloneDeep(options));
  const handleChange = (item, idx) => {
    console.info("item, idx", item, idx);
    optionList.forEach((item) => {
      item.active = false;
    });
    optionList[idx].active = true;
    setOptionList(cloneDeep(optionList));
    pet[name] = item.value;
  };
  return (
    <View className="grid grid-cols-12 text-26 py-1">
      {label}
      <View className="col-span-8 flex">
        {optionList.map((option, idx) => (
          <View
            onClick={() => {
              handleChange(option, idx);
            }}
            className={`inline-block rounded-lg flex-1 py-1 text-center border border-solid   ${
              option.active ? "border-red-600" : "border-gray-300"
            } ${idx == optionList.length - 1 ? "" : "mr-2"}`}
          >
            {option.label}
          </View>
        ))}
      </View>
    </View>
  );
};
export default SingleChoice;
