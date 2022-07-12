import { View, WebView } from '@tarojs/components'
import './index.less'

const OfficialAccount = () => {
  return (
    <View>
      <WebView src={wechatFollow} />
    </View>
  )
}

export default OfficialAccount
