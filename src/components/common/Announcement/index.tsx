/**
 * 通知公告
 */
import { useState } from 'react'
import { View } from '@tarojs/components'

const Announcement = (props) => {
  const [display, setDisplay] = useState('flex')
  return (
    <View style={{ display: display }} className="bg-gray-200 flex flex-row justify-around items-center p-2">
      <View className="at-icon at-icon-volume-plus" />
      <View className="text-24">{props.title}</View>
      <View
        onClick={() => {
          setDisplay('hidden')
        }}
        className="at-icon at-icon-close justify-self-end text-24"
      />
    </View>
  )
}
export default Announcement
