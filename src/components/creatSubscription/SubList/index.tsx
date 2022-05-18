import { normalizeTags } from '@/framework/api/lib/normalize'
import { Text, View, Image } from '@tarojs/components'

const SubList = () => {
    return <View>
        <View>
            <View>我的新鲜购<Text>季卡</Text></View>
            <View>
                发货管理
            </View>
        </View>
        <View>
            {[{ goodsAttributeAndValues: [], feedingDays: [], skuName: '测试一下', pic: '' }].map((el, index) => <View key={index} className="w-full h-20 flex mb-4">
                <View className="w-28 h-full">
                    <Image className="w-full h-full" src={el?.pic} />
                </View>
                <View className="w-full h-full flex flex-col pl-3">
                    <View className="text-xs font-black mb-1">{el?.skuName}</View>
                    <View className="text-primary-red flex ProductIntroduction justify-between items-center">
                        <View className="flex flex-row flex-wrap">
                            {normalizeTags(el?.goodsAttributeAndValues, el?.feedingDays).map((tag) => (
                                <View className="px-1 border rounded-lg border-solid border-red mr-2 mt-2">{tag}</View>
                            ))}
                        </View>
                    </View>
                    <View>剩余：3包</View>
                </View>
            </View>)}
        </View>
    </View>
}
export default SubList