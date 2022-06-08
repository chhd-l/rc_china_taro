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
  // goods.goodsAttributeValueRel?.forEach((attr) => {
  //   let tagStr = ''
  //   switch (attr.attributeName) {
  //     case '年龄':
  //       tagStr = `适用年龄:${attr.attributeValueName}` //显示中文
  //       break
  //     case '干/湿':
  //       let value =
  //         (attr.attributeValueName == '湿粮' && '每日一包') || (attr.attributeValueName == '其他' && '2日一罐')
  //       tagStr = value ? `建议干湿搭配:${value}` : ''
  //       break
  //   }
  //   tags.push(tagStr)
  // })
  // 单独处理一个规格的情况，下架商品不可见
  let { goodsSpecifications, goodsVariants } = goods
  if (goodsSpecifications?.length === 1) {
    let goodsSpecificationDetailIdArr = goodsVariants.map(
      (el) => el.goodsSpecificationRel[0]?.goodsSpecificationDetailId,
    )
    console.info('goodsSpecificationDetailIdArr', goodsSpecificationDetailIdArr)
    goodsSpecifications[0].goodsSpecificationDetail = goodsSpecifications[0]?.goodsSpecificationDetail?.filter((el) =>
      goodsSpecificationDetailIdArr.find((cel) => el?.id === cel),
    )
    console.info('goodsSpecifications', goodsSpecifications)
  }
  if (goodsSpecifications?.length > 1) {
    //多个规格的情况，需要处理无库存的时候置灰
    goodsVariants = goodsVariants.filter(el => el.stock)
  }
  let spu = {
    // specs: string
    name: goods.goodsName,
    // stock: number
    // price: goods.mar
    // originalPrice:
    id: goods.id,
    no: goods.spuNo,
    tags: [''], //逻辑处理
    img: goods.goodsAsserts?.filter((el) => el.type === 'image').map((el) => el.artworkUrl),
    video: goods.goodsAsserts?.filter((el) => el.type === 'video')[0]?.artworkUrl,
    skus: goodsVariants
      ?.map((sku, index) => normalizeSkuForFe(sku, index, goods.goodsAttributeValueRel, goodsSpecifications)),
    type: goods.type,
    description: goods.goodsDescription,
    specifications:
      goodsSpecifications
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
  goodsAttributeValueRel: any,
  goodsSpecifications,
): SkuItemProps => {
  let tags: string[] = normalizeTags(goodsAttributeValueRel, sku.feedingDays)
  // let tags = sku.feedingDays ? [...spuTags, `建议饲喂天数:${sku.feedingDays}天`] : [...spuTags]
  let item = {
    // specs: string
    name: sku.name,
    stock: sku.stock,
    price: sku.marketingPrice,
    originalPrice: sku.listPrice,
    id: sku.id,
    feedingDays: sku.feedingDays,
    no: sku.skuNo,
    tags: tags.filter((el) => el), //筛选有数据的展示
    img: [sku.defaultImage],
    specString: '',
    goodsSpecificationRel: sku.goodsSpecificationRel,
    specText: normalizeSpecText(sku.goodsSpecificationRel, goodsSpecifications)?.filter((el) => el),
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
    let images = item.goodsAsserts?.filter((el) => el.type === 'image')
    // item.goodsVariants.forEach((variant) => {
    //   if (variant?.marketingPrice && Number(minItem.marketingPrice) > Number(variant?.marketingPrice)) {
    //     minItem = variant
    //   }
    // })
    return {
      name: item.goodsName,
      img: minItem?.defaultImage || (images ? images[0]?.artworkUrl : null),
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
    // console.info('goodsSpecificationDetailId', specDetailName)
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

export const normalizeCartData = (cart: any, productSkuInfo: any, isSubscription?: boolean) => {
  let spuimage = productSkuInfo.goodsAsserts?.[0]?.artworkUrl || productSkuInfo.defaultImage
  productSkuInfo.goodsVariants = productSkuInfo?.goodsVariant || productSkuInfo?.goodsVariants
  const productSku = { ...productSkuInfo }
  if (spuimage) {
    productSku.defaultImage = spuimage
  }
  delete productSku.goodsAsserts
  cart.skuGoodInfo = productSku
  cart.select = false
  cart.localData = {
    name: productSkuInfo?.goodsVariants[0]?.name,
    image: productSkuInfo?.goodsVariants[0]?.defaultImage || spuimage,
    price: isSubscription ? productSkuInfo?.goodsVariants[0]?.subscriptionPrice : productSkuInfo?.goodsVariants[0]?.marketingPrice,
    tags: normalizeProductForFe(productSkuInfo)?.skus[0].tags,
    specs: normalizeProductForFe(productSkuInfo)?.skus[0].specText,
    stock: productSkuInfo?.goodsVariants[0]?.stock || 0,//sku库存
    shelvesStatus: productSkuInfo?.goodsVariants[0]?.shelvesStatus || false,//sku上下架状态
    isDeleted: productSkuInfo?.goodsVariants[0]?.isDeleted || false//sku是否被删除
  }
  return cart
}

export const normalizeTags = (attributeValueRels, feedingDays) => {
  let tags: string[] = []
  attributeValueRels?.forEach((attr) => {
    switch (attr.attributeName) {
      case '年龄':
        tags[0] = `适用年龄: ${attr.attributeValueName}` //显示中文
        break
      case '干/湿':
        let value =
          (attr.attributeValueName == '湿粮' && '每日一包') ||
          (attr.attributeValueName == '其他' && '2日一罐')
        let dryVal = attr.attributeValueName == '干粮' && feedingDays && `建议饲喂天数: ${feedingDays}天`

        tags[1] = value ? `建议干湿搭配: ${value}` : ''
        tags[2] = dryVal || ''
        break
    }
  })
  let tagsArr = tags.filter((el) => el)
  return tagsArr
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
