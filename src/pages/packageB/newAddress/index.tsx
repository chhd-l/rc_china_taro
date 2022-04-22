import { Radio, View, Text } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { AtForm, AtInput, AtButton, AtTextarea } from 'taro-ui'
import { Address } from '@/framework/types/customer'
import RegionPicker from '@/components/common/WePicker/index'
import { createAddress, updateAddress } from '@/framework/api/customer/address'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { pickForUpdate } from '@/utils/utils'
import './index.less'

const Index = () => {
  const { router } = getCurrentInstance()
  const [addressInfo, setAddressInfo] = useState<Address>({
    receiverName: '',
    phone: '',
    province: '',
    city: '',
    region: '',
    detail: '',
    isDefault: false,
  })
  const [address, setAddress] = useState(['浙江省', '杭州市', '滨江区'])
  const { province, city, region } = addressInfo
  const [initData, setInitData] = useState(null)

  const [WPickerRef, setWPickerRef] = useState({
    show: () => {},
  })

  const onRef = (ref) => {
    console.log('ref', ref)
    setWPickerRef(ref)
  }

  const onConfirm = (res: any) => {
    console.log(res)
    const { obj } = res
    setAddressInfo({
      ...addressInfo,
      province: obj.province.label,
      city: obj.city.label,
      region: obj.area.label,
    })
    setAddress([obj.province.label, obj.city.label, obj.area.label])
  }
  const onCancel = () => {}

  const updateAddressInfo = (value: any, name: string) => {
    setAddressInfo({ ...addressInfo, [name]: value })
  }

  const saveNewAddress = async () => {
    if (router?.params.type === 'edit') {
      let params = pickForUpdate(addressInfo, initData)
      await updateAddress({
        params: Object.assign(params),
      })
    } else {
      await createAddress(
        Object.assign(addressInfo, {
          operator: 'master',
        }),
      )
    }
    Taro.redirectTo({ url: '/pages/packageB/addressManage/index' })
  }

  useEffect(() => {
    if (router?.params.type === 'edit') {
      //编辑
      Taro.getStorage({
        key: 'current-address',
        success: function (response) {
          console.log(response)
          if (response?.data) {
            const data = JSON.parse(response.data)
            setAddressInfo(data)
            setInitData(data)
          }
        },
      })
    } else {
      //新增地址不用获取微信地址
      // Taro.chooseAddress({
      //   success: function (res) {
      //     console.log(res)
      //     if (res?.userName) {
      //       setAddressInfo({
      //         ...addressInfo,
      //         receiverName: res.userName,
      //         phone: res.telNumber,
      //         province: res.provinceName,
      //         city: res.cityName,
      //         region: res.countyName,
      //         detail: res.detailInfo,
      //         postcode: res.postalCode,
      //       })
      //       setAddress([res.provinceName, res.cityName, res.countyName])
      //     }
      //   },
      // })
    }
  }, [])

  return (
    <View className="index bg-gray-200 p-2 h-screen">
      <AtForm className="p-2" onSubmit={() => saveNewAddress()}>
        <View className=" bg-white">
          <AtInput
            name="receiverName"
            title="收货人"
            type="text"
            placeholder="请输入姓名"
            value={addressInfo['receiverName']}
            onChange={(value) => updateAddressInfo(value, 'receiverName')}
          />
          <AtInput
            name="phone"
            title="联系电话"
            type="text"
            placeholder="请输入联系电话"
            value={addressInfo['phone']}
            onChange={(value) => updateAddressInfo(value, 'phone')}
          />
          <View className="pl-3 py-2 text-32">
            <Text>所在地区</Text>
            <Text
              onClick={() => {
                console.log('WPickerRef', WPickerRef)
                WPickerRef.show()
              }}
              className={`${province ? '' : 'text-gray-300'} ml-7`}
            >
              {province ? province + ',' + city + ',' + region : '省,市,区'}
            </Text>
          </View>
          <RegionPicker
            mode="region"
            value={address}
            defaultType="label"
            hideArea={false}
            confirm={(res) => onConfirm(res)}
            cancel={onCancel}
            onRef={onRef}
          />
          <AtTextarea
            value={addressInfo['detail']}
            onChange={(value) => updateAddressInfo(value, 'detail')}
            maxLength={200}
            placeholder="请输入详细地址"
            count={false}
            className="ml-1 border-0 border-t-0 rc-text-area"
          />
          <Radio
            value="0"
            checked={Boolean(addressInfo.isDefault)}
            onClick={() => updateAddressInfo(!addressInfo.isDefault, 'isDefault')}
            style={{ transform: 'scale(0.6)' }}
            color="red"
            className="mt-2 text-48 -ml-4"
          >
            默认地址
          </Radio>
        </View>
      </AtForm>
      <View className="mt-2 flex justify-center">
        <AtButton className="bg-red-500 rc-button text-white w-20" formType="submit" onClick={saveNewAddress}>
          保存
        </AtButton>
      </View>
    </View>
  )
}

export default Index
