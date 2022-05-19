
import PetList from '@/components/customer/PetList'
import { useAtom } from 'jotai'
import { currentStepAtom } from '@/store/subscription'
import { AtButton, AtSteps } from 'taro-ui'
import { useState } from 'react'
import { Text, View } from '@tarojs/components'
import './index.less'
import ExclusivePackage from '../ExclusivePackage'

import Purchased from '../Purchased'

const items = [
  {
    'title': '第一步',
    'desc': <Text className="text-black">选择宠物</Text>,
    'icon': {
      value: 'sound',
      activeColor: '#fff',
      inactiveColor: '#78A4FA',
      size: '40',
    }
  },
  {
    'title': '第二步',
    'desc': <Text className="text-black">定制套餐</Text>,
    'icon': {
      value: 'shopping-cart',
      activeColor: '#fff',
      inactiveColor: '#78A4FA',
      size: '40',
    }
  },
  {
    'title': '第三步',
    'desc': <Text className="text-black">确认套餐</Text>,
    'icon': {
      value: 'camera',
      activeColor: '#fff',
      inactiveColor: '#78A4FA',
      size: '40',
    }
  }
]

const nextStepView = {
  0: <PetList />,
  1: <ExclusivePackage />,
  2: <Purchased />
}
const Step = () => {
  const [current, setCurrent] = useState(0)
  const [, setStepCount] = useAtom(currentStepAtom)
  // const [petInfo, setPetInfo] = useState<any>({})
  // const handleCheckedPet = (pet) => {
  //   console.info('///////', pet)
  //   setPetInfo(pet)
  // }
  return <View><AtSteps
    items={items}
    current={current}
    // onChange={setCurrent}
    className={`step${current}`}
  />

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