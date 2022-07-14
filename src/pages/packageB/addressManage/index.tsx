import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AddressItem } from '@/components/consumer'
import { useState } from 'react'
import { Address } from '@/framework/types/consumer'
import { getAddresses } from '@/framework/api/consumer/address'
import routers from '@/routers'
import NavBar from '@/components/common/Navbar'
import './index.less'

const Index = () => {
  const [addressList, setAddressList] = useState<Address[]>([])

  const getAddressList = async () => {
    const res = await getAddresses()
    setAddressList(res)
  }

  Taro.useDidShow(() => {
    getAddressList()
  })

  const getWechatAddress = () => {
    Taro.chooseAddress({
      success: async function (res) {
        console.log('微信地址', res)
        if (res) {
          const addressInfo = {
            receiverName: res.userName,
            phone: res.telNumber,
            province: res.provinceName,
            city: res.cityName,
            region: res.countyName,
            detail: res.detailInfo,
            postcode: res.postalCode,
            isDefault: false,
          }
          Taro.setStorage({
            key: 'current-wechat-address',
            data: JSON.stringify(addressInfo),
            success: function () {
              Taro.navigateTo({
                url: `${routers.newAddress}?type=addWechatAddress`,
              })
            },
          })
        }
      },
    })
  }

  const updateIsDefault = (address, value) => {
    const curAddresses = addressList.map((item) => {
      if (item.id === address.id) {
        item.isDefault = value
      } else {
        item.isDefault = false
      }
      return item
    })
    setAddressList(curAddresses)
  }

  return (
    <>
      <NavBar navbarTitle="地址管理" isNeedBack backEvent={()=>{
        // 在选择默认地址后，返回到结算页面，应该默认选择地址
        Taro.navigateBack()
        // Taro.redirectTo({ url: routers.checkout })
      }}/>
      <View className="index p-2 min-h-screen bg-gray-eee">
        {addressList.map((item: Address) => (
          <AddressItem
            addressInfo={item}
            delAddressSuccess={() => getAddressList()}
            isDefaultUpdateSuccess={updateIsDefault}
          />
        ))}
        <View className="m-0 flex flex-row items-center mt-2 h-20">
          <View className="flex flex-row m-auto border-none">
            <Button
              className="text-xs h-8 bg-white mr-3 flex items-center text-gray-400"
              onClick={() => {
                Taro.navigateTo({
                  url: routers.newAddress,
                })
              }}
            >
              <Text>+&nbsp; </Text>新增地址
            </Button>
            <Button
              className="text-xs h-8 bg-white flex items-center text-gray-400 border-none"
              onClick={() => getWechatAddress()}
            >
              <Text>+&nbsp; </Text>获取微信收货地址
            </Button>
          </View>
        </View>
      </View>
    </>
  )
}

export default Index
