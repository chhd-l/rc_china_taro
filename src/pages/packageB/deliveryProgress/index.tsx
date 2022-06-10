import NavBar from '@/components/common/Navbar'
import CommonTitle from '@/components/creatSubscription/CommonTitle'
import { normalizeTags } from '@/framework/api/lib/normalize'
import { getSubscriptionScheduleNextDelivery } from '@/framework/api/subscription/subscription'
import routers from '@/routers'
import { deliveryDetailAtom } from '@/store/subscription'
import { Image, Picker, Text, View } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { useRequest } from 'ahooks'
import { useAtom } from 'jotai'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { AtList, AtListItem, AtModal } from 'taro-ui'
import './index.less'

let createDeliveryNow = false //立即发货
const DeliveryProgress = () => {
  const [errorTips, setErrorTips] = useState(false)
  const [deliveryDetail, setDeliveryDetail] = useAtom(deliveryDetailAtom)
  const { router } = getCurrentInstance()
  const { userInfo } = Taro.getStorageSync('wxLoginRes')
  const [open, setOpen] = useState(false)
  console.log('deliveryDetail', Taro.getStorageSync('wxLoginRes'))
  const { data, run } = useRequest(
    async (date) => {
      const params = {
        id: router?.params?.id,
        nextDeliveryDate: moment(date),
        createDelivery: createDeliveryNow,
        operator: userInfo?.nickName,
      }
      const res = await getSubscriptionScheduleNextDelivery(params)
      if (res) {
        setDeliveryDetail({ ...deliveryDetail, nextDeliveryTime: date })
        let title = createDeliveryNow ? '已提醒商家发货' : '日期修改成功'
        Taro.showToast({ title, icon: 'success', duration: 2000 })
      }
    },
    {
      manual: true,
    },
  )
  const handleDate = (e) => {
    console.info(' e.detail.value', e.detail.value)
    createDeliveryNow = false
    // setDeliveryDetail({ ...deliveryDetail, nextDeliveryTime: e.detail.value })
    run(e.detail.value)
    // 报错需要弹出提示框
    // setErrorTips(true)
  }

  const toDetail = ({ tradeId }) => {
    debugger
    tradeId &&
      Taro.navigateTo({
        url: `${routers.orderDetail}?id=${tradeId}`,
      })
  }

  const immediateDelivery = () => {
    // setDeliveryDetail({ ...deliveryDetail, nextDeliveryTime: moment().format('YYYY-MM-DD') })
    setOpen(true)
  }

  const copyText = (datas: any) => {
    Taro.setClipboardData({
      data: datas,
    })
  }

  return (
    <View>
      <NavBar navbarTitle="发货进度" isNeedBack />
      <View className="delivery-progress rc-content-bg">
        {deliveryDetail?.status === 'COMPLETED' ? null : (
          <View className=" px-3 bg-white rounded-md pb-3">
            <CommonTitle title="下次发货" />
            <View className="text-26 mt-3">
              <View className="mb-2">
                {deliveryDetail?.planingDeliveries?.[0]?.lineItems?.find((el) => !el.isGift)?.skuName}
              </View>
              <View>第{deliveryDetail?.planingDeliveries?.[0].sequence || 1}包</View>
              <View>{moment(deliveryDetail?.nextDeliveryTime).format('YYYY-MM-DD')}</View>
            </View>
            <View className=" mt-3 flex justify-end text-white text-26">
              <View className="bg-primary-red py-1 px-4 ml-4 rounded-full" onClick={immediateDelivery}>
                立即发货
              </View>
              <View className="bg-primary-red py-1 px-4 ml-4 rounded-full relative">
                选择日期
                <Picker
                  className="absolute left-0 right-0 bottom-0 top-0"
                  mode="date"
                  onChange={handleDate}
                  start={moment().format('YYYY-MM-DD')}
                >
                  <AtList>
                    <AtListItem />
                  </AtList>
                </Picker>
              </View>
            </View>
          </View>
        )}
        <View className=" px-3 mt-3 bg-white  rounded-md  pb-3">
          <CommonTitle title="发货记录" />
          {deliveryDetail?.completedDeliveries?.length ? (
            <View className="text-26 mt-3">
              {deliveryDetail?.completedDeliveries?.map((completedDelivery, idx) => (
                <View key={idx} className="my-2 record ">
                  {/* <View className="flex flex-row py-2 justify-between  px-2">
                    <View className="flex flex-row  ">
                      <View className="text-rc22 text-textGray">订单编号:{completedDelivery?.tradeId}</View>
                      <View
                        className="bg-rc_EAEAEA text text-rc_222222 h-rc33 w-rc61 text-center text-rc22 ml-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          copyText(completedDelivery.tradeId)
                        }}
                      >
                        复制
                      </View>
                    </View>
                    <View className="text-primary-red text-rc22">第{completedDelivery.sequence}包</View>
                  </View> */}
                  <View className="h-6 flex justify-between items-center text-24 py-2  px-2">
                    <View className="flex items-center">
                      {/* {item?.isSubscription ? (
                <View className="mr-2">
                  <IconFont name="a-Group201" size={32} />
                </View>
              ) : null} */}
                      订单编号: {completedDelivery?.tradeId}
                      <View
                        className="ml-2 rounded-2xl text-22 px-2"
                        style={{ background: '#e7e7e7' }}
                        onClick={(e) => {
                          e.stopPropagation()
                          copyText(completedDelivery?.tradeId)
                        }}
                      >
                        复制
                      </View>
                    </View>
                    <View className="text-primary-red text-24">第{completedDelivery.sequence}包</View>
                  </View>
                  <View className="Descborder p-2">
                    {completedDelivery?.lineItems
                      ?.filter((el) => !el.isGift)
                      ?.map((el, index) => (
                        <View
                          key={index}
                          className="w-full flex items-center min-h-20 "
                          style={{ marginBottom: '36rpx' }}
                          onClick={() => {
                            toDetail(completedDelivery)
                          }}
                        >
                          <View className="w-32 h-full" style={{ marginTop: '36rpx' }}>
                            {el?.pic ? (
                              <Image className="w-full h-full" mode="widthFix" src={el?.pic} />
                            ) : (
                              <Image className="w-full h-20" mode="widthFix" src={el?.pic} />
                            )}
                          </View>
                          <View className="w-full h-full flex flex-col pl-3">
                            <View className="text-30 mb-1">{el?.skuName}</View>
                            <View className="text-primary-red flex text-20 justify-between items-center">
                              <View className="flex flex-row flex-wrap">
                                {normalizeTags(el.goodsAttributeAndValues, el.feedingDays).map((tag) => (
                                  <View
                                    className="px-1 border rounded-lg border-solid border-red mr-2"
                                    style={{ marginTop: '1px' }}
                                  >
                                    {tag}
                                  </View>
                                ))}
                              </View>
                              <View className="text-gray-400">X{el?.num}</View>
                            </View>
                            <View className="text-24 mt-2 items-end ProductIntroduction text-gray-400">
                              规格：{el?.goodsSpecifications}
                            </View>
                            {deliveryDetail.freshType === 'FRESH_100_DAYS' ? (
                              <View className="text-24 mt-1 items-end ProductIntroduction text-gray-400">
                                新鲜度：100天
                              </View>
                            ) : null}
                          </View>
                        </View>

                        // <View key={index} className="flex  border-red-400 items-center mb-1">
                        //   <View className="h-rc169 w-rc163 bg-primary-red">
                        //     <Image className="w-full h-full" mode="widthFix" src={el?.pic} />
                        //   </View>
                        //   <View className="flex-1">
                        //     <View className="text-rc28 text-rc_222222  ml-1">{el.skuName}</View>
                        //     <View className="flex flex-row justify-between mb-1">
                        //       <View className="flex flex-row text-rc20">
                        //         {normalizeTags(el.goodsAttributeAndValues, el.feedingDays).map((tag, key) => (
                        //           <View
                        //             key={key}
                        //             className=" text-primary-red px-1 border rounded-lg border-solid border-red mr-2 mt-2"
                        //           >
                        //             {tag}
                        //           </View>
                        //         ))}
                        //         {/* <View className="age mx-1">适用年龄:4-12月</View>
                        //   <View className="age ">适用年龄:4-12月</View> */}
                        //       </View>
                        //       <View className="text-rc22 text-textGray mr-1">x{el.num}</View>
                        //     </View>
                        //     <View className="text-rc22 text-textGray ml-1">
                        //       {el?.goodsSpecifications ? `规格:${el?.goodsSpecifications}` : ''}
                        //     </View>
                        //     {deliveryDetail?.freshType === 'FRESH_100_DAYS' ? (
                        //       <View className="text-rc26 text-textGray ml-1 mt-1">新鲜度：100天</View>
                        //     ) : null}
                        //   </View>
                        // </View>
                      ))}
                  </View>
                  <View className=" text-24 leading-rc72 text-right pr-2">
                    发货日期:{moment(completedDelivery?.shipmentDate).format('YYYY-MM-DD')}
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text style={{ color: '#999999', fontSize: '11px' }}>暂无发货记录</Text>
          )}
        </View>
        <AtModal
          key="tipsModal"
          isOpened={errorTips}
          title="提示"
          content="修改下一包商品发货时间失败，请稍后再试！"
          confirmText="确定"
          onClose={() => {
            setErrorTips(false)
          }}
          onCancel={() => {
            setErrorTips(false)
          }}
          onConfirm={() => {
            setErrorTips(false)
          }}
          className="error-tips-modal"
        />
        <AtModal
          key="shipnow"
          isOpened={open}
          title="提示"
          content="确认立即发货"
          confirmText="确定"
          cancelText="取消"
          onClose={() => {
            setOpen(false)
          }}
          onCancel={() => {
            setOpen(false)
          }}
          onConfirm={() => {
            createDeliveryNow = true
            run(moment()?.format('YYYY-MM-DD'))
            setOpen(false)
          }}
          className="rc_modal"
        />
        {/* <AtModal isOpened={open} onClose={() => setOpen(false)}>
          <AtModalContent>
            <View className="text-rc34 text-rc_000000 font-medium">提示</View>
          </AtModalHeader>
          <AtModalContent>
            <View className="text-rc34 text-rc_999999">确认立即发货</View>
          </AtModalContent>
          <AtModalAction>
            <Button
              style={{ color: 'rgba(220, 38, 38) !important' }}
              onClick={() => {
                run(deliveryDetail.nextDeliveryTime)
                setOpen(false)
              }}
            >
              确定
            </Button>{' '}
            <Button onClick={() => setOpen(false)}>取消</Button>{' '}
          </AtModalAction>
        </AtModal> */}
      </View>
    </View>
  )
}
export default DeliveryProgress
