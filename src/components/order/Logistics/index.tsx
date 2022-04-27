import { View } from '@tarojs/components'
import { DeliveryInfo } from '@/framework/types/order'
import './index.less'

const OrderLogistics = ({ logistics }: { logistics: DeliveryInfo[] }) => {
  return (
    <View className="flex flex-col bg-white py-2 pl-8 pr-2 text-24 h-48 overflow-y-scroll">
      {logistics.map((item) => (
        <View className="flex flex-col mt-2 text-gray-500">
          <View>{item.context}</View>
          <View>{item.time}</View>
        </View>
      ))}
    </View>
  )
}

export default OrderLogistics
