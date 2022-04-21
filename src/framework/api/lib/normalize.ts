import { Goods, GoodsList, GoodsVariants } from '@/framework/schema/products.schema'
import { ProductDetailProps, SkuItemProps } from '@/framework/types/products'
import { dealDatasForApi, formatDateToApi, formatDateToFe } from '@/utils/utils'

export const normalizePetsForApi = (petInfo: any) => {
  let data: any = dealDatasForApi(petInfo, petItemApiArr, petItemFeArr)
  if (data.id === '-1') {
    //处理新增情况
    delete data.id
  }
  data.operator = ''
  if (data.birthday) {
    //处理日期
    data.birthday = formatDateToApi(data.birthday)
  }
  console.info('data', data)
  return data
}
export const normalizePetsForFe = (petInfo: any) => {
  let data: any = dealDatasForApi(petInfo, petItemFeArr, petItemApiArr)
  if (data.birthday) {
    //处理日期
    data.birthday = formatDateToFe(data.birthday)
  }
  // data.birthday = moment(petInfo.birthday).format("YYYY-MM-DD");
  return data
}

export const normalizeProductForFe = (goods: Goods): ProductDetailProps => {
  let tags: string[] = []
  goods.goodsAttributeValueRel.forEach((attr) => {
    let tagStr = ''
    switch (attr.attributeName) {
      case 'Age':
        tagStr = `适用年龄:${attr.attributeValueName}`
        break
      case 'Technology':
        let value = attr.attributeValueName == 'WetFood' && '每日一包'
        value = attr.attributeValueName == 'can' && '两日一罐'
        tagStr = `建议干湿搭配:${value}`
        break
    }
    tags.push(tagStr)
  })
  let spu = {
    // specs: string
    name: goods.goodsName,
    // stock: number
    // price: goods.mar
    // originalPrice:
    id: goods.id,
    no: goods.spuNo,
    tags: [''], //逻辑处理
    img: goods.goodsAsserts.map((el) => el.artworkUrl),
    skus: goods.goodsVariants.map((sku, index) =>
      normalizeSkuForFe(sku, index, goods.type, tags, goods.goodsSpecifications),
    ),
    type: goods.type,
    description: goods.goodsDescription,
    specifications:
      goods.goodsSpecifications
        .map((spec) => {
          let item = {
            id: spec.id,
            name: spec.specificationName,
            children: spec.goodsSpecificationDetail.map((el) => {
              return {
                able: true,
                id: el.id,
                name: el.specificationDetailName,
              }
            }),
          }
          return item
        })
        .filter((el) => el.children.length) || [], //可能存在没规格的页面
  }
  return spu
}

export const normalizeSkuForFe = (
  sku: GoodsVariants,
  index: number,
  type: string,
  spuTags: string[],
  goodsSpecifications,
): SkuItemProps => {
  let tags = sku.feedingDays ? [...spuTags, `建议饲喂天数:${sku.feedingDays}天`] : [...spuTags]
  let item = {
    // specs: string
    name: sku.name,
    stock: sku.stock,
    price: sku.marketingPrice,
    originalPrice: sku.listPrice,
    id: sku.id,
    feedingDays: '',
    no: sku.skuNo,
    tags, //todo
    img: [sku.defaultImage],
    specString: '',
    specText: normalizeSpecText(sku.goodsSpecificationRel, goodsSpecifications).filter((el) => el),
    specIds:
      sku.goodsSpecificationRel?.map((el) => {
        return el.goodsSpecificationDetailId
      }) || [],
    defaultChoose: index === 0 ? true : false,
  }
  return item
}
export const normalizeProductsforFe = (data: GoodsList[]) => {
  let list = data.map((item) => {
    return {
      name: item.cardName,
      img: item.goodsAsserts[0]?.artworkUrl,
      originalPrice: item.goodsVariants[0].listPrice,
      price: item.goodsVariants[0].marketingPrice,
      sku: item.goodsVariants[0].id,
      spu: item.id,
    }
  })
  return list
}
export const normalizeSpecText = (goodsSpecificationRel, goodsSpecifications): string[] => {
  return goodsSpecificationRel.map((el) => {
    let specObj = goodsSpecifications.find((spec) => spec.id === el.goodsSpecificationId)
    let specDetailName = specObj.goodsSpecificationDetail.find(
      (specDetail) => specDetail.id === el.goodsSpecificationDetailId,
    )?.specificationDetailName
    console.info('goodsSpecificationDetailId', specDetailName)
    return specDetailName
  })
}

const petItemApiArr = [
  'name',
  'gender',
  'type',
  'breedCode',
  'image',
  'isSterilized',
  'birthday',
  'customerId',
  'operator',
  'id',
]
const petItemFeArr = [
  'name',
  'gender',
  'type',
  'breed',
  'image',
  'isSterilized',
  'birthday',
  'customerId',
  'operator',
  'id',
]
