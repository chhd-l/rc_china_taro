import { Component, useEffect } from 'react'
import './app.less'

const App = (props) => {
  useEffect(() => {
    console.log(props,'12345')
    console.log(props,'12345')
    console.log(props,'12345')
    console.log(props,'12345')
    console.log(props,'12345')
  }, [])
  return props.children
}

export default App
