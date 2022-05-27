import { Text, View } from '@tarojs/components'
import { PropsWithChildren } from '@tarojs/taro';
import './index.less'

type Props = PropsWithChildren<{
    title: string;
}>
const CommonTitle = ({ title, children }: Props) => {
    return <View className="flex justify-between items-center h-8 common-title py-4" >
        <View className="h-full flex flex-row items-end w-full justify-between">
            <Text className="font-bold mr-2 list-item-title">{title}</Text>
            {children}
        </View>
    </View >
}

export default CommonTitle