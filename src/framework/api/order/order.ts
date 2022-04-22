import ApiRoot from '../fetcher'

export const createOrder = async (params:any) => {
  try {
    // const params={
    //   goodsList: [
    //     {
    //       id: "ID",
    //       spuNo: "SpuNo",
    //       goodsName: "GoodsName",
    //       cardName: "CardName",
    //       goodsDescription: "GoodsDescription",
    //       isSupport100: false,
    //       type: "OTHER",
    //       brandId: "BrandID",
    //       goodsCategoryId: "GoodsCategoryID",
    //       shelvesStatus: false,
    //       defaultImage: "DefaultImage",
    //       salesStatus: 0,
    //       weight: 0,
    //       weightUnit: "WeightUnit",
    //       parcelSizeLong: "ParcelSizeLong",
    //       parcelSizeIongunit: "ParcelSizeIongunit",
    //       parcelSizeHeight: "ParcelSizeHeight",
    //       parcelSizeHeightUnit: "ParcelSizeHeightUnit",
    //       parcelSizeWeight: "ParcelSizeWeight",
    //       parcelSizeWeightUnit: "ParcelSizeWeightUnit",
    //       storeId: "12345678",
    //       goodsSpecifications: [
    //         {
    //           id: "ID",
    //           goodsId: "GoodsID",
    //           specificationName: "SpecificationName",
    //           specificationNameEn: "SpecificationNameEn",
    //           goodsSpecificationDetail: [
    //             {
    //               id: "ID",
    //               goodsId: "GoodsID",
    //               goodsSpecificationId: "GoodsSpecificationID",
    //               specificationDetailName: "SpecificationDetailName",
    //               specificationDetailNameEn: "SpecificationDetailNameEn",
    //               storeId: "12345678",
    //             }
    //           ]
    //         }
    //       ],
    //       goodsVariants: {
    //         id: "ID",
    //         goodsId: "GoodsID",
    //         skuNo: "SkuNo",
    //         eanCode: "EanCode",
    //         name: "Name",
    //         skuType: 0,
    //         stock: 0,
    //         marketingPrice: 0,
    //         listPrice: 0,
    //         shelvesStatus: false,
    //         shelvesTime: "ShelvesTime",
    //         storeId: "StoreID",
    //         defaultImage: "DefaultImage",
    //         subscriptionStatus: 0,
    //         feedingDays: 0,
    //         subscriptionPrice: 0,
    //         goodsSpecificationRel: [
    //           {
    //             goodsSpecificationId: "GoodsSpecificationID",
    //             goodsSpecificationDetailId: "GoodsSpecificationDetailID",
    //             goodsVariantId: "GoodsVariantID",
    //             relId: "RelID",
    //           }
    //         ],
    //         num: 1,
    //       },
    //       goodsAttributeValueRel: [
    //         {
    //           attributeName: "testAttributeName1",
    //           attributeNameEn: "AttributeNameEn",
    //           attributeValueName: "AttributeValueName",
    //           attributeValueNameEn: "AttributeValueNameEn",
    //           relId: "RelID",
    //           attributeId: "AttributeID",
    //           attributeValueId: "AttributeValueID",
    //           goodsId: "GoodsID",
    //         }
    //       ]
    //     }
    //   ],
    //   customerInfo: {
    //     id: "44",
    //     headImage: "http://dummyimage.com/400x400",
    //     level: "do proident esse sint ipsum",
    //     phone: "13883622944",
    //     nickName: "zzx",
    //     name: "王驷洁",
    //     customerAccount: "xxxx",
    //   },
    //   addressInfo: {
    //     receiverName: "xxx",
    //     phone: "19845571222",
    //     detail: "Excepteur adipisicing amet Duis aliquip",
    //     isDefault: false,
    //     postcode: "81",
    //     region: "proident eiusmod",
    //     city: "吉林市",
    //     province: "澳门特别行政区",
    //     country: "aliquip culpa minim non",
    //   },
    //   isSubscription: false,
    //   storeId: "12345678",
    //   operator: "test用户001",
    //   remark: "test",
    //   expectedShippingDate: "2022-04-19T06:11:06.62Z",
    // }
    const res = await ApiRoot.orders().createOrder({
      body: params,
    })
    console.log('create order view', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}
