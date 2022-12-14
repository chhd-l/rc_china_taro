import { Image, View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { Address } from '@/framework/types/consumer'
import Taro from '@tarojs/taro'
import routers from '@/routers'
import { ADDRESS_ORDER_ICON } from '@/lib/constants'

const AddressInfo = ({ address,noAddressText }: { address: Address | any,noAddressText:string }) => {
  const { receiverName, phone, province, city, region, detail } = address

  const selectAddress = () => {
    Taro.setStorage({
      key: 'address-from-checkout',
      data: JSON.stringify(true),
      success: function () {
        Taro.navigateTo({ url: routers.addressManage })
      },
    })
  }

  return (
    <View className="bggray pb-2 mt-2 rounded" onClick={() => selectAddress()}>
      {receiverName ? (
        <View className="flex flex-row justify-between items-start px-4 py-2">
          <View className="text-black text-26 font-semibold keep-all">{receiverName}</View>
          <View className="ml-2 text-xs">
            <View>{phone}</View>
            <View className="mt-1">
              {province} {city} {region} {detail}
            </View>
          </View>
          <View className="self-center">
            <AtIcon value="chevron-right" size="24" color="#666666" />
          </View>
        </View>
      ) : (
        <View className="flex flex-row justify-between px-4 py-2 items-center">
          <View className="text-26 flex flex-row items-center">
            <Image className="w-5 h-5 mr-2" src={ADDRESS_ORDER_ICON} />
            {noAddressText}
          </View>
          <View>
            <AtIcon value="chevron-right" size="24" color="#666666" />
          </View>
        </View>
      )}
    </View>
  )
}
export default AddressInfo
