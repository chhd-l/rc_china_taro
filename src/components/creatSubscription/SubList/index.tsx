import { normalizeCartData, normalizeTags } from '@/framework/api/lib/normalize'
import IconFont from '@/iconfont'
import routers from '@/routers'
import { Text, View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import moment from 'moment'
import cloneDeep from 'lodash.cloneDeep'
import { getCycleItem } from '@/utils/utils'
import { AtIcon, AtProgress } from 'taro-ui'
import './index.less'

const cycleObj = {
  QUARTER: '季卡',
  HALF_YEAR: '半年卡',
  YEAR: '年卡',
}
export const handleBuyMore = (children) => {
  let buyInfo = cloneDeep(children)
  let { birthday, breedCode, breedName, gender, id, image, name, type } = buyInfo.pet
  let { cycle, type: subType, freshType, goodsList, benefits: giftList } = buyInfo
  goodsList?.forEach((el) => {
    el.goodsVariant = [el.goodsVariant]
  })
  giftList?.forEach((el) => {
    el.goodsVariant = [el.goodsVariant]
  })
  let { originalPrice, discountPrice } = getCycleItem(goodsList[0].goodsVariant?.[0], cycle)
  const checkoutData = {
    type: subType,
    cycle: { cycle, quantity: goodsList[0].goodsVariant?.[0]?.num, originalPrice, discountPrice },
    freshType,
    pet: {
      birthday,
      breedCode,
      breedName,
      gender,
      id,
      image,
      name,
      type,
    },
    goodsList: goodsList.map((el) => normalizeCartData({ goodsNum: el?.goodsVariant?.[0]?.num }, el, true)),
    isSubscription: true,
    giftList: giftList?.map((el) => normalizeCartData({ goodsNum: el?.goodsVariant?.[0]?.num }, el, true)) || [],
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
const SubList = ({ children }) => {
  const handleClick = () => {
    handleBuyMore(children)
  }
  const copyText = (data) => {
    Taro.setClipboardData({
      data,
    })
  }

  return children?.goodsList?.map((el) => {
    const { goodsVariant = {} } = el
    console.info('planingDeliveriesplaningDeliveriesplaningDeliveries', children?.planingDeliveries)
    return (
      <View className="px-2 sub-list " key={el.spuNo} style={{ margin: '20px 0' }}>
        <View style={{ background: '#f8f8f8' }} className="px-2 pb-2 rounded-sm">
          <View className="flex justify-between items-end h-8">
            <View className="h-full flex flex-row items-end">
              <View className="font-bold mr-2 list-item-title" style={{ lineHeight: 1 }}>
                我的新鲜购
              </View>
              {children?.cycle ? <View className="card">{cycleObj[children?.cycle]}</View> : null}
            </View>
            <View
              style={{ lineHeight: 1 }}
              className="text-22 flex-1 justify-end text-right  h-full flex items-end"
              onClick={() => {
                Taro.navigateTo({ url: `/pages/packageB/deliveryManagement/index?id=${children?.id}` })
              }}
            >
              发货管理
              <AtIcon
                value="chevron-right"
                size="16"
                color="#666666"
                customStyle={{ position: 'relative', top: '3px' }}
              />
            </View>
          </View>
          <View className="mt-2">
            <View className="mt-4   border-gray-200" style={{ borderTop: '1px solid #E2E2E2' }}>
              <View className="w-full  flex  items-center" style={{ minHeight: '5rem' }}>
                <View className="w-rc163 h-rc163">
                  <Image className="w-full h-full" src={goodsVariant?.defaultImage} />
                </View>
                <View className="flex flex-col pl-3 justify-center py-2">
                  <View>
                    <View className="text-rc24 mb-1">{goodsVariant?.name}</View>
                    <View className="text-primary-red flex  justify-between items-center">
                      <View className="flex flex-row flex-wrap">
                        {(
                          normalizeTags(el?.goodsAttributeValueRel, goodsVariant?.feedingDays) ||
                          el?.goodsAttributeValueRel
                        ).map((tag) => (
                          <View
                            key={tag}
                            className="px-rc12 py-rc6 border rounded-lg border-solid border-red mr-2  text-rc20"
                          >
                            {tag}
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                  <View className="flex flex-row items-center mt-3">
                    <IconFont name="shengyushu" size={20} />
                    <View className="text-primary-red font-bold text-rc22 ml-2">
                      剩余：{children.totalDeliveryTimes - children.currentDeliveredSequence}包
                    </View>
                  </View>
                  {children.freshType === 'FRESH_100_DAYS' ? (
                    <View className="text-rc22 text-textGray mt-2">新鲜度：100天</View>
                  ) : null}
                </View>
              </View>
              <View
                className="flex flex-row text-rc20 justify-between text-rc_666666 mb-3 pt-2"
                style={{ borderTop: '1px solid #E2E2E2' }}
              >
                <View className="flex">
                  <View>订阅编号:{children?.no} </View>
                  <View
                    className="bg-rc_EAEAEA text text-rc_222222 h-rc33 w-rc61 text-center text-rc22 ml-1 copy"
                    onClick={(e) => {
                      e.stopPropagation()
                      copyText(children?.no)
                    }}
                  >
                    复制
                  </View>
                </View>
                {children?.status === 'COMPLETED' ? null : (
                  <View>
                    下一包将在{moment(children?.planingDeliveries?.[0]?.shipmentDate || undefined).format('YYYY-MM-DD')}
                    发货
                  </View>
                )}
              </View>
              <View className=" my-2 px-1">
                <AtProgress
                  percent={Math.ceil((children.currentDeliveredSequence * 100) / children.totalDeliveryTimes)}
                  strokeWidth={6}
                  isHidePercent
                  color="#d33024"
                />
              </View>
              <View className="flex justify-end">
                <View className="RenewButton" onClick={handleClick}>
                  一键续订
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  })
}
export default SubList
