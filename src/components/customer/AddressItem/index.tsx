import { useState } from 'react'
import { View, Radio, Text } from '@tarojs/components'
import { AtDivider, AtIcon, AtModal } from 'taro-ui'
import { Address } from '@/framework/types/customer'
import Taro from '@tarojs/taro'
import { deleteAddress, updateAddress } from '@/framework/api/customer/address'
import './index.less'

const AddressItem = ({ addressInfo }: { addressInfo: Address }) => {
  const [showDelTip, setShowDelTip] = useState(false)
  const { receiverName, phone, province, city, region, detail, isDefault } = addressInfo

  const editAddress = () => {
    Taro.setStorage({
      key: 'current-address',
      data: JSON.stringify(addressInfo),
      success: function () {
        Taro.navigateTo({
          url: '/pages/packageB/newAddress/index?type=edit',
        })
      },
    })
  }

  const delAddress = async () => {
    await deleteAddress({
      id: addressInfo.id || '',
    })
    setShowDelTip(false)
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
  }

  //checkout过来勾选地址
  const selectAddress = () => {
    Taro.setStorage({
      key: 'select-address',
      data: JSON.stringify(addressInfo),
      success: function (res) {
        console.log(res)
        Taro.navigateBack({
          delta: 1,
        })
      },
    })
  }

  return (
    <View className="p-2 bg-white address-item text-sm mt-2">
      <View onClick={selectAddress}>
        <View className="flex flex-row justify-between">
          <Text>{receiverName}</Text>
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
          className="text-48 -ml-5"
          onClick={() => setAsDefault()}
        >
          默认地址
        </Radio>
        <View className="flex flex-row items-center">
          <AtIcon
            value="file-generic"
            size="24"
            color="#D1D5DB"
            onClick={(e) => {
              console.log(e)
              editAddress()
            }}
          />
          <View className="h-4 border-r border-t-0 border-b-0 border-l-0 border-solid border-gray-300 mx-1" />
          <AtIcon
            value="trash"
            size="24"
            color="#D1D5DB"
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
      />
    </View>
  )
}
export default AddressItem
