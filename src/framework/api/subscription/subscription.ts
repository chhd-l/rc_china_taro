import Taro from '@tarojs/taro'
import ApiRoot, { baseSetting } from '../fetcher'

export const getSubscriptionSimpleRecommend = async (params: any) => {
    try {
        const { subscriptionSimpleRecommend } = await ApiRoot.subscriptions().subscriptionSimpleRecommend({ body: params })
        let { couponList, couponInfoList } = subscriptionSimpleRecommend
        couponList?.forEach(el => {
            el.coupons?.forEach(coupon => {
                coupon.couponInfo = couponInfoList.find(info => info.id === coupon.couponId)
            })
        })
        console.info('subscriptionSimpleRecommend', subscriptionSimpleRecommend)
        return subscriptionSimpleRecommend
    } catch (err) {
        return {}
    }
}

export const subscriptionCreateAndPay = async (params?: any) => {
    try {
        const data = await ApiRoot.subscriptions().subscriptionCreateAndPay({ body: params })
        console.info('subscriptionCreateAndPay', data)
        return data
    } catch (err) {
        return {}
    }
}


export const getSubscriptionFindByConsumerId = async (consumerId: string) => {
    Taro.setStorageSync('commerce-loading', 1)
    try {
        const { subscriptionFindByConsumerId } = await ApiRoot.subscriptions().subscriptionFindByConsumerId({ consumerId })
        return subscriptionFindByConsumerId
    } catch (err) {
        return []
    }
}


export const getSubscriptionDetail = async (id: any) => {
    try {
        const subscriptionDetail = await ApiRoot.subscriptions().subscriptionDetail({ id })
        return subscriptionDetail
    } catch (err) {
        return {}
    }
}


export const getSubscriptionScheduleNextDelivery = async (params: any) => {
    try {
        const { subscriptionScheduleNextDelivery } = await ApiRoot.subscriptions().subscriptionScheduleNextDelivery({ body: params })
        return subscriptionScheduleNextDelivery
    } catch (err) {
        return false
    }
}

