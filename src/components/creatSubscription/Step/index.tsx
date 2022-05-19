
import PetList from '@/components/customer/PetList'
import { useAtom } from 'jotai'
import { currentStepAtom } from '@/store/subscription'
import { AtButton } from 'taro-ui'
import { useState } from 'react'
import { View } from '@tarojs/components'
import './index.less'
import ExclusivePackage from '../ExclusivePackage'
import Purchased from '../Purchased'
import MyStep from '../MyStep'

const items = [
  { checked: 'xuanzechongwu', unchecked: 'xuanzechongwu0', title: '第一步', desc: '选择宠物' },
  { checked: 'dingzhitaocan', unchecked: 'dingzhitaocan0', title: '第二步', desc: '定制套餐' },
  { checked: 'querentaocan', unchecked: 'querentaocan0', title: '第三步', desc: '确认套餐' }]

const nextStepView = {
  0: <PetList />,
  1: <ExclusivePackage />,
  2: <Purchased />
}
const Step = () => {
  const [current, setCurrent] = useState(0)
  const [, setStepCount] = useAtom(currentStepAtom)

  return <View>
    <MyStep current={current} items={items} />
    {nextStepView[current]}
    <View className="flex flex-row justify-center">
      {
        current > 0 && <AtButton type='primary' size='small' circle className="stepButton" onClick={() => {
          setCurrent(current - 1)
          setStepCount(current - 1)
        }}>上一步</AtButton>}
      {
        current < 2 && <AtButton type='primary' size='small' circle className="stepButton" onClick={() => {
          setCurrent(current + 1)
          setStepCount(current + 1)
        }}>下一步</AtButton>
      }
      {
        current === 2 && <AtButton type='primary' size='small' circle className="stepButton" >确认套餐</AtButton>
      }
    </View>
  </View>
}

export default Step