import ApiRoot, { baseSetting } from '../fetcher'

export const getCustomer = async () => {
  try {
    const customer = await ApiRoot.customers().getCustomer({ id: baseSetting.customerId })
    console.log('get customer view', customer)
    return customer
  } catch (err) {
    console.log(err)
    return []
  }
}
