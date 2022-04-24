import { View } from '@tarojs/components'
import './index.less'

const BottonSwi = ({ isOpen }) => {
  return (
    <View className="BottonSwi">
      <View className={`start ${isOpen ? 'StartAni' : ''}`}>
        <View className={`end ${isOpen ? 'EndAni' : ''}`} />
      </View>
    </View>
  )
}

export default BottonSwi
