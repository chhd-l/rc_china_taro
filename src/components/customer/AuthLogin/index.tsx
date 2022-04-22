import { wxLogin } from '@/framework/api/customer/address'
import { View, Text, Button } from '@tarojs/components'
import { useAtom } from 'jotai'
import { customerAtom } from '@/store/customer'
import { AtCheckbox, AtModal } from 'taro-ui'
import { atom } from 'jotai'
import './index.less'

export const authLoginOpenedAtom = atom(false)

const AuthLogin = () => {
  const [, setCustomer] = useAtom(customerAtom)
  const [authLoginOpened, setAuthLoginOpened] = useAtom(authLoginOpenedAtom)
  const login = async () => {
    const data = await wxLogin()
    setCustomer(data)
  }
  return (
    <AtModal
      isOpened={authLoginOpened}
      onClose={() => {
        console.log('close')
        setAuthLoginOpened(false)
      }}
    >
      <View className="absolute bottom-0 w-full bg-white overflow-hidden authLogin">
        <View className="flex h-10">
          <View className="flex-1 flex justify-center items-center text-center h-full border-0  border-b-2 border-red-600 border-solid text-xs text-red-600">
            <Text>1.微信授权登录</Text>
          </View>
          <View className="flex-1 flex justify-center items-center text-center text-xs h-full">
            <Text>2.绑定手机号</Text>
          </View>
        </View>
        <View className="px-5">
          <View className="pl-4 py-2 border-0 border-b border-gray-300 border-solid">
            <Text className="text-19-rpx">
              本人已年满16周岁，同意并接受公司按《隐私政策》及《法律声明》的规定收集和处理我的个人信息。您可以就隐私问题通过隐私政策中的方式联系我们并行使您的个人信息权利。
            </Text>
          </View>
          <View className="pl-4 py-2">
            <Text className="text-19-rpx">我已阅读和了解皇家爱宠有卡的《会员规则》并同意接受其中所有的条款</Text>
          </View>
          <Button className="my-2 bg-red-600 text-white w-40 rounded-3xl" onClick={login}>
            授权登录
          </Button>
        </View>
      </View>
    </AtModal>
  )
}

export default AuthLogin
