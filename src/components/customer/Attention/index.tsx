import { Image, OfficialAccount, OfficialAccountProps, View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { WECHAT } from '@/lib/constants'
import { useAtom } from 'jotai'
import { customerAtom } from '@/store/customer'
import { useEffect, useState } from 'react'

const Attention = () => {
  const [customerInfo, setCustomerInfo] = useAtom(customerAtom)
  const [errMsg, setErrMsg] = useState('')

  return (
    <View className="flex py-rc28 px-rc30 text-24 items-center bg-gray-fb my-rc58">
      <View className="w-rc80 h-rc80 mr-2">
        <Image className="w-full h-full" src={WECHAT} />
      </View>
      <View className="flex flex-col  items-center justify-center">
        <View>更多有趣易懂养宠知识都在这里</View>
        <View className="mt-1">订阅我，随时掌握宠粮发货进度</View>
        {/* <View>{errMsg}</View> */}
      </View>
      <View className="flex-1 flex justify-end">
        <AtButton className="m-0 py-0" full={false} size="small" type="primary">
          <OfficialAccount
            onLoad={(e) => {
              console.log('vvvvv', e)
            }}
            onError={(e) => {
              console.log('dddddd', e.detail)
              setErrMsg(JSON.stringify(e.detail))
            }}
            onClick={(event) => {
              console.log('ccccc', event)
            }}
          >
            去关注
          </OfficialAccount>
        </AtButton>
      </View>
    </View>
  )
}

export default Attention
