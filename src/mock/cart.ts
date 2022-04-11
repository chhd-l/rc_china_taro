import Mock from "mockjs";

export const dataSource = [
  {
    productId: Mock.Random.id(),
    name: Mock.Random.ctitle(),
    variant: [
      {
        skuId: Mock.Random.id(),
        isOnStock: true,
        availableQuantity: 10,
        price: 83,
        image:
          "https://d2cstgstorage.z13.web.core.windows.net/fr/fr-229732-master.jpg",
        isMatchingVariant: true,
        availableForSale: true,
        tags:['适用年龄：幼龄','建议饲喂天数：1'],
        specs:'400G*3'
      },
    ],
    price: 83,
    totalPrice: 83,
    quantity: 1,
    lineItemMode: "Standard",
    select: false,
  },
];
