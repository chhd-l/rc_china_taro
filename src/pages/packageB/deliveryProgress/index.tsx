import CommonTitle from '@/components/creatSubscription/CommonTitle'
import { View, Picker } from '@tarojs/components'
import { useState } from 'react'
import { AtButton, AtList, AtListItem, AtModal } from 'taro-ui'
import './index.less'
const DeliveryProgress = () => {
    const [errorTips, setErrorTips] = useState(false)
    const handleDate = (e) => {
        console.info(' e.detail.value', e.detail.value)
        // 报错需要弹出提示框
        // setErrorTips(true)
    }
    return <View className="delivery-progress rc-content-bg">
        <View className=" px-3 bg-white rounded-md pb-3">
            <CommonTitle title="下次发货" />
            <View className='text-26 mt-3'>
                <View className="mb-2">皇家英国短毛猫成猫全价粮</View>
                <View>第1包</View>
                <View>2022-03-18</View>
            </View>
            <View className=" mt-3 flex justify-end text-white text-26">
                <View className="bg-primary-red py-1 px-4 ml-4 rounded-full">立即发货</View>
                <View className="bg-primary-red py-1 px-4 ml-4 rounded-full relative">选择日期 <Picker className="absolute left-0 right-0 bottom-0 top-0" mode='date' onChange={handleDate}>
                    <AtList>
                        <AtListItem />
                    </AtList>
                </Picker></View>


            </View>
        </View>
        <View className=" px-3 mt-3 bg-white  rounded-md  pb-3">

            <CommonTitle title="发货记录" />
            <View className='text-26 mt-3'>
                暂无发货记录
            </View>
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
    </View>
}
export default DeliveryProgress