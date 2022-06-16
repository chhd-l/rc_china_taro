import { useState } from 'react'
import { View, Radio, Text, Image } from '@tarojs/components'
import { AtModal } from 'taro-ui'
import { Address } from '@/framework/types/consumer'
import Taro, { getCurrentPages } from '@tarojs/taro'
import { deleteAddress, updateAddress } from '@/framework/api/consumer/address'
import routers from '@/routers'
import { EDIT_ADDRESS_ICON, DELETE_ADDRESS_ICON } from '@/lib/constants'
import './index.less'

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
    const value = !addressInfo.isDefault
    if (value) {
      const res = await updateAddress({
        params: {
          consumerId: addressInfo.consumerId,
          id: addressInfo.id,
          isDefault: !addressInfo.isDefault,
        },
      })
      if (res) {
        isDefaultUpdateSuccess && isDefaultUpdateSuccess(addressInfo, !addressInfo.isDefault)
      }
    } else {
      //不允许将默认地址设置成非默认地址
      return false
    }
  }

  //checkout过来勾选地址
  const selectAddress = () => {
    console.log('getCurrentPages ', getCurrentPages())
    console.log(routers.checkout.replace('/', ''))
    const findCheckoutIndex = getCurrentPages().findIndex((el) => {
      console.log(el.route)
      return el.route === routers.checkout.replace('/', '')
    })
    console.log(findCheckoutIndex)
    if (findCheckoutIndex > -1) {
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
  }

  return (
    <View className="px-4 pt-4 pb-2 bg-white address-item mt-2 rounded">
      <View onClick={selectAddress}>
        <View className="flex flex-row justify-between">
          <Text className="text-28 text-black font-semibold">{receiverName}</Text>
          <Text className="text-26 text-gray-400">{phone}</Text>
        </View>
        <View className="mt-2 pb-3" style={{ borderBottom: '1px solid #D8D8D8' }}>
          <Text className="text-26">
            {province} {city} {region} {detail}
          </Text>
        </View>
      </View>
      <View className="flex flex-row justify-between items-center mt-1">
        <Radio
          key={addressInfo.id}
          value="选中"
          checked={Boolean(addressInfo.isDefault)}
          color="#d33024"
          className="text-40 -ml-5 text-gray-400 transform-6"
          onClick={() => setAsDefault()}
        >
          &nbsp;默认地址
        </Radio>
        <View className="flex flex-row items-center">
          <Image
            style={{ width: '20px', height: '20px' }}
            src={EDIT_ADDRESS_ICON}
            onClick={(e) => {
              console.log(e)
              editAddress()
            }}
          />
          <View className="h-4 border-r border-t-0 border-b-0 border-l-0 border-solid border-gray-300 mx-2" />
          <Image
            style={{ width: '18px', height: '18px' }}
            src={DELETE_ADDRESS_ICON}
            onClick={() => {
              setShowDelTip(true)
            }}
          />
        </View>
      </View>
      <AtModal
        isOpened={showDelTip}
        title="提示"
        content="确定删除地址信息？"
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
