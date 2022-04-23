import pickBy from 'lodash/pickBy'

export const getCurrencyCode = () => {
  return '￥'
}

export const formatDateToApi = (date: string): string => {
  return new Date(date).toISOString()
}

export const formatDateToFe = (date: string): string => {
  return new Date(date).toLocaleDateString().replace(/\//g, '-')
}

export const formatMoney = (price: number) => {
  return getCurrencyCode() + price.toFixed(2)
}

export const formatDate = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() <= 9 ? '0' + (date.getMonth() + 1) : date.getMonth()
  const day = date.getDate()
  return year + '-' + month + '-' + day
}

export const dealDatasForApi = (feData, apiKeies, feKies) => {
  //字段sort需要保持一致(只能处理简单对象字段)
  let apiData = {} as any
  apiKeies.forEach((key, idx) => {
    apiData[key] = feData[feKies[idx]]
  })
  return apiData
}

export const pickForUpdate = (data, primaryData) => {
  //data:传入的数据,primaryData：修改前接口获取的数据
  let updatedObj = pickBy(data, function (value, key) {
    console.info(value !== primaryData[key], value, primaryData[key])
    return value !== primaryData[key]
  })
  updatedObj.id = primaryData.id //id需要一直存在
  return updatedObj
}
