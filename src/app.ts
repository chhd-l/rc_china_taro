import { useEffect } from 'react'
import '@/utils/global.ts'

import '@/assets/css/custom-theme.scss'
import './app.less'
import './assets/css/global.less'
import 'windi.css'
import Taro from "@tarojs/taro";

const App = (props) => {
  useEffect(() => {
    console.log(props, '12345')
    Taro.onAppShow(() => {
      console.log('aaaaaaaaa', 'onAppShow')
      // Taro.clearStorageSync()
    })
  }, [])

  return props.children
}

export default App
