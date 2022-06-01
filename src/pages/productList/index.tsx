import Mock from 'mockjs'
import Taro, { useDidShow } from '@tarojs/taro'
import { useEffect, useState } from 'react'
import ActivityList from '@/components/product/ActivityList'
import { FloorType, SwiperProps } from '@/framework/types/products'
import StarsList from '@/components/product/StarsList'
import DryOrWetList from '@/components/product/DryOrWetList'
import { mockProduct, mockStar, mockTabOptions } from '@/mock/product'
import { floorList } from '@/lib/product'
import FloorNav from '@/components/product/FloorNav'
import ListBanner from '@/components/product/ListBanner'
import NavBarForList from '@/components/product/NavBarForList'
import { View, ScrollView, Button, MovableArea, MovableView } from '@tarojs/components'
import './index.less'
import { wxLogin } from '@/framework/api/customer/customer'
import { useAtom } from 'jotai'
import { customerAtom } from '@/store/customer'
import { getLiveStreamingFindOnLive } from '@/framework/api/live-streaming/live-streaming'
import { LIVINGSTREAMING_ONGOING, LIVINGSTREAMING_UPCOMING } from '@/lib/constants'

const bannerLists = [
  {
    img: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1648800549779_Z3pog8.jpg',
    url: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1648800549779_Z3pog8.jpg',
  },
  {
    img: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1645176690326_P7j5sr.jpg',
    url: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1648800549779_Z3pog8.jpg',
  },
  {
    img: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1648034005829_tqkR1u.png',
    url: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1648800549779_Z3pog8.jpg',
  },
  {
    img: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1597804065709_i2xUiW.jpg',
    url: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1648800549779_Z3pog8.jpg',
  },
  {
    img: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1636022018746_LKzei7.jpg',
    url: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1648800549779_Z3pog8.jpg',
  },
  {
    img: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1648800549779_Z3pog8.jpg',
    url: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1648800549779_Z3pog8.jpg',
  },
]

const starsLists = Mock.mock(mockStar).list
const productLists = Mock.mock(mockProduct).list
const lifestageLists = Mock.mock(mockTabOptions).list
const ProductList = () => {
  const [bannerList, setBannerList] = useState<any[]>(bannerLists)
  const [activityList, setActivityList] = useState<SwiperProps[]>(bannerLists)
  const [starsList, setStarsList] = useState<SwiperProps[]>(starsLists)
  const [showPendant, setShowPendant] = useState(false)
  const [productList, setProductList] = useState(productLists)
  const [lifestageList, setLifestageList] = useState(lifestageLists)
  const [floorId, setFloorId] = useState<string>('')
  const [, setCustomer] = useAtom(customerAtom)
  let type = 1 // 0. 显示直播、预告、商品讲解、回放其中之一的挂件；1. 只显示直播的挂件；2. 只显示预告的挂件；3. 只显示商品讲解的挂件；4. 只显示回放的挂件
  let customParams = encodeURIComponent(JSON.stringify({ path: 'pages/productList/index', pid: 1 })) // 开发者在直播间页面路径上携带自定义参数（如示例中的 path 和pid参数），后续可以在分享卡片链接和跳转至商详页时获取，详见【获取自定义参数】、【直播间到商详页面携带参数】章节（上限600个字符，超过部分会被截断）
  let closePictureInPictureMode = 1 // 是否关闭小窗
  const queryList = (params) => {
    console.info('params', params)
    setProductList(productList)
    //getlist
  }
  const getLiveStreamingFindOnLiveData = async () => {
    let data = await getLiveStreamingFindOnLive('22c2f601-5a60-8b10-20c1-c56ef0d8bd53')
    {/* 直播间状态。101：直播中，102：未开始，103已结束，104禁播，105：暂停，106：异常，107：已过期 */ }

    let LiveStreamings = data?.map(el => {
      let statusIcon: string = ''
      switch (el.liveStatus) {
        case 101:
          statusIcon = LIVINGSTREAMING_ONGOING
          break;
        case 102:
          statusIcon = LIVINGSTREAMING_UPCOMING
          break;
      }
      return {
        img: el.coverImg,
        status: el.liveStatus,
        statusIcon,
        linkHref: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${el.roomId}`
      }
    }) || []
    let newBanner = [...bannerList]

    if (LiveStreamings?.length) {
      newBanner = [LiveStreamings[0], ...bannerList]
    }
    setBannerList(newBanner)
    console.info('datanewBanner', newBanner)
  }
  const loginInit = async () => {
    if (Taro.getStorageSync('wxLoginRes')) {
      const data = await wxLogin()
      setCustomer(data)
    }
  }

  useEffect(() => {
    loginInit()
    getLiveStreamingFindOnLiveData()
  }, [])
  const onScroll = (e) => {
    console.info(e.detail)
    if (e.detail.scrollTop > 370) {
      setShowPendant(true)
    } else {
      setShowPendant(false)
    }
  }

  console.log('Taro.getSystemInfoSync().screenWidth', Taro.getSystemInfoSync().screenWidth)
  return (
    <View className="product-list">
      <NavBarForList />

      <ScrollView style="height:100vh" className="scrollview mt-0" scrollIntoView={floorId} onScroll={onScroll} scrollY scrollWithAnimation>
        <MovableArea className="w-full h-full">
          {/* <Button
            onClick={() => {
              Taro.navigateTo({
                url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=7`,
              })
            }}
          >
            直播跳转
          </Button> */}
          <View direction='all' className={`fixed right-2 bottom-28 z-50 ${showPendant ? '' : 'hidden'}`} style={{ width: '100px', height: '100px' }}>
            <pendant type={type} customParams={customParams} closePictureInPictureMode={closePictureInPictureMode}></pendant>
          </View>
          <ListBanner bannerList={bannerList} />
          <FloorNav setFloorId={setFloorId} />
          <View>
            {floorList.map((floor) => (
              <View>
                <View id={floor.id}></View>
                <View className="p-2">
                  <View className="text-red-600 font-medium py-1">{floor.title}</View>
                  <View className="text-26  text-gray-400">{floor.subTitle}</View>
                </View>
                <View>
                  {(() => {
                    switch (floor.type) {
                      case FloorType.Activity:
                        return <ActivityList list={activityList} />
                      case FloorType.Stars:
                        return <StarsList list={starsList} />
                      default: //FloorType.Dry || FloorType.Wet
                        return (
                          <DryOrWetList
                            list={productList}
                            queryList={queryList}
                            lifestageList={lifestageList}
                            setLifestageList={setLifestageList}
                          />
                        )
                    }
                  })()}
                </View>
              </View>
            ))}
          </View>
        </MovableArea>

      </ScrollView>
    </View>
  )
}

export default ProductList
