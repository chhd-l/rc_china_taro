import ActivityList from '@/components/product/ActivityList'
import CatPetsList from '@/components/product/CatPetsList'
import DogPetsList from '@/components/product/DogPetsList'
import DryOrWetList from '@/components/product/DryOrWetList'
import FloorNav from '@/components/product/FloorNav'
import ListBanner from '@/components/product/ListBanner'
import NavBarForList from '@/components/product/NavBarForList'
import StarsList from '@/components/product/StarsList'
import { getLiveStreamingFindOnLive } from '@/framework/api/live-streaming/live-streaming'
import { getProducts } from '@/framework/api/product/get-product'
import { SwiperProps } from '@/framework/types/products'
import { LIVINGSTREAMING_ONGOING, LIVINGSTREAMING_UPCOMING } from '@/lib/constants'
import { catDryFood, dogDryFood, mxCatDryFood, mxDogDryFood } from '@/lib/product'
import { mockProduct, mockStar, mockTabOptions } from '@/mock/product'
import { customerAtom } from '@/store/customer'
import { MovableArea, ScrollView, View } from '@tarojs/components'
import { requirePlugin } from '@tarojs/taro'
import { useAtom } from 'jotai'
import Mock from 'mockjs'
import { useEffect, useState } from 'react'
import List from '@/components/product/List'
import './index.less'

let livePlayer = requirePlugin('live-player-plugin')
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

const activityList = [
  {
    img: 'https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/Shop_Active_banner.jpg',
    url: '',
  },
]

let type = 0 // 0. 显示直播、预告、商品讲解、回放其中之一的挂件；1. 只显示直播的挂件；2. 只显示预告的挂件；3. 只显示商品讲解的挂件；4. 只显示回放的挂件
let customParams = encodeURIComponent(JSON.stringify({ path: 'pages/index/index', pid: 1 })) // 开发者在直播间页面路径上携带自定义参数（如示例中的 path 和pid参数），后续可以在分享卡片链接和跳转至商详页时获取，详见【获取自定义参数】、【直播间到商详页面携带参数】章节（上限600个字符，超过部分会被截断）
let closePictureInPictureMode = 0 // 是否关闭小窗

const starsLists = Mock.mock(mockStar).list
const productLists = Mock.mock(mockProduct).list
const lifestageLists = Mock.mock(mockTabOptions).list
const liveStatusIconList = {
  101: LIVINGSTREAMING_ONGOING,
  102: LIVINGSTREAMING_UPCOMING,
}
let timer: any = null

