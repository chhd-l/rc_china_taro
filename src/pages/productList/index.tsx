import ActivityList from '@/components/product/ActivityList'
import CatPetsList from '@/components/product/CatPetsList'
import DogPetsList from '@/components/product/DogPetsList'
import FloorNav from '@/components/product/FloorNav'
import List from '@/components/product/List'
import ListBanner from '@/components/product/ListBanner'
import NavBarForList from '@/components/product/NavBarForList'
import StarsList from '@/components/product/StarsList'
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
    if (e.detail.scrollTop >= 2790) {
      setFloorActiveId('odgDryFood')
    }
    if (e.detail.scrollTop >= 3598) {
      setFloorActiveId('dogWetFood')
    }
  }

  const onScrollFooList = (Left: number) => {
    setscrollLeft(Left)
    if (Left <= -1) {
      setscrollLeftOpen(false)
    } else {
      setscrollLeftOpen(true)
    }
  }

  const getProductList = async () => {
    Taro.setStorageSync('commerce-loading', 1)
    let res = await getProducts({ limit: 10, sample: {}, hasTotal: true, offset: 0 })
    setProductList(res?.productList || [])
  }

  useEffect(() => {
    getProductList()
  }, [])

  return (
    <View className="product-list overflow-hidden">
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
            <View key="活动专区">
              <View id="activity" className="h-4" />
              <View className="px-4">
                <View className="text-red-500 text-34 font-black">活动专区</View>
                <View className="text-gray-400" style={{ fontSize: '25rpx' }}>
                  订阅商城 社群福利
                </View>
              </View>
              <View>
                <ActivityList list={activityList} />
              </View>
            </View>
            <View key="明星猫粮">
              <View id="catStar" className="h-4" />
              <View className="px-4">
                <View className="text-red-500 text-34 font-black">明星猫粮</View>
                <View className="text-gray-400" style={{ fontSize: '25rpx' }}>
                  省薪囤货 爆款猫粮
                </View>
              </View>
              <View>
                <StarsList list={mxCatDryFood} />
              </View>
            </View>
            <View key="全价猫干粮">
              <View id="catDryFood" className="h-4" />
              <View className="px-4">
                <View className="text-red-500 text-34 font-black">全价猫干粮</View>
                <View className="text-gray-400" style={{ fontSize: '25rpx' }}>
                  让不同年龄、品种、健康问题的猫咪定制专属营养
                </View>
              </View>
              <View>
                <CatPetsList list={catDryFood} />
              </View>
            </View>
            <View key="全价主食级猫湿粮">
              <View id="catWetFood" className="h-4" />
              <View className="px-4">
                <View className="text-red-500 text-34 font-black">全价主食级猫湿粮</View>
                <View className="text-gray-400" style={{ fontSize: '25rpx' }}>
                  宠爱升级，享受肉食乐趣同时满足每日所需营养
                </View>
              </View>
              <View>
                <CatPetsList list={catDryFood} />
              </View>
            </View>
            <View key="明星犬粮">
              <View id="dogStar" className="h-4" />
              <View className="px-4">
                <View className="text-red-500 text-34 font-black">明星犬粮</View>
                <View className="text-gray-400" style={{ fontSize: '25rpx' }}>
                  省薪囤货 爆款犬粮
                </View>
              </View>
              <View>
                <StarsList list={mxDogDryFood} />
              </View>
            </View>
            <View key="犬干粮">
              <View id="odgDryFood" className="h-4" />
              <View className="px-4">
                <View className="text-red-500 text-34 font-black">全价狗干粮</View>
                <View className="text-gray-400" style={{ fontSize: '25rpx' }}>
                  让不同年龄、品种、健康问题的狗狗都有自己的精准营养
                </View>
              </View>
              <View>
                <DogPetsList list={dogDryFood} />
              </View>
            </View>
            <View key="犬湿粮">
              <View id="dogWetFood" className="h-4" />
              <View className="px-4">
                <View className="text-red-500 text-34 font-black">全价主食级狗湿粮</View>
                <View className="text-gray-400" style={{ fontSize: '25rpx' }}>
                  宠爱升级，享受肉食乐趣同时满足每日所需营养
                </View>
              </View>
              <View>
                <DogPetsList list={dogDryFood2} />
              </View>
            </View>
            <View key="宠爱精选">
              <View className="text-red-500 text-34 font-black px-4">宠爱精选</View>
              <View>
                <List list={productList} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default ProductList
