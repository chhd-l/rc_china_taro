import { Image, View } from '@tarojs/components'
import { AtInput } from 'taro-ui'
import { useState } from 'react'
import { ORDER_COMMENT_ICON } from '@/lib/constants'
import './index.less'

const Remark = ({ changeRemark }: { changeRemark: Function }) => {
  const [remark, setRemark] = useState('')

  const onChange = (value) => {
    setRemark(value)
    changeRemark && changeRemark(value)
  }

  return (
    <View className="bg-white mt-2 pl-2 rounded">
      <View className="flex flex-row justify-between items-center">
        <View className="text-26 flex flex-row items-center">
          <Image className="w-5 h-5 mr-2" src={ORDER_COMMENT_ICON} />
          备注信息
        </View>
        <View className="z-0">
          <AtInput
            placeholder="请填写需要备注信息"
            name="remark"
            className="rounded rc-remark-input"
            value={remark}
            onChange={onChange}
            border={false}
          />
        </View>
      </View>
    </View>
  )
}
export default Remark
