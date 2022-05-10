import { Image, View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { Address } from '@/framework/types/customer'
import Taro from '@tarojs/taro'
import routers from '@/routers'
import { ADDRESS_ORDER_ICON } from '@/lib/constants'

const AddressInfo = ({ address }: { address: Address | any }) => {
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
    <View onClick={() => selectAddress()}>
      {receiverName ? (
        <View className="flex flex-row justify-between items-start text-30 items-start px-4 py-2">
          <View className=" text-black font-semibold" style={{ wordBreak: 'keep-all' }}>
            {receiverName}
          </View>
          <View className="ml-2 text-xs">
            <View>{phone}</View>
            <View className="mt-1">
              {province} {city} {region} {detail}
            </View>
          </View>
          <View className="self-center">
            <AtIcon value="chevron-right" size="24" />
          </View>
        </View>
      ) : (
        <View className="flex flex-row justify-between px-4 py-2 items-center">
          <View className="text-30 flex flex-row items-center">
            <Image className="w-6 h-6 mr-2" src={ADDRESS_ORDER_ICON} />
            新增收货地址
          </View>
          <View>
            <AtIcon value="chevron-right" size="24" />
          </View>
        </View>
      )}
    </View>
  )
}
export default AddressInfo
