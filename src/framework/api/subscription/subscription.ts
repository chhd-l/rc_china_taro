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
