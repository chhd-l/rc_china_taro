import { Image, View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { WECHAT } from '@/lib/constants'
import { useAtom } from 'jotai'
import { consumerAtom } from '@/store/consumer'
import routers from '@/routers'
import Taro from '@tarojs/taro'

const Attention = () => {
  const [consumerInfo] = useAtom(consumerAtom)

  return (
    <View className="py-rc28 px-rc30 my-rc58">
      {consumerInfo?.id ? (
        <View className="flex py-2 text-24 items-center ">
          <View className="w-12 h-12">
            <Image className="w-full h-full" src={WECHAT} />
          </View>
          <View className="flex flex-col ml-2 items-center justify-center">
            <View>更多有趣易懂养宠知识都在这里</View>
            <View className="mt-1">订阅我，随时掌握宠粮发货进度</View>
          </View>
          <View className="flex-1 flex justify-end">
            <AtButton
              className="m-0 py-0"
              full={false}
              size="small"
              type="primary"
              onClick={async () => {
                await Taro.navigateTo({ url: `${routers.officialAccount}` })
              }}
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
