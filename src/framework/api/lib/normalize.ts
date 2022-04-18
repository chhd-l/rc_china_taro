import { dealDatasForApi } from "@/utils/utils";

export const normalizePetsForApi = (petInfo: any) => {
  return dealDatasForApi(petInfo, petItemApiArr, petItemFeArr);
};
export const normalizePetsForFe = (petInfo: any) => {
  let data: any = dealDatasForApi(petInfo, petItemFeArr, petItemApiArr);
  // data.birthday = moment(petInfo.birthday).format("YYYY-MM-DD");
  return data;
};

const petItemApiArr = [
  "name",
  "gender",
  "type",
  "breedCode",
  "image",
  "isSterilized",
  "birthday",
  "customerId",
  "operator",
  "id",
];
const petItemFeArr = [
  "name",
  "gender",
  "type",
  "breed",
  "image",
  "isSterilized",
  "birthday",
  "customerId",
  "operator",
  "id",
];
