import { useState } from 'react'
import { wxLogin } from '@/framework/api/customer/customer'
import { View, Text, Button } from '@tarojs/components'
import { useAtom, atom } from 'jotai'
import { customerAtom } from '@/store/customer'
import { AtCheckbox, AtFloatLayout, AtToast } from 'taro-ui'
import BottonSwi from './BottonSwi'
import './index.less'

export const authLoginOpenedAtom = atom(false)

const chexOptions = [
  {
    value: 'chexOne',
    label:
      '本人已年满16周岁，同意并接受公司按《隐私政策》及《法律声明》的规定收集和处理我的个人信息。您可以就隐私问题通过隐私政策中的方式联系我们并行使您的个人信息权利。',
  },
  {
    value: 'chexTwo',
    label: '我已阅读和了解皇家爱宠有卡的《会员规则》并同意接受其中所有的条款。',
  },
]

const AuthLogin = () => {
  const [, setCustomer] = useAtom(customerAtom)
  const [chexList, setChexList] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loginButton, setLoginButton] = useState<boolean>(false)
  const [authLoginOpened, setAuthLoginOpened] = useAtom(authLoginOpenedAtom)
  const login = async () => {
    if (isOpen) {
      const data = await wxLogin().then((res) => {
        setLoginButton(false)
        setAuthLoginOpened(false)
        return res
      })
      setCustomer(data)
      setAuthLoginOpened(false)
    } else {
      setLoginButton(true)
    }
  }

  const chexChange = (e) => {
    if (e.length === 2) {
      setChexList(e)
      setIsOpen(true)
    } else {
      setChexList(e)
      setIsOpen(false)
    }
  }
  const MainSwitch = () => {
    if (isOpen) {
      setIsOpen(false)
      setChexList([])
    } else {
      setIsOpen(true)
      setChexList(['chexOne', 'chexTwo'])
    }
  }

  return (
    <View className="auth-login">
      <AtFloatLayout
        isOpened={authLoginOpened}
        onClose={() => {
          setAuthLoginOpened(false)
        }}
      >
        <View className="bottom-0 w-full bg-white overflow-hidden h-full">
          <View className="flex h-10">
            <View className="flex-1 flex justify-center items-center text-center h-full border-0 text-xs text-red-600">
              <Text>1.微信授权登录</Text>
            </View>
            <View className="flex-1 flex justify-center items-center text-center text-xs h-full">
              <Text>2.绑定手机号</Text>
            </View>
          </View>
          <View className="px-5">
            <AtCheckbox className="chexOne" options={chexOptions} selectedList={chexList} onChange={chexChange} />
            <View className="w-full h-10 flex items-center" onClick={MainSwitch}>
              <BottonSwi isOpen={isOpen} />
              一键勾选
            </View>
            <Button className="my-2 bg-red-600 text-white w-40 rounded-3xl" onClick={login}>
              授权登录
            </Button>
          </View>
        </View>
        <AtToast
          text="请先勾选条款"
          icon="check"
          isOpened={loginButton}
          duration={1200}
          onClose={() => setLoginButton(false)}
        />
      </AtFloatLayout>
    </View>
  )
}

export default AuthLogin
