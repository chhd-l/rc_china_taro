import { normalizeTags } from '@/framework/api/lib/normalize'
import { Text, View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtButton, AtIcon, AtProgress } from 'taro-ui'
import './index.less'
const SubList = () => {
    const handleClick = () => {

    }
    return <View className="px-2 sub-list">
        <View style="background:#f8f8f8" className="px-2 pb-2 rounded-sm">
            <View className="flex justify-between items-center h-8" >
                <View clssName="h-full">
                    <Text className="font-bold mr-2 list-item-title">我的新鲜购</Text>
                    <Text className="px-4 rounded-md text-white text-28" style={{ background: 'rgb(229,195,118)' }}>季卡</Text>
                </View>
                <View className="text-28 flex-1 border-t-0 border-r-0 border-l-0 border-b justify-end text-right border-solid border-gray-200 h-full flex items-center" onClick={() => {
                    Taro.navigateTo({ url: `/pages/packageB/deliveryManagement/index` })
                }}>
                    发货管理<AtIcon value="chevron-right" size="20" color='#666666' />
                </View>
            </View>
            <View>
                {[{ goodsAttributeAndValues: ['适用年龄：1-7岁'], feedingDays: [], skuName: '测试一下', pic: '' }].map((el, index) => <View>
                    <View key={index} className="w-full h-20 flex mb-4">
                        <View className="w-28 h-full">
                            <Image className="w-full h-full" src={el?.pic} />
                        </View>
                        <View className="w-full h-full flex flex-col pl-3 justify-between">
                            <View>
                                <View className="text-xs font-black mb-1 mt-2">{el?.skuName}</View>
                                <View className="text-primary-red flex ProductIntroduction justify-between items-center">
                                    <View className="flex flex-row flex-wrap">
                                        {(normalizeTags(el?.goodsAttributeAndValues, el?.feedingDays) || el?.goodsAttributeAndValues).map((tag) => (
                                            <View className="px-1 border rounded-lg border-solid border-red mr-2 mt-2">{tag}</View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                            <View className="flex">
                                <View className="bg-primary-red  w-3 h-3 rounded-full flex justify-center items-center">
                                    <View className="bg-primary-red rounded-full border-1 border-solid border-white w-2 h-2"></View>
                                </View>
                                <View className="text-primary-red font-bold text-xs ml-2">剩余：3包</View>
                            </View>
                        </View>
                    </View>
                    <View className="text-right text-28">下一包将在2022-03-18发货</View>
                    <View className="px-3">
                        <View className="  my-2" >
                            <AtProgress percent={75} strokeWidth={16} isHidePercent={true} color="#d33024" />
                        </View>
                        <AtButton
                            type='primary'
                            onClick={handleClick}
                        >
                            一键续订
                        </AtButton>
                    </View>
                </View>)}
            </View>
        </View>
    </View>
}
export default SubList