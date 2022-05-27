import { normalizeCartData, normalizeTags } from '@/framework/api/lib/normalize'
import IconFont from '@/iconfont'
import routers from '@/routers'
import { Text, View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import moment from 'moment'
import { AtButton, AtIcon, AtProgress } from 'taro-ui'
import './index.less'
import cloneDeep from 'lodash.cloneDeep'
import { getCycleItem } from '@/utils/utils'

const SubList = ({ children }) => {
    console.log('children', children)

    const handleClick = () => {
        let buyInfo = cloneDeep(children)
        let {
            birthday, breedCode, breedName, gender, id, image, name, type
        } = buyInfo.pet
        let { cycle, type: subType, freshType, goodsList, benefits: giftList } = buyInfo
        goodsList?.forEach(el => {
            el.goodsVariants = [el.goodsVariants]
        })
        giftList?.forEach(el => {
            el.goodsVariants = [el.goodsVariants]
        })
        let { originalPrice, discountPrice } = getCycleItem(goodsList[0].goodsVariants?.[0], cycle)
        const checkoutData = {
            type: subType,
            cycle: { cycle, quantity: goodsList[0].goodsVariants?.[0]?.num, originalPrice, discountPrice },
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
    return children?.goodsList?.map((el) => {
        const { goodsVariants } = el
        return <View className="px-2 sub-list " key={el.spuNo} style={{ margin: '20px 0' }}>
            <View style={{ background: '#f8f8f8' }} className="px-2 pb-2 rounded-sm">
                <View className="flex justify-between items-center h-8" >
                    <View className="h-full flex flex-row items-center">
                        <Text className="font-bold mr-2 list-item-title">我的新鲜购</Text>
                        <Text className="card">季卡</Text>
                    </View>
                    <View className="text-28 flex-1 justify-end text-right  h-full flex items-center"
                        onClick={() => {
                            Taro.navigateTo({ url: `/pages/packageB/deliveryManagement/index?id=${children?.id}` })
                        }}>
                        发货管理<AtIcon value="chevron-right" size="20" color='#666666' />
                    </View>
                </View>
                <View className='mt-2'>
                    <View className='mt-4   border-gray-200' style={{ borderTop: '1px solid #E2E2E2' }}>
                        <View className="w-full h-20 flex mb-4  pt-2">
                            <View className="w-rc163 h-rc163">
                                <Image className="w-full h-full" src={goodsVariants?.defaultImage} />
                            </View>
                            <View className="flex flex-col pl-3 justify-between mb-3">
                                <View>
                                    <View className="text-rc26 font-black mb-1">{goodsVariants?.name}</View>
                                    <View className="text-primary-red flex  justify-between items-center">
                                        <View className="flex flex-row flex-wrap">
                                            {(normalizeTags(el?.goodsAttributeValueRel, goodsVariants?.feedingDays) || el?.goodsAttributeValueRel).map((tag) => (
                                                <View key={tag} className="px-rc12 py-rc6 border rounded-lg border-solid border-red mr-2  text-rc20">{tag}</View>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                                <View className="flex flex-row items-center mt-3">
                                    <IconFont name='shengyushu' size={20} />
                                    <View className="text-primary-red font-bold text-rc22 ml-2">剩余：{children.totalDeliveryTimes - children.currentDeliverySequence}包</View>
                                </View>
                            </View>
                        </View>
                        <View className='flex flex-row text-rc20 justify-between text-rc_666666 mt-2 mb-3 pt-2' style={{ borderTop: '1px solid #E2E2E2' }}>
                            <View>订阅编号:{children?.no}</View>
                            <View>下一包将在{moment(children?.nextDeliveryTime).format('YYYY-MM-DD')}发货</View>
                        </View>
                        <View className=" my-2 px-1" >
                            <AtProgress percent={Math.ceil(children.currentDeliverySequence * 100 / children.totalDeliveryTimes)} strokeWidth={6} isHidePercent color="#d33024" />
                        </View>
                        <View className='flex justify-end'>
                            <View className='RenewButton' onClick={handleClick}>一键续订</View>
                        </View>

                    </View>
                </View>
            </View>
        </View >
    }

    )

}
export default SubList