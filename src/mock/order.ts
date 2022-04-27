export const orderDetailMockData = {
  _id: 'O1650790904488',
  orderNumber: 'O1650790904488',
  version: null,
  lineItem: [
    {
      id: '4fe8c1e3-0ca2-6551-b859-e5e5e3fe4473',
      skuNo: '20010201',
      spuNo: '2001020',
      skuName: '离乳期幼猫全价猫奶糕',
      spuName: '离乳期幼猫全价猫奶糕',
      goodsSpecifications: '2KG',
      pic: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1632987707399_z7bUuS.png',
      price: 170,
      num: 4,
      goodsAttributeAndValues: [
        {
          attributeName: 'Age',
          attributeNameEn: 'Age',
          attributeValueName: '<4月龄',
          attributeValueNameEn: '<4 months old',
          relId: 'c62b9356-bd86-92ff-c831-bde8055b88fa',
          attributeId: 'a7ddacc3-c36f-a8a0-d54f-9cb4395b1a02',
          attributeValueId: '05325edb-111b-ce6a-8d72-f95bb11e',
          goodsId: '2be89f55-584f-7c3b-6b4d-76119dfcbe25',
        },
      ],
      feedingDays: 45,
    },
    {
      id: '96cead92-5be4-4c0e-da19-07ce8e963833',
      skuNo: '20030200F071',
      spuNo: '20010200',
      skuName: '离乳期幼猫全价猫奶糕',
      spuName: '离乳期幼猫全价猫奶糕',
      goodsSpecifications: '幼猫粮2KG',
      pic: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1618476680557_qTbFsC.jpg',
      price: 188,
      num: 2,
      goodsAttributeAndValues: [
        {
          attributeName: 'Age',
          attributeNameEn: 'Age',
          attributeValueName: '4-12月龄',
          attributeValueNameEn: '4-12 months old',
          relId: '6222556f-7d33-7844-353e-b28969bbc448',
          attributeId: 'a7ddacc3-c36f-a8a0-d54f-9cb4395b1a02',
          attributeValueId: '4a0e8b24-4c40-ab19-8c31-2b910bb1',
          goodsId: 'bc0d8dd6-fd3c-3512-6422-75d2ceeb2f70',
        },
      ],
      feedingDays: 40,
    },
  ],
  shippingAddress: {
    id: '001',
    customerId: null,
    receiverName: null,
    phone: '020-81167888',
    country: null,
    province: '广东省',
    city: '广州市',
    region: '海珠区',
    detail: '新港中路397号',
    postcode: '510000',
    isDefault: null,
  },
  payInfo: {
    payWayCode: '',
    payWayOrderID: '',
    amount: '',
    payStartTime: '',
    payFinishTime: '',
    lastModifiedBy: '',
    paymentState: '',
  },
  isSubscription: false,
  tradePrice: {
    goodsPrice: 1056,
    totalPrice: 1056,
  },
  tradeState: {
    orderType: null,
    orderState: 'COMPLETED',
    storeId: '12345678',
    lastModifiedAt: '2022-04-25T09:33:41.361Z',
    lastModifiedBy: 'zz',
    createdAt: '2022-04-24T09:01:44.458Z',
    createdBy: 'test用户001',
  },
  logs: [
    {
      id: '6b269054-7c40-1312-5dc8-aada1c0c7297',
      status: null,
      createdAt: '2022-04-24T09:01:44.458Z',
      createdBy: 'test用户001',
    },
    {
      id: '5114ebbf-a006-779d-d624-027c0761a657',
      status: null,
      createdAt: '2022-04-25T09:33:33.016Z',
      createdBy: 'zz',
    },
    {
      id: '8c86863f-1e71-bd58-3c8e-e631568f64cf',
      status: null,
      createdAt: '2022-04-25T09:33:41.361Z',
      createdBy: 'zz',
    },
  ],
  remark: '',
  buyer: {
    isMember: true,
    customerId: '51b66041-1ee0-7f1d-6197-07401d9931ce',
    customerName: null,
    customerEmail: null,
    customerLevel: '新手铲屎官',
    nickName: '香',
    phone: null,
  },
}

export const orderListMockData = [orderDetailMockData]
