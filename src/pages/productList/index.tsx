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
import { View, ScrollView, Button } from '@tarojs/components'
import './index.less'
import { wxLogin } from '@/framework/api/customer/customer'
import { useAtom } from 'jotai'
import { customerAtom } from '@/store/customer'

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
  const [bannerList, setBannerList] = useState<SwiperProps[]>(bannerLists)
  const [activityList, setActivityList] = useState<SwiperProps[]>(bannerLists)
  const [starsList, setStarsList] = useState<SwiperProps[]>(starsLists)
  const [productList, setProductList] = useState(productLists)
  const [lifestageList, setLifestageList] = useState(lifestageLists)
  const [floorId, setFloorId] = useState<string>('')
  const [, setCustomer] = useAtom(customerAtom)

  const queryList = (params) => {
    console.info('params', params)
    setProductList(productList)
    //getlist
  }
  const loginInit = async () => {
    if (Taro.getStorageSync('wxLoginRes')) {
      const data = await wxLogin()
      setCustomer(data)
    }
  }
  useEffect(() => {
    loginInit()
  }, [])

  console.log('Taro.getSystemInfoSync().screenWidth', Taro.getSystemInfoSync().screenWidth)
  return (
    <View className="product-list">
      <NavBarForList />
      <ScrollView style="height:100vh" className="scrollview mt-0" scrollIntoView={floorId} scrollY scrollWithAnimation>
        <Button
          onClick={() => {
            Taro.navigateTo({
              url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=7`,
            })
          }}
        >
          直播跳转
        </Button>
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
      </ScrollView>
    </View>
  )
}

export default ProductList
