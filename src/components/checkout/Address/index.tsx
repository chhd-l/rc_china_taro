import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { Address } from '@/framework/types/customer'
import Taro from '@tarojs/taro'

const AddressInfo = ({ address }: { address: Address | any }) => {
  const { receiverName, phone, province, city, region, detail } = address

  const selectAddress = () => {
    Taro.setStorage({
      key: 'address-from-checkout',
      data: JSON.stringify(true),
      success: function () {
        Taro.navigateTo({ url: '/pages/packageB/addressManage/index' })
      },
    })
  }

  return (
    <View className="bg-gray-50 p-2">
      {receiverName ? (
        <View className="flex flex-row justify-between py-2 items-center text-32">
          <View className="text-black items-start font-semibold">{receiverName}</View>
          <View className="">
            <View> {phone}</View>
            <View className="mt-1">
              {province} {city} {region} {detail}
            </View>
          </View>
          <View>
            <AtIcon value="chevron-right" size="24" onClick={() => selectAddress()} />
          </View>
        </View>
      ) : (
        <View className="flex flex-row justify-between py-2 items-center">
          <View className="text-32">新增收货地址</View>
          <View>
            <AtIcon value="chevron-right" size="24" onClick={() => selectAddress()} />
          </View>
        </View>
      )}
    </View>
  )
}
export default AddressInfo