const ProductList = () => {
  const [bannerList, setBannerList] = useState<any[]>(bannerLists)
  const [starsList, setStarsList] = useState<SwiperProps[]>(starsLists)
  const [showPendant, setShowPendant] = useState(false)
  const [MyPets, setMyPets] = useState(false)
  const [MyPets2, setMyPets2] = useState(false)
  const [productList, setProductList] = useState([])
  const [lifestageList, setLifestageList] = useState(lifestageLists)
  const [floorActiveId, setFloorActiveId] = useState<string>('activity')
  const [scrollLeft, setscrollLeft] = useState(0)
  const [scrollLeftOpen, setscrollLeftOpen] = useState(true)
  const [floorId, setFloorId] = useState<string>('')
  let [liveStreaming, setLiveStreaming] = useState<any>([])

  // const [productList, setProductList] = useState(productLists)
  // const queryList = (params) => {
  //   console.info('params', params)
  //   setProductList(productList)
  //   //getlist
  // }

  const getLiveStreamingFindOnLiveData = async () => {
    let data = await getLiveStreamingFindOnLive('22c2f601-5a60-8b10-20c1-c56ef0d8bd53')
    let LiveStreamings =
      data?.map((el) => {
        return {
          img: el.shareImg,
          status: el.liveStatus,
          linkHref: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${el.roomId}`,
        }
      }) || []
    // let newBanner = [...LiveStreamings, ...bannerList]
    // setBannerList(newBanner)
    // console.info('datanewBanner', newBanner)
  }

  const onScroll = (e) => {
    if (e.detail.scrollTop > 370) {
      // setShowPendant(true)
      setMyPets2(true)
    } else {
      // setShowPendant(false)
      setMyPets2(false)
    }
    if (e.detail.scrollTop >= 460) {
      setFloorActiveId('activity')
      setMyPets(true)
    } else {
      setMyPets(false)
    }
    if (e.detail.scrollTop > 680) {
      setFloorActiveId('catStar')
    }
    if (e.detail.scrollTop >= 920) {
      setFloorActiveId('catDryFood')
    }
    if (e.detail.scrollTop >= 1720) {
      setFloorActiveId('catWetFood')
    }
    if (e.detail.scrollTop >= 2520) {
      setFloorActiveId('dogStar')
    }
    if (e.detail.scrollTop >= 2790) {
      setFloorActiveId('odgDryFood')
    }
    if (e.detail.scrollTop >= 3598) {
      setFloorActiveId('dogWetFood')
    }
  }

  const onScrollFooList = (Left: number) => {
    setscrollLeft(Left)
    if (Left > 35) {
      setscrollLeftOpen(false)
    } else {
      setscrollLeftOpen(true)
    }
  }

  const getProductList = async () => {
    let res = await getProducts({ limit: 10, sample: {}, hasTotal: true, offset: 0 })
    setProductList(res?.productList || [])
  }

  useEffect(() => {
    // getLiveStreamingFindOnLiveData()
    getProductList()
  }, [])

  return (
    <View className="product-list">
      <NavBarForList
        MyPets={MyPets}
        floorActiveId={floorActiveId}
        setFloorActiveId={setFloorActiveId}
        setFloorId={setFloorId}
        onScrollFooList={onScrollFooList}
        scrollLeft={scrollLeft}
        scrollLeftOpen={scrollLeftOpen}
        setShowPendant={MyPets2}
      />
      <ScrollView
        className="scrollview mt-0"
        scrollIntoView={floorId}
        onScroll={onScroll}
        scrollY
        scrollAnchoring
        scrollWithAnimation
        enhanced
      >
        <MovableArea className="w-full h-full">
          {/* <View
            direction="all"
            className={`fixed right-2 bottom-28 z-50 ${showPendant ? '' : 'hidden'}`}
            style={{ width: '100px', height: '100px' }}
          >
            <pendant
              type={type}
              customParams={customParams}
              closePictureInPictureMode={closePictureInPictureMode}
            ></pendant>
          </View> */}
          <ListBanner bannerList={bannerList} />
          <FloorNav
            setFloorId={setFloorId}
            floorActiveId={floorActiveId}
            setFloorActiveId={setFloorActiveId}
            MyPets={MyPets}
            onScrollFooList={onScrollFooList}
            scrollLeft={scrollLeft}
            scrollLeftOpen={scrollLeftOpen}
            setShowPendant={MyPets2}
          />
          <View style={{ paddingTop: MyPets ? '3.375rem' : '' }}>
            <View key="活动专区">
              <View id="activity" className="h-4" />
              <View className="px-4">
                <View className="text-red-500 text-base font-bold">活动专区</View>
                <View className="text-26 text-gray-400">订阅商城 社群福利</View>
              </View>
              <View>
                <ActivityList list={activityList} />
              </View>
            </View>
            <View key="明星猫粮">
              <View id="catStar" className="h-4" />
              <View className="px-4">
                <View className="text-red-500 text-base font-bold">明星猫粮</View>
                <View className="text-26 text-gray-400">省薪囤货 爆款猫粮</View>
              </View>
              <View>
                <StarsList list={mxCatDryFood} />
              </View>
            </View>
            <View key="全价猫干粮">
              <View id="catDryFood" className="h-4" />
              <View className="px-4">
                <View className="text-red-500 text-base font-bold">全价猫干粮</View>
                <View className="text-26 text-gray-400">让不同年龄、品种、健康问题的猫咪定制专属营养</View>
              </View>
              <View>
                <CatPetsList list={catDryFood} />
              </View>
            </View>
            <View key="全价主食级猫湿粮">
              <View id="catWetFood" className="h-4" />
              <View className="px-4">
                <View className="text-red-500 text-base font-bold">全价主食级猫湿粮</View>
                <View className="text-26 text-gray-400">宠爱升级，享受肉食乐趣同时满足每日所需营养</View>
              </View>
              <View>
                <CatPetsList list={catDryFood} />
              </View>
            </View>
            <View key="明星犬粮">
              <View id="dogStar" className="h-4" />
              <View className="px-4">
                <View className="text-red-500 text-base font-bold">明星犬粮</View>
                <View className="text-26 text-gray-400">省薪囤货 爆款犬粮</View>
              </View>
              <View>
                <StarsList list={mxDogDryFood} />
              </View>
            </View>
            <View key="犬干粮">
              <View id="odgDryFood" className="h-4" />
              <View className="px-4">
                <View className="text-red-500 text-base font-bold">犬干粮</View>
                <View className="text-26 text-gray-400">让不同年龄、品种、健康问题的狗狗都有自己的精准营养</View>
              </View>
              <View>
                <DogPetsList list={dogDryFood} />
              </View>
            </View>
            <View key="犬湿粮">
              <View id="dogWetFood" className="h-4" />
              <View className="px-4">
                <View className="text-red-500 text-base font-bold">犬湿粮</View>
                <View className="text-26 text-gray-400">宠爱升级，享受肉食乐趣同时满足每日所需营养</View>
              </View>
              <View>
                <DogPetsList list={dogDryFood} />
              </View>
            </View>
            <View key="宠爱精选">
              <View className="text-red-500 text-base font-bold px-4">宠爱精选</View>
              <View>
                <List list={productList} />
              </View>
            </View>

            {/* {floorList.map((floor, idx) => (
              <View key={idx}>
                <View id={floor.id} className="h-4" />
                <View className="px-4">
                  <View className="text-red-500 text-base font-bold">{floor.title}</View>
                  <View className="text-26 text-gray-400">{floor.subTitle}</View>
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
            ))} */}
          </View>
        </MovableArea>
      </ScrollView>
    </View>
  )
}

export default ProductList
