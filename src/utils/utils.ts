import pickBy from 'lodash/pickBy'
import moment from 'moment'

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
  return getCurrencyCode() + (price || 0).toFixed(2)
}

export const getCycleItem = (sku, cycle) => {
  let discount = 1;
  switch (cycle) {
    case 'QUARTER':
      discount = 0.85;
      break;
    case 'HALF_YEAR':
      discount = 0.8;
      break;
    case 'YEAR':
      discount = 0.75;
      break;
  }
  let originalPrice = sku.subscriptionPrice * sku.num;
  let quarterCycle = {
    cycle,
    originalPrice: originalPrice,
    discountPrice: Math.ceil(originalPrice * discount),
    feedingDays: sku.feedingDays * sku.num,
  };
  return quarterCycle;
};

export const formatDate = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() <= 9 ? '0' + (date.getMonth() + 1) : date.getMonth()
  const day = date.getDate() + 1
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
  // updatedObj.id = primaryData.id //id需要一直存在
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
  if (age[0] > 0) {
    return `${age[0]}岁`
  } else if (age[1] > 0) {
    return `${age[1]}个月 `
  } else {
    return '1个月'
  }
}

export const handleReturnTime = (time: any) => {
  if (time !== null && time !== undefined && time !== '') {
    return moment(new Date(time)).format('YYYY-MM-DD HH:mm:SS')
  } else {
    return ''
  }
}

export const getDateDiff = (startTime, endTime) => {
  //将日期字符串转换为时间戳
  let sTime = new Date(startTime).getTime() //开始时间
  let eTime = new Date(endTime).getTime() //结束时间
  sTime = Number(sTime)
  eTime = Number(eTime)
  //作为除数的数字
  let divNumSecond = 1000
  let divNumMinute = 1000 * 60
  let divNumHour = 1000 * 3600
  let divNumDay = 1000 * 3600 * 24

  const day = parseInt((eTime - sTime) / parseInt(divNumDay))
  const hour = parseInt(((eTime - sTime) % parseInt(divNumDay)) / parseInt(divNumHour))
  const minute = parseInt(
    parseInt(((eTime - sTime) % parseInt(divNumDay)) % parseInt(divNumHour)) / parseInt(divNumMinute),
  )
  const second =
    (parseInt(((eTime - sTime) % parseInt(divNumDay)) % parseInt(divNumHour)) % parseInt(divNumMinute)) /
    parseInt(divNumSecond)
  const str = day + '天' + hour + '小时' + minute + '分' + second + '秒'
  console.log(str)
  return {
    day,
    hour,
    minute: day > 0 || hour > 0 || minute > 30 ? 0 : 30 - minute,
    second: day > 0 || hour > 0 || minute > 30 ? 0 : second,
  }
}


export const getRecommendProduct = () => {

}
