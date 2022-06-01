import CommonTitle from '@/components/creatSubscription/CommonTitle'
import { getSubscriptionScheduleNextDelivery } from '@/framework/api/subscription/subscription'
import { deliveryDetailAtom } from '@/store/subscription'
import { View, Picker, Text, Button } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { useRequest } from 'ahooks'
import { useAtom } from 'jotai'
import moment from 'moment'
import { useState } from 'react'
import { AtList, AtListItem, AtModal, AtModalAction, AtModalContent, AtModalHeader } from 'taro-ui'
import './index.less'

const DeliveryProgress = () => {
    const [errorTips, setErrorTips] = useState(false)
    const [deliveryDetail, setDeliveryDetail] = useAtom(deliveryDetailAtom)
    const { router } = getCurrentInstance()
    const { userInfo } = Taro.getStorageSync('wxLoginRes')
    const [open, setOpen] = useState(false)
    console.log('deliveryDetail', Taro.getStorageSync('wxLoginRes'))
    const { data, run } = useRequest(async (date) => {
        const params = {
            id: router?.params?.id,
            nextDeliveryDate: date,
            operator: userInfo?.nickName
        }
        const res = await getSubscriptionScheduleNextDelivery(params)
    }, {
        manual: true
    })
    const handleDate = (e) => {
        console.info(' e.detail.value', e.detail.value)
        setDeliveryDetail({ ...deliveryDetail, nextDeliveryTime: e.detail.value })

        // 报错需要弹出提示框
        // setErrorTips(true)
    }

    const immediateDelivery = () => {
        setDeliveryDetail({ ...deliveryDetail, nextDeliveryTime: moment().format('YYYY-MM-DD') })
        setOpen(true)
    }

    const copyText = (data) => {
        Taro.setClipboardData({
            data,
        })
    }

    return <View className="delivery-progress rc-content-bg">
        <View className=" px-3 bg-white rounded-md pb-3">
            <CommonTitle title="下次发货" />
            <View className='text-26 mt-3'>
                <View className="mb-2">皇家英国短毛猫成猫全价粮</View>
                <View>第1包</View>
                <View>{moment(deliveryDetail?.nextDeliveryTime).format('YYYY-MM-DD')}</View>
            </View>
            <View className=" mt-3 flex justify-end text-white text-26">
                <View className="bg-primary-red py-1 px-4 ml-4 rounded-full"
                    onClick={immediateDelivery}>立即发货</View>
                <View className="bg-primary-red py-1 px-4 ml-4 rounded-full relative">选择日期
                    <Picker className="absolute left-0 right-0 bottom-0 top-0" mode='date' onChange={handleDate} start={moment().format("YYYY-MM-DD")}>
                        <AtList>
                            <AtListItem />
                        </AtList>
                    </Picker>
                </View>


            </View>
        </View>
        <View className=" px-3 mt-3 bg-white  rounded-md  pb-3">

            <CommonTitle title="发货记录" />
            {
                deliveryDetail?.completedDeliveries?.length ? <View className='text-26 mt-3'>
                    <View className='my-2 record '>
                        <View className='flex flex-row py-2 justify-between  px-2'>
                            <View className='flex flex-row  '>
                                <View className='text-rc22 text-textGray'>订单编号:{deliveryDetail?.no}</View>
                                <View className='bg-rc_EAEAEA text text-rc_222222 h-rc33 w-rc61 text-center text-rc22 ml-1' onClick={(e) => {
                                    e.stopPropagation()
                                    copyText(deliveryDetail.no)
                                }}>复制</View>
                            </View>
                            <View className='text-primary-red text-rc22'>第3包</View>
                        </View>
                        <View className='Descborder p-2'>
                            <View className='flex  border-red-400 items-center'>
                                <View className='h-rc169 w-rc163 bg-primary-red' />
                                <View className='flex-1'>
                                    <View className='text-rc33 text-rc_222222 mt-2 ml-1'>皇家口腔护理成猫全价粮</View>
                                    <View className='flex flex-row justify-between my-2'>
                                        <View className='flex flex-row '>
                                            <View className='age mx-1'>适用年龄:4-12月</View>
                                            <View className='age '>适用年龄:4-12月</View>
                                        </View>
                                        <View className='text-rc22 text-textGray mr-1'>x1</View>
                                    </View>
                                    <View className='text-rc26 text-textGray ml-1'>规格:2kg</View>
                                    {deliveryDetail?.freshType === 'FRESH_100_DAYS' ? <View className="text-rc26 text-textGray ml-1 mt-1">新鲜度：100天</View> : null}

                                </View>
                            </View>
                        </View>
                        <View className='text-rc24 text-rc_666666 leading-rc72 text-right pr-2'>
                            发货日期:2022-08-23
                        </View>
                    </View>
                </View> : <Text>暂无发货记录</Text>
            }

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
        <AtModal isOpened={open} onClose={() => setOpen(false)}>
            <AtModalContent>
                <View className='text-rc34 text-rc_000000 font-medium'>提示</View>
                <View className='text-rc34 text-rc_999999' >确认立即发货</View>

            </AtModalContent>
            <AtModalAction><Button onClick={() => {
                run(deliveryDetail.nextDeliveryTime)
                setOpen(false)
            }}>确定</Button> <Button onClick={() => setOpen(false)}>取消</Button>  </AtModalAction>
        </AtModal>
    </View>
}
export default DeliveryProgress