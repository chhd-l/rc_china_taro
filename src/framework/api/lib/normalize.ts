import { GoodsVariants } from '@/framework/schema/products.schema'
import { SkuItemProps } from '@/framework/types/products'
import { dealDatasForApi, formatDateToApi, formatDateToFe } from '@/utils/utils'
import moment from 'moment'

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
    // data.birthday = formatDateToFe(data.birthday)
    data.birthday = moment(petInfo.birthday).format('YYYY-MM-DD')
  }
  return data
}

export const normalizeProductForFe = (goods: any): any => {
  let tags: string[] = []
  goods.goodsAttributeValueRel?.forEach((attr) => {
    let tagStr = ''
    switch (attr.attributeNameEn) {
      case 'Age':
        tagStr = `适用年龄:${attr.attributeValueName}` //显示中文
        break
      case 'Technology':
        let value =
          (attr.attributeValueName == '湿粮' && '每日一包') || (attr.attributeValueName == '其他' && '2日一罐')
        tagStr = value ? `建议干湿搭配:${value}` : ''
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
    img: goods.goodsAsserts?.map((el) => el.artworkUrl),
    skus: goods.goodsVariants?.map((sku, index) => normalizeSkuForFe(sku, index, tags, goods.goodsSpecifications)),
    type: goods.type,
    description: goods.goodsDescription,
    specifications:
      goods.goodsSpecifications
        ?.map((spec) => {
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
    tags: tags.filter((el) => el), //筛选有数据的展示
    img: [sku.defaultImage],
    specString: '',
    specText: [normalizeSpecText(sku.goodsSpecificationRel, goodsSpecifications)?.filter((el) => el)[0]],
    specIds:
      sku.goodsSpecificationRel?.map((el) => {
        return el.goodsSpecificationDetailId
      }) || [],
    defaultChoose: index === 0 ? true : false,
  }
  return item
}
export const normalizeProductsforFe = (data: any) => {
  let list = data?.map((item) => {
    console.log('item-------------', item)
    let minItem = item.goodsVariants ? item.goodsVariants[0] : null
    // item.goodsVariants.forEach((variant) => {
    //   if (variant?.marketingPrice && Number(minItem.marketingPrice) > Number(variant?.marketingPrice)) {
    //     minItem = variant
    //   }
    // })
    return {
      name: item.goodsName,
      img: minItem?.defaultImage || (item.goodsAsserts ? item.goodsAsserts[0]?.artworkUrl : null),
      originalPrice: minItem?.listPrice,
      price: minItem?.marketingPrice,
      sku: minItem?.id,
      spu: item.id,
    }
  })
  return list
}
export const normalizeSpecText = (goodsSpecificationRel, goodsSpecifications): string[] => {
  return goodsSpecificationRel?.map((el) => {
    let specObj = goodsSpecifications.find((spec) => spec.id === el.goodsSpecificationId)
    let specDetailName = specObj?.goodsSpecificationDetail?.find(
      (specDetail) => specDetail.id === el.goodsSpecificationDetailId,
    )?.specificationDetailName
    console.info('goodsSpecificationDetailId', specDetailName)
    return specDetailName || ''
  })
}

const petItemApiArr = [
  'name',
  'gender',
  'type',
  'breedCode',
  'breedName',
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
  'code',
  'breed',
  'image',
  'isSterilized',
  'birthday',
  'customerId',
  'operator',
  'id',
]

export const normalizeCartData = (cart: any, productSkuInfo: any) => {
  cart.skuGoodInfo = productSkuInfo
  cart.select = false
  cart.localData = {
    name: productSkuInfo.goodsName,
    image: productSkuInfo.goodsVariants[0]?.defaultImage,
    price: productSkuInfo.goodsVariants[0]?.marketingPrice,
    tags: normalizeProductForFe(productSkuInfo)?.skus[0].tags,
    specs: normalizeProductForFe(productSkuInfo)?.skus[0].specText,
  }
  return cart
}

export const normalizeTags = (attributeValueRels, feedingDays) => {
  let tags: string[] = []
  attributeValueRels?.forEach((attr) => {
    let tagStr = ''
    switch (attr.attributeNameEn) {
      case 'Age':
        tagStr = `适用年龄:${attr.attributeValueName}`
        break
      case 'Technology':
        let value =
          (attr.attributeValueName == '湿粮' && '每日一包') || (attr.attributeValueName == '其他' && '2日一罐')
        tagStr = value ? `建议干湿搭配:${value}` : ''
        break
    }
    if (tagStr !== '') {
      tags.push(tagStr)
    }
  })
  tags = feedingDays ? [...tags, `建议饲喂天数:${feedingDays}天`] : [...tags]
  return tags
}

export const normalizeCatOrDogAttr = (atrrs, categoryId) => {
  let keyLable = ['专区', '年龄', '功能', '品种']
  // if (categoryId == '8') {
  //   //狗的时候，年龄展示lifestage
  //   let keyLable = ['专区', '年龄', '功能', '品种']
  // }
  let newArr: any = []
  keyLable.forEach((el) => {
    atrrs.find((item) => {
      let data = {
        key: item.attributeNameEn,
        label: item.attributeName,
        list: item.values.map((el) => {
          return {
            categoryId,
            attributeId: el.attributeId,
            value: el.id,
            label: el.attributeValueName,
          }
        }),
      }
      if (el === item.attributeName) {
        newArr.push(data)
      }
    })
  })
  return newArr
}
