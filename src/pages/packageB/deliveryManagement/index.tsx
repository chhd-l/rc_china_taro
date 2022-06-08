import NavBar from '@/components/common/Navbar'
import CommonTitle from '@/components/creatSubscription/CommonTitle'
import { handleBuyMore } from '@/components/creatSubscription/SubList'
import PetList from '@/components/customer/PetList'
import { getSubscriptionDetail } from '@/framework/api/subscription/subscription'
import IconFont from '@/iconfont'
import { deliveryDetailAtom } from '@/store/subscription'
import { View, Image, Text } from '@tarojs/components'
import Taro, { Current } from '@tarojs/taro'
import { useRequest } from 'ahooks'
import { useAtom } from 'jotai'
import moment from 'moment'
import { AtButton } from 'taro-ui'
import './index.less'

const DeliveryManagement = () => {
  const [, setDeliveryDetail] = useAtom(deliveryDetailAtom)

  const { data } = useRequest(async () => {
    const res = await getSubscriptionDetail(Current?.router?.params?.id)
    setDeliveryDetail(res)
    return res
  })
  const handleClick = () => {
    handleBuyMore(data)
  }
  console.log('data', data, data?.pet?.id)
  return (
    <View className="delivery-management rc-content-bg">
      <NavBar navbarTitle="发货进度" isNeedBack />
      {data?.pet?.id ? <PetList siglePetInfo={data?.pet} /> : null}
      <View className="px-3 mt-3 bg-white pb-3  rounded-md">
        <CommonTitle title="发货管理">
          <Text className="text-rc22 text-rc_666666">订阅编号:{data?.no}</Text>
        </CommonTitle>
        {data?.goodsList?.map((item) => {
          const { goodsVariant } = item
          return (
            <View className="h-36 flex" key={item.id}>
              <View className="w-36 h-full">
                <Image src={goodsVariant.defaultImage} className="w-full h-full" />
              </View>
              <View className="flex-1 px-3 flex-col flex items-start w-full justify-center">
                <View className="text-28   mb-2 font-bold">
                  您的宠物还剩余
                  <Text className="text-primary-red">{data.totalDeliveryTimes - data.currentDeliveredSequence}</Text>包
                </View>
                {data.freshType === 'FRESH_100_DAYS' ? (
                  <View className="text-rc26 text-textGray mb-2">新鲜度：100天</View>
                ) : null}
                <AtButton size="small" className="w-full" circle type="primary" onClick={handleClick}>
                  一键续订
                </AtButton>
              </View>
            </View>
          )
        })}

        <CommonTitle title="发货驿站" />
        <View>
          <View className="flex justify-between items-center">
            <IconFont name="fahuoyizhan" size={80} />
            <View className="text-24 text-right">
              下一包将在{moment(data?.planingDeliveries?.[0]?.shipmentDate || undefined).format('YYYY-MM-DD')}
              发货，请注意查收!
            </View>
          </View>
          <View className="flex">
            <View className="w-36"></View>
            <View className="flex-1 flex  px-3 w-full">
              <AtButton
                size="small"
                className="w-full"
                circle
                type="primary"
                onClick={() => {
                  Taro.navigateTo({ url: `/pages/packageB/deliveryProgress/index?id=${data?.id}` })
                }}
              >
                发货进度
              </AtButton>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
export default DeliveryManagement
