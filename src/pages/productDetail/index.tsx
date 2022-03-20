import { useEffect, useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.less'

import { atom, useAtom } from 'jotai'

const countAtom = atom(0)
const doubleCountAtom = atom((get) => get(countAtom) * 2)

const ProductDetail = () => {
  const [name, setName] = useState('')
  const [count, setCount] = useAtom(countAtom)
  const [doubleCount] = useAtom(doubleCountAtom)
  useEffect(() => {
    setName('zyq')
  }, [])
  return (
    <View className='index'>
      <Text>{`hello ${name}`}</Text>
      <Button onClick={() => setCount(count - 1)}>-</Button>
      <Text>{count}</Text>
      <Button onClick={() => setCount(count + 1)}>+</Button>
      <Text>{doubleCount}</Text>
    </View>
  )
}

export default ProductDetail