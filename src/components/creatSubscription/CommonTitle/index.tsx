import { Text, View } from '@tarojs/components'
import { PropsWithChildren } from '@tarojs/taro';
import './index.less'

type Props = PropsWithChildren<{
    title: string;
}>
const CommonTitle = ({ title, children }: Props) => {
    return <View className="flex justify-between items-center h-8 common-title py-4" >
        <View className="h-full flex flex-row">
            <Text className="font-bold mr-2 list-item-title">{title}</Text>
            {children}
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