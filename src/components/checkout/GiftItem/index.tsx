import { View, Text, Image } from '@tarojs/components'
import { formatMoney } from '@/utils/utils'
const GiftItem = ({ product }: { product: any }) => {
    const { goodsNum } = product
    const { image, price, specs, tags, name } = product.localData

    return (
        <View className="flex flex-row justify-between items-center mt-4 p-2">
            <View style={{ width: '150rpx', height: '150rpx' }}>
                <Image
                    style="width:150rpx; height: 150rpx;border: 1px solid #f0f0f0"
                    lazyLoad
                    src={image}
                />
            </View>
            <View className="w-full pl-2">
                <View className="font-semibold text-32 text-black">{name}<Text className="px-1 text-28 font-normal bg-primary-red text-white ml-1">赠品</Text></View>
                <View>
                    {tags.map((el) => (
                        <View className="text-24 text-gray-400 mt-1">{el}</View>
                    ))}
                </View>
                <View className="flex flex-row justify-between pr-4 mt-1 items-end">
                    <Text className="text-primary-red">{formatMoney(price)}</Text>
                    <Text className="text-xs text-gray-400">x {goodsNum}</Text>
                </View>
            </View>
        </View>
    )
}
export default GiftItem