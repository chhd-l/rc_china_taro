import { useState } from 'react'
import { View, Button, Image, Canvas } from '@tarojs/components'
import Taro from '@tarojs/taro'
import minLogo from '@/assets/img/min-logo.png'
import { AtFloatLayout, AtModal } from 'taro-ui'
import './index.less'
import { PDP_POSTER, PDP_WECHAT, SHARE_BG, SHRRE_DOWNLOAD } from '@/lib/constants'
import { formatMoney } from '@/utils/utils'
import { useAtom } from 'jotai'
import AuthLogin, { authLoginOpenedAtom } from '@/components/customer/AuthLogin'
const ImgPoster = ({ productInfo, qrcode, setShowPoster, showPoster, setShowShareBtn, showShareBtn }) => {
  const [picTempUrl, setPicTempUrl] = useState('')
  const [posterStatus, setPosterStatus] = useState(false)
  let deviceWidth = Taro.getSystemInfoSync().windowWidth
  const [, setAuthLoginOpened] = useAtom(authLoginOpenedAtom)
  const [showSaveSuccessTip, setShowSaveSuccessTip] = useState(false)
  let deviceHeight = Taro.getSystemInfoSync().windowHeight - 70
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
    const user = Taro.getStorageSync('wxLoginRes').userInfo
    if (!user?.nickName) {
      return
    }
    Taro.showLoading({
      title: '海报生成中...',
    })
    var ctx = Taro.createCanvasContext('mycanvas', this)
    ctx.setFillStyle('#fff')
    ctx.fillRect(0, 0, deviceWidth, deviceWidth + 285)
    let productImg = await initPic(productInfo.img)
    let qrcodeImg = await initPic(qrcode)
    let userAvatar = await initPic(user.avatarUrl)
    let bottomBg = await initPic(SHARE_BG)

    console.info('deviceWidth', deviceWidth)
    console.info('deviceHeight', deviceHeight)
    ctx.drawImage(productImg, 0, 100, deviceWidth, deviceWidth) //产品图
    // ctx.drawImage(productInfo.img, 0, 0, deviceWidth, deviceWidth, 30, 45, 140, 140) //画商品图片
    ctx.drawImage(qrcodeImg, deviceWidth - 100, deviceWidth + 160, 66, 66) //画二维码
    ctx.drawImage(minLogo, 30, deviceWidth + 160, 60, 60) //
    ctx.drawImage(bottomBg, 0, deviceWidth + 225, deviceWidth, 60)

    ctx.setFillStyle('#000')
    ctx.setFontSize(12)
    // ctx.font = 'normal bold 12px arial'
    ctx.fillText('皇家爱宠有卡', 26, deviceWidth + 229.7)
    ctx.fillText('皇家爱宠有卡', 25.7, deviceWidth + 230)

    //名字
    ctx.setFillStyle('#000')
    ctx.setFontSize(18)
    let productName = productInfo?.name?.slice(0, 9)
    if (productInfo?.name?.length > 8) {
      productName = productName + '...'
    }
    ctx.fillText(productName, 20, deviceWidth + 130)
    ctx.setFillStyle('#999')
    ctx.setFontSize(12)
    // 原价
    let originalPrice = `原价${formatMoney(productInfo?.originalPrice)}`
    let textWidth = ctx.measureText(originalPrice).width
    ctx.fillText(originalPrice, deviceWidth / 2, deviceWidth + 130)
    ctx.rect(deviceWidth / 2, deviceWidth + 125, textWidth, 1)
    ctx.fill()

    // 现价
    let price = `${formatMoney(productInfo?.price)}`
    ctx.setFillStyle('#d33024')
    ctx.setFontSize(26)
    ctx.fillText(price, deviceWidth / 2 + textWidth, deviceWidth + 130)

    // 描述
    ctx.setFillStyle('#000')
    ctx.setFontSize(13)
    ctx.fillText('1.保存图片到相册', 120, deviceWidth + 196)
    ctx.fillText('2.长按到爱宠有卡查看商品', 120, deviceWidth + 216)

    // 描述
    ctx.setFillStyle('#000')
    ctx.setFontSize(18)
    // ctx.font = 'normal bold 18px arial'
    ctx.fillText(user?.nickName || '', 100, 47.5)
    ctx.fillText(user?.nickName || '', 99.5, 48)
    ctx.setFillStyle('#000')
    ctx.setFontSize(16)
    ctx.fillText('为你的爱宠挑个好物，请查收', 100, 73)

    ctx.beginPath() //标志开始一个路径
    ctx.setStrokeStyle('#f2f2f2')
    ctx.arc(50, 50, 30, 0, 2 * Math.PI) //在canvas中绘制圆形
    ctx.stroke()
    if (userAvatar) {
      ctx.clip()
      ctx.drawImage(userAvatar, 20, 20, 60, 60) //用户头像
    }
    console.info('ctxctxctx', ctx)
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
        // Taro.showToast({
        //   title: '图片保存成功',
        //   icon: 'success',
        //   mask: true,
        // })
        setShowPoster(false)
        setShowShareBtn(false)
        setShowSaveSuccessTip(true)
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
        className="share-btn-wrap"
        isOpened={showShareBtn}
        title="分享"
        onClose={() => {
          setShowShareBtn(false)
        }}
      >
        <View className="flex pt-7 pb-8 items-center ">
          <Button openType="share" border={0} onClick={() => {}} className="flex-1 share-btn">
            <View className="w-14 m-auto">
              <Image src={PDP_WECHAT} className="w-full" mode="widthFix" />
            </View>
            <View className="text-center text-24">微信分享</View>
          </Button>
          <View
            style={{ borderLeft: '1px solid #eee' }}
            className="flex-1 py-1"
            onClick={() => {
              if (!Taro.getStorageSync('wxLoginRes')) {
                setShowShareBtn(false)
                setAuthLoginOpened(true)
                return
              }
              createShareGoods()
            }}
          >
            <View className="w-14 m-auto">
              <Image src={PDP_POSTER} className="w-full" mode="widthFix" />
            </View>
            <View className="text-center text-24">生成海报</View>
          </View>
        </View>
      </AtFloatLayout>
      {/* <View onClick={createShareGoods}>点击分享</View> */}
      {/* <View onClick={()=>{
          getPhotosAlbumAuth()
      }}>保存本地</View> */}
      <View
        class="canvas-box fixed invisible"
        style={{ left: '-999999', top: '-999999', zIndex: '-10', heigt: 0, overflow: 'hidden' }}
      >
        <Canvas
          canvas-id="mycanvas"
          style={{ width: `${deviceWidth}px`, height: deviceWidth + 285, background: '#fff' }}
        ></Canvas>
      </View>
      <AtFloatLayout
        isOpened={showPoster}
        title="分享商品"
        onClose={() => {
          setShowPoster(false)
        }}
      >
        <View
          className="posterPreview pb-8"
          onClick={() => {
            setPosterStatus(false)
          }}
        >
          <View
            style={{ width: '73%', borderColor: '#f0f0f0' }}
            className="m-auto border-1 border-solid overflow-hidden"
          >
            <Image src={picTempUrl} mode="widthFix" className="w-full float-left"></Image>
          </View>
          <Button
            className="bg-primary-red text-white text-28 m-auto mt-2 flex justify-center items-center"
            style={{ borderRadius: '50px', width: '110px' }}
            onClick={() => {
              getPhotosAlbumAuth()
            }}
          >
            <Image src={SHRRE_DOWNLOAD} mode="widthFix" className="w-4 text-white relative" style={{ top: '2px' }} />
            保存图片
          </Button>
        </View>
      </AtFloatLayout>
      <AtModal
        key="orderShipTip"
        isOpened={showSaveSuccessTip}
        title="提示"
        content="图片已保存到相册，赶紧去分享吧"
        confirmText="确定"
        onClose={() => {
          setShowSaveSuccessTip(false)
        }}
        onCancel={() => {
          setShowSaveSuccessTip(false)
        }}
        onConfirm={() => {
          setShowSaveSuccessTip(false)
        }}
        className="rc_modal"
      />
      {/* <AuthLogin /> */}
    </View>
  )
}
export default ImgPoster
