import { useState } from 'react'
import { View, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import minLogo from '@/assets/img/min-logo.png'
import { AtFloatLayout } from 'taro-ui'
import './index.less'
import { PDP_POSTER, PDP_WECHAT } from '@/lib/constants'
const ImgPoster = ({ productInfo, qrcode, setShowPoster, showPoster, setShowShareBtn, showShareBtn }) => {
  const [bgdSrc, setBgdSrc] = useState('')
  const [picTempUrl, setPicTempUrl] = useState('')
  const [posterStatus, setPosterStatus] = useState(false)
  let deviceWidth = Taro.getSystemInfoSync().screenWidth
  let deviceHeight = Taro.getSystemInfoSync().screenHeight

  //提前将需要分享的图片素材先缓存至本地临时图片路径
  const initPic = async (img) => {
    console.info('imgimgimgimg', img)
    let res: any = await handleNetImg(img)
    let bgdSrc = res.path
    setBgdSrc(bgdSrc) //保存这个临时图片路径
    return bgdSrc
  }
  //生成临时图片
  const handleNetImg = async (imagePath) => {
    return new Promise((resolve, reject) => {
      Taro.getImageInfo({
        src: imagePath,
        success: function (res) {
          console.info('handleNetImgres', res)
          resolve(res)
        },
        fail: function (err) {
          console.info('.....handleNetImg', err)
        },
      })
    })
  }
  //初始Canvas，将内容画到Canvas上,画完后将画布生成临时图片
  const createShareGoods = async () => {
    Taro.showLoading({
      title: '正在生成中...',
    })
    let productImg = await initPic(productInfo.img)
    let qrcodeImg = await initPic(qrcode)
    var ctx = Taro.createCanvasContext('mycanvas', this)
    const user = Taro.getStorageSync('wxLoginRes').userInfo

    console.info('deviceWidth', deviceWidth)
    console.info('deviceHeight', deviceHeight)

    ctx.beginPath() //标志开始一个路径
    ctx.arc(60, 60, 40, 0, 2 * Math.PI) //在canvas中绘制圆形
    ctx.stroke()

    ctx.drawImage(productImg, 0, 120, deviceWidth, deviceWidth) //画背景图
    // ctx.drawImage(productInfo.img, 0, 0, deviceWidth, deviceWidth, 30, 45, 140, 140) //画商品图片
    ctx.drawImage(qrcodeImg, deviceWidth - 130, deviceHeight - 120, 100, 100) //画二维码,这边可以变成小程序码
    ctx.drawImage(minLogo, 20, deviceHeight - 120, 100, 100) //画二维码,这边可以变成小程序码
    //名字
    ctx.setFillStyle('#E80013')
    ctx.setFontSize(20)
    ctx.fillText(productInfo?.name, 20, deviceWidth + 160)
    // 价格
    ctx.setFillStyle('#d33024')
    ctx.setFontSize(20)
    ctx.fillText(productInfo?.price, deviceWidth / 2, deviceWidth + 160)

    // 描述
    ctx.setFillStyle('#d33024')
    ctx.setFontSize(13)
    ctx.fillText('1.保存图片到相册', 130, deviceHeight - 80)
    ctx.fillText('2.长按到爱宠有卡查看商品', 130, deviceHeight - 50)

    // 描述
    ctx.setFillStyle('#d33024')
    ctx.setFontSize(20)
    ctx.fillText(user.nickName, 130, 50)
    ctx.fillText('为你的爱宠挑个好物，请查收', 130, 80)
    console.info('ctxctxctx', ctx)
    debugger
    //开始画画完后生成新的临时图片地址
    ctx.draw(false, () => {
      setTimeout(() => {
        Taro.canvasToTempFilePath({
          canvasId: 'mycanvas',
          success: (res) => {
            Taro.hideLoading()
            setPicTempUrl(res.tempFilePath)
            setShowPoster(true)
            setShowShareBtn(false)
            // this.picTempUrl=res.tempFilePath;
          },
        })
      }, 300)
    })
  }

  //获取手机相册权限
  const getPhotosAlbumAuth = () => {
    Taro.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          Taro.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              saveImage()
            },
          })
        } else {
          saveImage()
        }
      },
    })
  }
  //保存海报
  const saveImage = () => {
    Taro.saveImageToPhotosAlbum({
      filePath: picTempUrl,
      success: (data) => {
        Taro.showToast({
          title: '图片保存成功',
          icon: 'success',
          mask: true,
        })
        setShowPoster(false)
      },
      complete: () => {
        setPosterStatus(false)
        // this.posterStatus = false
      },
    })
  }

  return (
    <View className="poster-wrap">
      <AtFloatLayout
        isOpened={showShareBtn}
        title="分享"
        onClose={() => {
          setShowShareBtn(false)
        }}
      >
        <View className="flex">
          <Button openType="share" border={0} onClick={() => {}} className="flex-1 share-btn">
            <View
              className="w-12 m-auto"
              onClick={() => {
                setShowShareBtn(true)
              }}
            >
              <Image src={PDP_WECHAT} className="w-full" mode="widthFix" />
            </View>
            <View className="text-center">微信分享</View>
          </Button>
          <View
            className="flex-1"
            onClick={() => {
              createShareGoods()
            }}
          >
            <View
              className="w-12 m-auto"
              onClick={() => {
                setShowShareBtn(true)
              }}
            >
              <Image src={PDP_POSTER} className="w-full" mode="widthFix" />
            </View>
            <View className="text-center">生成海报</View>
          </View>
        </View>
      </AtFloatLayout>
      {/* <View onClick={createShareGoods}>点击分享</View> */}
      {/* <View onClick={()=>{
          getPhotosAlbumAuth()
      }}>保存本地</View> */}
      <View class="canvas-box absolute invisible" style={{ left: '-10000', top: '-10000' }}>
        <canvas
          canvas-id="mycanvas"
          style={{ width: deviceWidth, height: deviceHeight }}
          width={deviceWidth}
          height={deviceHeight}
        ></canvas>
      </View>
      <AtFloatLayout
        isOpened={showPoster}
        title="分享标品"
        onClose={() => {
          setShowPoster(false)
        }}
      >
        <View
          className="posterPreview"
          onClick={() => {
            setPosterStatus(false)
          }}
        >
          <View style={{ width: '60%', borderColor: '#fafafa' }} className="m-auto border-1 border-solid">
            <Image src={picTempUrl} mode="widthFix" className="w-full"></Image>
          </View>
          <Button
            className="bg-primary-red text-white py-2 m-auto mt-2"
            style={{ borderRadius: '50px', width: '100px' }}
            onClick={() => {
              getPhotosAlbumAuth()
            }}
          >
            保存图片
          </Button>
        </View>
      </AtFloatLayout>
    </View>
  )
}
export default ImgPoster
