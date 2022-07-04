import { Image, Picker, Text, View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { useState } from 'react'
import { TO_SHIP_ORDER_ICON } from '@/lib/constants'
import moment from 'moment'

const DeliveryTime = ({ changeDeliveryDate }: { changeDeliveryDate: Function }) => {
  const [deliveryTime, setDeliveryTime] = useState(moment().format('YYYY-MM-DD'))

  const onDateChange = (e) => {
    setDeliveryTime(e.detail.value)
    changeDeliveryDate && changeDeliveryDate(e.detail.value)
  }

  return (
    <View className="bg-white mt-2 pl-2 py-2 rounded">
      <Picker mode="date" start={moment().format('YYYY-MM-DD')} value={deliveryTime} onChange={onDateChange}>
        <View className="flex flex-row justify-between items-center">
          <View className="text-26 flex flex-row items-center">
            <Image className="w-5 h-5 mr-2" src={TO_SHIP_ORDER_ICON} />
            发货时间
          </View>
          <View>
            <View>
              <Text className="text-26 text-gray-400">{deliveryTime}</Text>
              <AtIcon value="chevron-right" size="24" color="#666666" />
            </View>
          </View>
        </View>
      </Picker>
    </View>
  )
}
export default DeliveryTime
