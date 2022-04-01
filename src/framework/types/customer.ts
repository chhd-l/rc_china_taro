export type Address = {
  id?: string;
  receiver: string;
  phone: string;
  province: string; //省
  city: string; //市
  detail: string;
  postcode?: string;
  isDefault: number;
  country?: string;
  region: string; //区
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
