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
  const day = date.getDate()+1
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

export const getAge = (birthdayStr) => {
  if (!birthdayStr) {
    return ''
  }
  let birthday = birthdayStr.split('-')
  // 新建日期对象
  let date = new Date()
  // 今天日期，数组，同 birthday
  let today = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
  // 分别计算年月日差值
  let age = today.map((value, index) => {
    return value - birthday[index]
  })
  // 当天数为负数时，月减 1，天数加上月总天数
  if (age[2] < 0) {
    // 简单获取上个月总天数的方法，不会错
    let lastMonth = new Date(today[0], today[1], 0)
    age[1]--
    age[2] += lastMonth.getDate()
  }
  // 当月数为负数时，年减 1，月数加上 12
  if (age[1] < 0) {
    age[0]--
    age[1] += 12
  }
  let yearStr = age[0] ? `${age[0]}年 ` : ''
  let monthStr = age[1] ? `${age[1]}月 ` : ''
  let ageStr = age[0] > 0 ? yearStr : monthStr
  return ageStr
}
