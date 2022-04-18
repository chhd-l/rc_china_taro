import ApiRoot from "../fetcher";

export const getAddresses = async ({ customerId }: { customerId: string }) => {
  try {
    const addresses = await ApiRoot.addresses().getAddresses({ customerId });
    return addresses;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const createAddress = async () => {
  try {
    const addresses = await ApiRoot.addresses().createAddress({
      body: {
        customerId: "e5edfa8c-ff05-cee0-45af-5c9e69d1b162",
        receiverName: "Zuo qin",
        phone: "13101227768",
        country: "中国",
        province: "重庆",
        city: "重庆",
        region: "渝中区",
        detail: "华盛路1号8号楼德勤大楼",
        postcode: "4000000",
        isDefault: true,
        operator: "master",
        storeId: "1",
      },
    });
    console.log(addresses);
    return addresses;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const deleteAddress = async ({ id }: { id: string }) => {
  try {
    const addresses = await ApiRoot.addresses().deleteAddress({
      id,
      operator: "system",
    });
    console.log(addresses);
    return addresses;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const updateAddress = async ({ params }: { params: any }) => {
  try {
    const addresses = await ApiRoot.addresses().updateAddress({
      body: params,
    });
    console.log(addresses);
    return addresses;
  } catch (e) {
    console.log(e);
    return [];
  }
};
