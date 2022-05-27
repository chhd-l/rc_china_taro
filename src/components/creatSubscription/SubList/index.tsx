import { normalizeCartData, normalizeTags } from '@/framework/api/lib/normalize'
import routers from '@/routers'
import { Text, View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import moment from 'moment'
import { AtButton, AtIcon, AtProgress } from 'taro-ui'
import './index.less'

const SubList = ({ children }) => {
    console.log('children', children)
    const handleClick = () => {
        let buyInfo = { ...children }
        let {
            birthday, breedCode, breedName, gender, id, image, name, type
        } = buyInfo.pet
        let { cycle, type: subType, freshType, goodsList, benefits: giftList } = buyInfo
        const checkoutData = {
            type: subType,
            cycle: { cycle, quantity: goodsList[0].goodsVariants?.[0]?.num },
            freshType,
            pet: {
                birthday, breedCode, breedName, gender, id, image, name, type
            },
            goodsList: goodsList.map(el => normalizeCartData({ goodsNum: el?.goodsVariants?.[0]?.num }, el, true)),
            isSubscription: true,
            giftList: giftList?.map(el => normalizeCartData({ goodsNum: el?.goodsVariants?.[0]?.num }, el, true)) || [],
            couponList: [],
        }
        console.info('.....', checkoutData)
        Taro.setStorage({
            key: 'select-product',
            data: JSON.stringify(checkoutData),
            complete: (respon) => {
                console.log(respon)
                Taro.navigateTo({ url: routers.checkout })
            },
        })
    }
    return <View className="px-2 sub-list">
        <View style="background:#f8f8f8" className="px-2 pb-2 rounded-sm">
            <View className="flex justify-between items-center h-8" >
                <View className="h-full">
                    <Text className="font-bold mr-2 list-item-title">我的新鲜购</Text>
                    <Text className="px-4 rounded-md text-white text-28" style={{ background: 'rgb(229,195,118)' }}>季卡</Text>
                </View>
                <View className="text-28 flex-1 border-t-0 border-r-0 border-l-0 border-b justify-end text-right border-solid border-gray-200 h-full flex items-center" onClick={() => {
                    Taro.navigateTo({ url: `/pages/packageB/deliveryManagement/index?id=${children?.id}` })
                }}>
                    发货管理<AtIcon value="chevron-right" size="20" color='#666666' />
                </View>
            </View>
            <View>
                {children?.goodsList?.map((el, index) => {
                    const { goodsVariants } = el
                    return <View key={el.spuNo} >
                        <View key={index} className="w-full h-20 flex mb-4">
                            <View className="w-28 h-full">
                                <Image className="w-full h-full" src={goodsVariants?.defaultImage} />
                            </View>
                            <View className="w-full h-full flex flex-col pl-3 justify-between">
                                <View>
                                    <View className="text-rc26 font-black mb-1 mt-2">{goodsVariants?.name}</View>
                                    <View className="text-primary-red flex ProductIntroduction justify-between items-center">
                                        <View className="flex flex-row flex-wrap">
                                            {(normalizeTags(el?.goodsAttributeValueRel, goodsVariants?.feedingDays) || el?.goodsAttributeValueRel).map((tag) => (
                                                <View key={tag} className="px-1 border rounded-lg border-solid border-red mr-2 mt-2 text-rc20">{tag}</View>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                                <View className="flex">
                                    <View className="bg-primary-red  w-3 h-3 rounded-full flex justify-center items-center">
                                        <View className="bg-primary-red rounded-full border-1 border-solid border-white w-2 h-2"></View>
                                    </View>
                                    <View className="text-primary-red font-bold text-rc22 ml-2">剩余：{children.totalDeliveryTimes - children.currentDeliverySequence}包</View>
                                </View>
                            </View>
                        </View>
                        <View className='flex flex-row text-rc20 justify-between'>
                            <View>订阅编号:{children?.no}</View>
                            <View>下一包将在{moment(children?.nextDeliveryTime).format('YYYY-MM-DD')}发货</View>
                        </View>
                        <View className="px-3">
                            <View className="  my-2" >
                                <AtProgress percent={75} strokeWidth={16} isHidePercent color="#d33024" />
                            </View>
                            <AtButton
                                type='primary'
                                onClick={handleClick}
                            >
                                一键续订
                            </AtButton>
                        </View>
                    </View>
                }

                )}
            </View>
        </View>
    </View >
}
export default SubList