import ApiRoot, { baseSetting } from '../fetcher'

export const getSubscriptionSimpleRecommend = async (params: any) => {
    // let paramsData = { storeId: baseSetting.storeId, ...params }
    try {
        const { subscriptionSimpleRecommend } = await ApiRoot.subscriptions().subscriptionSimpleRecommend({ body: params })
        // const breeds = mockPetlist;
        console.info('subscriptionSimpleRecommend', subscriptionSimpleRecommend)
        return subscriptionSimpleRecommend
    } catch (err) {
        return {}
    }
}


export const subscriptionCreateAndPay = async (params?: any) => {
    try {
        const { subscriptionCreateAndPay } = await ApiRoot.subscriptions().subscriptionCreateAndPay({ body: params })
        // const breeds = mockPetlist;
        console.info('subscriptionCreateAndPay', subscriptionCreateAndPay)
        return subscriptionCreateAndPay
    } catch (err) {
        return {}
    }
}
