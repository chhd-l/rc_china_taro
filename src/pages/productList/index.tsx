import ActivityList from '@/components/product/ActivityList'
import CatPetsList from '@/components/product/CatPetsList'
import DogPetsList from '@/components/product/DogPetsList'
import FloorNav from '@/components/product/FloorNav'
import List from '@/components/product/List'
import ListBanner from '@/components/product/ListBanner'
import NavBarForList from '@/components/product/NavBarForList'
import StarsList from '@/components/product/StarsList'
import AuthLogin from '@/components/consumer/AuthLogin'
import { getProducts } from '@/framework/api/product/get-product'
import {
  activityList,
  bannerLists,
  catDryFood,
  dogDryFood,
  dogDryFood2,
  mxCatDryFood,
  mxDogDryFood,
} from '@/lib/product'
import { ScrollView, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import './index.less'

const ProductList = () => {
  const [MyPets, setMyPets] = useState(false)
  const [MyPets2, setMyPets2] = useState(false)
  const [productList, setProductList] = useState([])
  const [floorActiveId, setFloorActiveId] = useState<string>('activity')
  const [scrollLeft, setscrollLeft] = useState(0)
  const [scrollLeftOpen, setscrollLeftOpen] = useState(true)
  const [floorId, setFloorId] = useState<string>('')

  const onScroll = (e) => {
    setFloorId('')
    if (e.detail.scrollTop > 370) {
      setMyPets2(true)
    } else {
      setMyPets2(false)
    }
    if (e.detail.scrollTop >= 460) {
      setFloorActiveId('activity')
      setMyPets(true)
    } else {
      setMyPets(false)
    }
    if (e.detail.scrollTop > 650) {
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
    if (e.detail.scrollTop >= 2990) {
      setFloorActiveId('odgDryFood')
    }
    if (e.detail.scrollTop >= 3598) {
      setFloorActiveId('dogWetFood')
    }
  }

  const onScrollFooList = (Left: number) => {
    setscrollLeft(Left)
    if (Left > 10) {
      setscrollLeftOpen(false)
    } else {
      setscrollLeftOpen(true)
    }
  }

  const getProductList = async () => {
    Taro.setStorageSync('commerce-loading', 1)
    let res = await getProducts({ limit: 10, sample: {}, withTotal: true, offset: 0 })
    setProductList(res?.productList || [])
  }

  useEffect(() => {
    getProductList()
  }, [])

  return (
    <View className="product-list" style={{ height: '100vh', marginTop: '90rpx' }}>
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
        <View className="w-full h-full">
          <ListBanner bannerList={bannerLists} />
          <View style={{ height: '100rpx' }}>
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
          </View>
          <View>
            <View key="????????????">
              <View id="activity" className="h-4" />
              <View className="px-4">
                <View className="text-red-500 text-34 font-black">????????????</View>
                <View className="text-gray-400" style={{ fontSize: '25rpx' }}>
                  ???????????? ????????????
                </View>
              </View>
              <View>
                <ActivityList list={activityList} />
              </View>
            </View>
            <View key="????????????">
              <View id="catStar" className="h-4" />
              <View className="px-4">
                <View className="text-red-500 text-34 font-black">????????????</View>
                <View className="text-gray-400" style={{ fontSize: '25rpx' }}>
                  ???????????? ????????????
                </View>
              </View>
              <View>
                <StarsList list={mxCatDryFood} />
              </View>
            </View>
            <View key="???????????????">
              <View id="catDryFood" className="h-4" />
              <View className="px-4">
                <View className="text-red-500 text-34 font-black">???????????????</View>
                <View className="text-gray-400" style={{ fontSize: '25rpx' }}>
                  ??????????????????????????????????????????????????????????????????
                </View>
              </View>
              <View>
                <CatPetsList list={catDryFood} />
              </View>
            </View>
            <View key="????????????????????????">
              <View id="catWetFood" className="h-4" />
              <View className="px-4">
                <View className="text-red-500 text-34 font-black">????????????????????????</View>
                <View className="text-gray-400" style={{ fontSize: '25rpx' }}>
                  ???????????????????????????????????????????????????????????????
                </View>
              </View>
              <View>
                <CatPetsList list={catDryFood} />
              </View>
            </View>
            <View key="????????????">
              <View id="dogStar" className="h-4" />
              <View className="px-4">
                <View className="text-red-500 text-34 font-black">????????????</View>
                <View className="text-gray-400" style={{ fontSize: '25rpx' }}>
                  ???????????? ????????????
                </View>
              </View>
              <View>
                <StarsList list={mxDogDryFood} />
              </View>
            </View>
            <View key="?????????">
              <View id="odgDryFood" className="h-4" />
              <View className="px-4">
                <View className="text-red-500 text-34 font-black">???????????????</View>
                <View className="text-gray-400" style={{ fontSize: '25rpx' }}>
                  ???????????????????????????????????????????????????????????????????????????
                </View>
              </View>
              <View>
                <DogPetsList list={dogDryFood} />
              </View>
            </View>
            <View key="?????????">
              <View id="dogWetFood" className="h-4" />
              <View className="px-4">
                <View className="text-red-500 text-34 font-black">????????????????????????</View>
                <View className="text-gray-400" style={{ fontSize: '25rpx' }}>
                  ???????????????????????????????????????????????????????????????
                </View>
              </View>
              <View>
                <DogPetsList list={dogDryFood2} />
              </View>
            </View>
            <View key="????????????">
              <View className="text-red-500 text-34 font-black px-4">????????????</View>
              <View>
                <List list={productList} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <AuthLogin />
    </View>
  )
}

export default ProductList
