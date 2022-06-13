import { useState } from 'react'
import { View, Button, Image, Canvas } from '@tarojs/components'
import Taro from '@tarojs/taro'
import minLogo from '@/assets/img/min-logo.png'
import { AtFloatLayout } from 'taro-ui'
import './index.less'
import { PDP_POSTER, PDP_WECHAT } from '@/lib/constants'
import { formatMoney } from '@/utils/utils'
const ImgPoster = ({ productInfo, qrcode, setShowPoster, showPoster, setShowShareBtn, showShareBtn }) => {
  const [picTempUrl, setPicTempUrl] = useState('')
  const [posterStatus, setPosterStatus] = useState(false)
  let deviceWidth = Taro.getSystemInfoSync().screenWidth
  let deviceHeight = Taro.getSystemInfoSync().screenHeight

  //提前将需要分享的图片素材先缓存至本地临时图片路径
  const initPic = async (img) => {
    console.info('imgimgimgimg', img)
    let res: any = await handleNetImg(img)
    let bgdSrc = res.path
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
    var ctx = Taro.createCanvasContext('mycanvas', this)
    const user = Taro.getStorageSync('wxLoginRes').userInfo
    let productImg = await initPic(productInfo.img)
    let qrcodeImg = await initPic(qrcode)
    let userAvatar = await initPic(user.avatarUrl)
    console.info('deviceWidth', deviceWidth)
    console.info('deviceHeight', deviceHeight)
    ctx.drawImage(productImg, 0, 120, deviceWidth, deviceWidth) //产品图
    // ctx.drawImage(productInfo.img, 0, 0, deviceWidth, deviceWidth, 30, 45, 140, 140) //画商品图片
    ctx.drawImage(qrcodeImg, deviceWidth - 130, deviceHeight - 120, 100, 100) //画二维码
    ctx.drawImage(minLogo, 20, deviceHeight - 120, 100, 100) //
    //名字
    ctx.setFillStyle('#666')
    ctx.setFontSize(20)
    let productName = productInfo?.name?.slice(0, 8)
    if (productInfo?.name?.length > 8) {
      productName = productName + '...'
    }
    // 原价
    ctx.fillText(productName, 20, deviceWidth + 160)
    ctx.setFillStyle('#999')
    ctx.setFontSize(16)
    let originalPrice = `原价${formatMoney(productInfo?.originalPrice)}`
    let textWidth = ctx.measureText(originalPrice).width
    ctx.fillText(originalPrice, deviceWidth / 2, deviceWidth + 160)
    ctx.rect(deviceWidth / 2, deviceWidth + 151, textWidth, 1)
    ctx.fill()

    // 现价
    let price = `${formatMoney(productInfo?.price)}`
    ctx.setFillStyle('#d33024')
    ctx.setFontSize(26)
    ctx.fillText(price, deviceWidth / 2 + textWidth, deviceWidth + 160)

    // 描述
    ctx.setFillStyle('#666')
    ctx.setFontSize(13)
    ctx.fillText('1.保存图片到相册', 130, deviceHeight - 75)
    ctx.fillText('2.长按到爱宠有卡查看商品', 130, deviceHeight - 55)

    // 描述
    ctx.setFillStyle('#666')
    ctx.setFontSize(20)
    ctx.fillText(user?.nickName || '', 130, 50)
    ctx.fillText('为你的爱宠挑个好物，请查收', 130, 80)

    ctx.beginPath() //标志开始一个路径
    ctx.arc(60, 60, 40, 0, 2 * Math.PI) //在canvas中绘制圆形
    ctx.stroke()
    if (userAvatar) {
      ctx.clip()
      ctx.drawImage(userAvatar, 20, 20, 80, 80) //用户头像
    }
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
        setShowShareBtn(false)
      },
      fail: () => {
        Taro.showToast({
          title: '图片保失败',
          icon: 'error',
          mask: true,
        })
      },
      complete: () => {},
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
            <View className="text-center text-28">微信分享</View>
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
            <View className="text-center text-28">生成海报</View>
          </View>
        </View>
      </AtFloatLayout>
      {/* <View onClick={createShareGoods}>点击分享</View> */}
      {/* <View onClick={()=>{
          getPhotosAlbumAuth()
      }}>保存本地</View> */}
      <View class="canvas-box absolute invisible" style={{ left: '-10000', top: '-10000' }}>
        <Canvas
          canvas-id="mycanvas"
          style={{ width: deviceWidth, height: deviceHeight }}
          width={deviceWidth}
          height={deviceHeight}
        ></Canvas>
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
          <View style={{ width: '60%', borderColor: '#f0f0f0' }} className="m-auto border-1 border-solid">
            <Image src={picTempUrl} mode="widthFix" className="w-full"></Image>
          </View>
          <Button
            className="bg-primary-red text-white text-28 m-auto mt-2"
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
