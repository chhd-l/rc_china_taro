import ApiRoot, { baseSetting } from '../fetcher'

export const getSubscriptionSimpleRecommend = async (params: any) => {
    try {
        const { subscriptionSimpleRecommend } = await ApiRoot.subscriptions().subscriptionSimpleRecommend({ body: params })
        console.info('subscriptionSimpleRecommend', subscriptionSimpleRecommend)
        return subscriptionSimpleRecommend
    } catch (err) {
        return {}
    }
}

export const subscriptionCreateAndPay = async (params?: any) => {
    try {
        const { subscriptionCreateAndPay } = await ApiRoot.subscriptions().subscriptionCreateAndPay({ body: params })
        console.info('subscriptionCreateAndPay', subscriptionCreateAndPay)
        return subscriptionCreateAndPay
    } catch (err) {
        return {}
    }
}


export const subscriptionFindByCustomerId = async (customerId: string) => {
    try {
        const { subscriptionFindByCustomerId } = await ApiRoot.subscriptions().subscriptionFindByCustomerId({ customerId })
        console.info('subscriptionFindByCustomerId', subscriptionFindByCustomerId)
        return subscriptionFindByCustomerId
    } catch (err) {
        return {}
    }
}


export const subscriptionDetail = async (id: any) => {
    try {
        const { subscriptionDetail } = await ApiRoot.subscriptions().subscriptionDetail({ id })
        console.info('subscriptionDetail', subscriptionDetail)
        return subscriptionDetail
    } catch (err) {
        return {}
    }
}


export const subscriptionScheduleNextDelivery = async (params: any) => {
    try {
        const { subscriptionScheduleNextDelivery } = await ApiRoot.subscriptions().subscriptionScheduleNextDelivery({ body: params })
        console.info('subscriptionScheduleNextDelivery', subscriptionScheduleNextDelivery)
        return subscriptionScheduleNextDelivery
    } catch (err) {
        return {}
    }
}

