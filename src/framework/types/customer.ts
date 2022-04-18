export type Address = {
  id?: string;
  receiverName: string;
  phone: string;
  province: string; //省
  city: string; //市
  detail: string;
  postcode?: string;
  isDefault: number;
  country?: string;
  region: string; //区
  customerId?:string
};

export type Customer = {
  name: string;
  image: string;
  nickname: string; //昵称
  phone: string;
  level: string;
  points: number; //积分情况，小程序会显示
  lastLoginTime?: string;
  addresses: Address[];
  pets?: any[];
  orders?: any[];
};

export interface PetListItemProps {
  age: string;
  id: number;
  name: string;
  type: PetType;
  gender: PetGender;
  breed: string;
  isSterilized: Sterilized;
  birthday: string;
  image: string;
  isOpened?: boolean;
  customer: string;
}

export enum PetType {
  Dog,
  Cat,
}

export enum PetGender {
  Male,
  Female,
}

export enum Sterilized {
  Yes,
  No,
}
