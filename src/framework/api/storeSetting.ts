import { session } from '@/utils/global'
import apis from '@/framework/config/api-config'
import ApiRoot from './fetcher'

export const getStoreSettings = async () => {
  try {
    // let storeSettings = session.get('store-setting')
    // console.log('store-setting',storeSettings)
    // if (!storeSettings) {
    const storeSettings = await ApiRoot({url:apis?.storeSetting}).stores().getStoreSettings()
    console.log('get storeSetting list view data', storeSettings)
    session.set('store-setting', storeSettings)
    // }
    return storeSettings
  } catch (e) {
    console.log(e)
    return []
  }
}
