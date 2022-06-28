import { Image, View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { WECHAT } from '@/lib/constants'
import { useAtom } from 'jotai'
import { consumerAtom } from '@/store/consumer'
import routers from '@/routers'
import Taro from '@tarojs/taro'
import { useEffect } from 'react'

const Attention = ({ classes = 'bg-white' }: { classes?: string }) => {
  const [consumerInfo, setConsumerInfo] = useAtom(consumerAtom)

  useEffect(() => {
    setConsumerInfo(Taro.getStorageSync('wxLoginRes').userInfo)
  }, [])

  return (
    <View className={`${consumerInfo?.id?classes:''}`}>
      {consumerInfo?.id ? (
        <View className="flex py-2 items-center">
          <View className="w-10 h-10">
            <Image className="w-full h-full" src={WECHAT} />
          </View>
          <View className="flex flex-col ml-6 items-center justify-center text-26">
            <View>更多有趣易懂养宠知识都在这里</View>
            <View className="mt-1">订阅我，随时掌握宠粮发货进度</View>
          </View>
          <View className="flex-1 flex justify-end">
            <AtButton
              className="m-0 py-0 text-26 flex items-center justify-center w-16"
              full={false}
              size="small"
              type="primary"
              onClick={async () => {
                await Taro.navigateTo({ url: `${routers.officialAccount}` })
              }}
              customStyle={{ height: '22px', lineHeight: '20px' }}
            >
              去关注
            </AtButton>
          </View>
        </View>
      ) : null}
    </View>
  )
}

export default Attention
