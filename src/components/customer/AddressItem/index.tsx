import { useEffect, useState } from 'react'
import { View, Radio, Text, Image } from '@tarojs/components'
import { AtDivider, AtModal } from 'taro-ui'
import { Address } from '@/framework/types/customer'
import Taro, { useDidHide } from '@tarojs/taro'
import { deleteAddress, updateAddress } from '@/framework/api/customer/address'
import routers from '@/routers'
import './index.less'

const editIcon = 'https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/edit_address.png'
const deleteIcon = 'https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/remove_address.png'

const AddressItem = ({
  addressInfo,
  delAddressSuccess,
  isDefaultUpdateSuccess,
}: {
  addressInfo: Address
  delAddressSuccess: Function
  isDefaultUpdateSuccess: Function
}) => {
  const [showDelTip, setShowDelTip] = useState(false)
  const { receiverName, phone, province, city, region, detail } = addressInfo
  const [isDefault, setIsDefault] = useState(addressInfo.isDefault)

  const editAddress = () => {
    Taro.setStorage({
      key: 'current-address',
      data: JSON.stringify(addressInfo),
      success: function () {
        Taro.navigateTo({
          url: `${routers.newAddress}?type=edit`,
        })
      },
    })
  }

  const delAddress = async () => {
    await deleteAddress({
      id: addressInfo.id || '',
    })
    setShowDelTip(false)
    delAddressSuccess && delAddressSuccess()
  }

  const setAsDefault = async () => {
    await updateAddress({
      params: {
        customerId: addressInfo.customerId,
        id: addressInfo.id,
        isDefault: !isDefault,
        receiverName: receiverName,
      },
    })
    setIsDefault(!isDefault)
    isDefaultUpdateSuccess && isDefaultUpdateSuccess()
  }

  useEffect(() => {
    setIsDefault(addressInfo.isDefault)
  }, [addressInfo])

  //checkout过来勾选地址
  const selectAddress = () => {
    Taro.getStorage({
      key: 'address-from-checkout',
      success: function (data) {
        if (data.data) {
          Taro.setStorage({
            key: 'select-address',
            data: JSON.stringify(addressInfo),
            success: function (res) {
              console.log(res)
              Taro.redirectTo({ url: routers.checkout })
            },
          })
          Taro.removeStorageSync('address-from-checkout')
        }
      },
    })
  }

  useDidHide(() => {
    Taro.removeStorage({ key: 'address-from-checkout' })
  })

  return (
    <View className="px-2 pt-4 pb-2 bg-white address-item text-sm mt-2 rounded">
      <View onClick={selectAddress}>
        <View className="flex flex-row justify-between">
          <Text className="text-base text-black font-semibold">{receiverName}</Text>
          <Text className="text-gray-400">{phone}</Text>
        </View>
        <View className="mt-2">
          <Text>
            {province} {city} {region} {detail}
          </Text>
        </View>
        <AtDivider className="p-0 my-2 rc_divider" />
      </View>

      <View className="flex flex-row justify-between items-center">
        <Radio
          value="选中"
          checked={Boolean(isDefault)}
          style={{ transform: 'scale(0.6)' }}
          color="red"
          className="text-48 -ml-5 text-gray-400"
          onClick={() => setAsDefault()}
        >
          默认地址
        </Radio>
        <View className="flex flex-row items-center">
          <Image
            style={{ width: '20px', height: '20px' }}
            src={editIcon}
            onClick={(e) => {
              console.log(e)
              editAddress()
            }}
          />
          <View className="h-4 border-r border-t-0 border-b-0 border-l-0 border-solid border-gray-300 mx-2" />
          <Image
            style={{ width: '18px', height: '18px' }}
            src={deleteIcon}
            onClick={() => {
              setShowDelTip(true)
            }}
          />
        </View>
      </View>
      <AtModal
        isOpened={showDelTip}
        title="确定删除地址信息？"
        cancelText="再想想"
        confirmText="狠心删除"
        onClose={() => {
          setShowDelTip(false)
        }}
        onCancel={() => {
          setShowDelTip(false)
        }}
        onConfirm={() => delAddress()}
        className="rc_modal"
      />
    </View>
  )
}
export default AddressItem
