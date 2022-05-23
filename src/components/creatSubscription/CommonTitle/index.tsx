import { Text, View } from '@tarojs/components'
import './index.less'

interface Props {
    title: string
}
const CommonTitle = ({ title }: Props) => {
    return <View className="flex justify-between items-center h-8 common-title" >
        <View className="h-full">
            <Text className="font-bold mr-2 list-item-title">{title}</Text>
            {/* <Text className="px-4 rounded-md text-white text-28" style={{ background: 'rgb(229,195,118)' }}>季卡</Text> */}
        </View>
        {/* <View className="text-28 flex-1 border-t-0 border-r-0 border-l-0 border-b justify-end text-right border-solid border-gray-200 h-full flex items-center" onClick={() => {
            Taro.navigateTo({ url: `/pages/packageB/deliveryManagement/index` })
        }}>
            发货管理<AtIcon value="chevron-right" size="20" color='#666666' />
        </View> */}
    </View >
}

export default CommonTitle