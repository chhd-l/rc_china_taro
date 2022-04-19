import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { AddressItem } from '@/components/customer'
import { useEffect, useState } from 'react'
import { Address } from '@/framework/types/customer'
import { createAddress, getAddresses } from '@/framework/api/customer/address'
import './index.less'

const Index = () => {
  const [addressList, setAddressList] = useState<Address[]>([])

  const getAddressList = async () => {
    const res = await getAddresses({
      customerId: 'e5edfa8c-ff05-cee0-45af-5c9e69d1b162',
    })
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
          customerId: 'e5edfa8c-ff05-cee0-45af-5c9e69d1b162',
          operator: 'master',
          storeId: '1',
        })
      },
    })
  }

  return (
    <View className="index bg-gray-200 p-2">
      {addressList.map((item: Address) => (
        <AddressItem addressInfo={item} />
      ))}
      <View className="m-0 flex flex-row justify-end mt-2">
        <Button
          className="text-xs m-0 h-6 bg-white mr-2 flex items-center text-gray-400"
          onClick={() => {
            Taro.navigateTo({
              url: '/pages/packageB/newAddress/index',
            })
          }}
        >
          +新增地址
        </Button>
        <Button className="text-xs m-0 bg-white flex items-center text-gray-400" onClick={() => getWechatAddress()}>
          +获取微信收货地址
        </Button>
      </View>
    </View>
  )
}

export default Index
