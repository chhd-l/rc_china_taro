/**
 * 根据环境更新../project.config.json中的appid字段
 * @env NODE_ENV=development 将config/dev.js中的appid配置设置到../project.config.json中
 * @env NODE_ENV=production 将config/prod.js中的appid配置设置到../project.config.json中
 */
const fs = require('fs')
const path = require('path')
const DEV_CONFIG = require('./dev')
const PROD_CONFIG = require('./prod')
const STG_CONFIG = require('./stg')

const { readFileSync, writeFileSync } = fs

function updateProjectConfig (filePath) {
  const fileOption = { encoding: 'utf-8' }
  const fileContent = readFileSync(filePath, fileOption)
  let config = JSON.parse(fileContent.toString())
  switch (process.env.NODE_ENV) {
    case 'development':
      config.appid = DEV_CONFIG.appid
      break
    case 'stg':
      config.appid = STG_CONFIG.appid
      break
    case 'production':
      config.appid = PROD_CONFIG.appid
      break
  }
  console.log(process.env.NODE_ENV+' appId = ' + config.appid)

  //  if (process.env.NODE_ENV==='development') {
  //      config.appid = DEV_CONFIG.appid;
  //      console.log('[DEV] appId = ' + config.appid);
  //  } else {
  //      config.appid = PROD_CONFIG.appid;
  //      console.log('[PROD] appId = ' + config.appid);
  //  }
  let newStr = JSON.stringify(config, null, 2)
  writeFileSync(filePath, newStr, fileOption)
}

updateProjectConfig(path.join(__dirname, '../project.config.json'))
