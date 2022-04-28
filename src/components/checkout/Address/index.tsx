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
    <View>
      {receiverName ? (
        <View className="flex flex-row justify-between items-center text-32 items-start">
          <View className=" text-black items-start font-semibold -mt-6">{receiverName}</View>
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
          <View className="text-32 flex flex-row items-center">
            <Image className="w-6 h-6 mr-2" src={ADDRESS_ORDER_ICON} />
            新增收货地址
          </View>
          <View>
            <AtIcon value="chevron-right" size="24" onClick={() => selectAddress()}/>
          </View>
        </View>
      )}
    </View>
  )
}
export default AddressInfo
