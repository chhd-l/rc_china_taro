import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AddressItem } from '@/components/customer'
import { useEffect, useState } from 'react'
import { Address } from '@/framework/types/customer'
import { createAddress, getAddresses } from '@/framework/api/customer/address'
import './index.less'

const Index = () => {
  const [addressList, setAddressList] = useState<Address[]>([])

  const getAddressList = async () => {
    const res = await getAddresses()
    console.log("res",res)
    setAddressList(res)
  }

  useEffect(() => {
    // Taro.getStorage({
    //   key: "addressList",
    //   success: function (res) {
    //     const data = JSON.parse(res.data);
    //     console.log("addressList", data);
    //     setAddressList(data);
    //   },
    // });
    getAddressList()
  }, [])

  const getWechatAddress = () => {
    Taro.chooseAddress({
      success: async function (res) {
        console.log('微信地址', res)
        await createAddress({
          receiverName: res.userName,
          phone: res.telNumber,
          province: res.provinceName,
          city: res.cityName,
          region: res.countyName,
          detail: res.detailInfo,
          postcode: res.postalCode,
          isDefault: false,
          operator: 'master',
        })
      },
    })
  }

  return (
    <View style={{ backgroundColor : "#EFEFEF" }} className="index bg-gray-50 p-2 h-screen">
      {addressList.map((item: Address) => (
        <AddressItem addressInfo={item} delAddressSuccess={() => getAddressList()} />
      ))}
      <View className="m-0 flex flex-row items-center mt-2 h-20">
        <View className="flex flex-row m-auto border-none">
          <Button
            className="text-sm h-8 bg-white mr-3 flex items-center text-gray-400"
            onClick={() => {
              Taro.navigateTo({
                url: '/pages/packageB/newAddress/index',
              })
            }}
          >
            <Text className="text-xl">+</Text>新增地址
          </Button>
          <Button className="text-sm h-8 bg-white flex items-center text-gray-400 border-none" onClick={() => getWechatAddress()}>
            <Text className="text-xl">+</Text>获取微信收货地址
          </Button>
        </View>
      </View>
    </View>
  )
}

export default Index
