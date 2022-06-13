import Taro, { Component } from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import TaroCanvasDrawer from '../../common/taro-plugin-canvas' // 拷贝文件到component的引入方式
// import { TaroCanvasDrawer } from 'taro-plugin-canvas' // npm 引入方式
import './index.scss'
import { useState } from 'react'

const ImgPoster = () => {
  const rssconfigDefault = {
    width: 750,
    height: 750,
    backgroundColor: '#fff',
    debug: false,
    blocks: [
      {
        x: 0,
        y: 0,
        width: 750,
        height: 750,
        paddingLeft: 0,
        paddingRight: 0,
        borderWidth: 0,
        // borderColor: '#ccc',
        backgroundColor: '#EFF3F5',
        borderRadius: 0,
      },
      {
        x: 40,
        y: 40,
        width: 670,
        height: 670,
        paddingLeft: 0,
        paddingRight: 0,
        borderWidth: 0,
        // borderColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 12,
      },
    ],
    texts: [
      {
        x: 80,
        y: 420,
        text: '国产谍战 真人演出,《隐形守护者》凭什么成为Steam第一?',
        fontSize: 32,
        color: '#000',
        opacity: 1,
        baseLine: 'middle',
        lineHeight: 48,
        lineNum: 2,
        textAlign: 'left',
        width: 580,
        zIndex: 999,
      },
      {
        x: 80,
        y: 590,
        text: '长按扫描二维码阅读完整内容',
        fontSize: 24,
        color: '#666',
        opacity: 1,
        baseLine: 'middle',
        textAlign: 'left',
        lineHeight: 36,
        lineNum: 1,
        zIndex: 999,
      },
      {
        x: 80,
        y: 640,
        text: '分享来自 「 RssFeed 」',
        fontSize: 24,
        color: '#666',
        opacity: 1,
        baseLine: 'middle',
        textAlign: 'left',
        lineHeight: 36,
        lineNum: 1,
        zIndex: 999,
      },
    ],
    images: [
      {
        url: 'http://pic.juncao.cc/rssfeed/images/demo.png',
        width: 670,
        height: 320,
        y: 40,
        x: 40,
        borderRadius: 12,
        zIndex: 10,
        // borderRadius: 150,
        // borderWidth: 10,
        // borderColor: 'red',
      },
      {
        url: 'https://pic.juncao.cc/cms/images/minapp.jpg',
        width: 110,
        height: 110,
        y: 570,
        x: 560,
        borderRadius: 100,
        borderWidth: 0,
        zIndex: 10,
      },
    ],
    lines: [
      {
        startY: 540,
        startX: 80,
        endX: 670,
        endY: 541,
        width: 1,
        color: '#eee',
      },
    ],
  }
  // 绘图配置文件
  const [config, setConfig] = useState<any>(null)
  // 绘制的图片
  const [shareImage, setShareImage] = useState('')
  // TaroCanvasDrawer 组件状态
  const [canvasStatus, setCanvasStatus] = useState(false)
  const [rssConfig, setRssConfig] = useState(rssconfigDefault)
  // 调用绘画 => canvasStatus 置为true、同时设置config
  const canvasDrawFunc = (config = rssConfig) => {
    setCanvasStatus(true)
    setConfig(config)
    //   this.setState({
    //     canvasStatus: true,
    //     config: config,
    //   })
    Taro.showLoading({
      title: '绘制中...',
    })
  }

  // 绘制成功回调函数 （必须实现）=> 接收绘制结果、重置 TaroCanvasDrawer 状态
  const onCreateSuccess = (result) => {
    const { tempFilePath, errMsg } = result
    Taro.hideLoading()
    if (errMsg === 'canvasToTempFilePath:ok') {
      setShareImage(tempFilePath)
      // 重置 TaroCanvasDrawer 状态，方便下一次调用
      setCanvasStatus(false)
      setConfig(null)
      //   this.setState({
      //     shareImage: tempFilePath,
      //     canvasStatus: false,
      //     config: null,
      //   })
    } else {
      // 重置 TaroCanvasDrawer 状态，方便下一次调用
      setCanvasStatus(false)
      setConfig(null)
      //   this.setState({
      //     canvasStatus: false,
      //     config: null,
      //   })
      Taro.showToast({ icon: 'none', title: errMsg || '出现错误' })
      console.log(errMsg)
    }
    // 预览
    // Taro.previewImage({
    //   current: tempFilePath,
    //   urls: [tempFilePath]
    // })
  }

  // 绘制失败回调函数 （必须实现）=> 接收绘制错误信息、重置 TaroCanvasDrawer 状态
  const onCreateFail = (error) => {
    Taro.hideLoading()
    // 重置 TaroCanvasDrawer 状态，方便下一次调用
    setCanvasStatus(false)
    setConfig(null)
    // this.setState({
    //   canvasStatus: false,
    //   config: null,
    // })
    console.log(error)
  }

  // 保存图片至本地
  const saveToAlbum = () => {
    const res: any = Taro.saveImageToPhotosAlbum({
      filePath: shareImage,
    })
    if (res.errMsg === 'saveImageToPhotosAlbum:ok') {
      Taro.showToast({
        title: '保存图片成功',
        icon: 'success',
        duration: 2000,
      })
    }
  }
  return (
    <View className="index">
      <View>
        <View className="flex-row">
          <Button onClick={canvasDrawFunc(rssConfig)}>绘制</Button>
          <Button onClick={saveToAlbum}>保存到相册</Button>
        </View>
      </View>
      <View className="shareImage-cont">
        <Image className="shareImage" src={shareImage} mode="widthFix" lazy-load />
        {
          // 由于部分限制，目前组件通过状态的方式来动态加载
          canvasStatus && (
            <TaroCanvasDrawer
              config={config} // 绘制配置
              onCreateSuccess={onCreateSuccess} // 绘制成功回调
              onCreateFail={onCreateFail} // 绘制失败回调
            />
          )
        }
      </View>
    </View>
  )
}
export default ImgPoster
