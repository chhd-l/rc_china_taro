import { Component, useEffect } from 'react'
import './app.less'

const App = (props) => {
  useEffect(() => {
    console.log(props,'123')
  }, [])
  return props.children
}

export default App
