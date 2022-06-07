import ListBanner from '@/components/product/ListBanner'
import NavBarForList from '@/components/index/NavBarForList'
import { wxLogin } from '@/framework/api/customer/customer'
import IconFont from '@/iconfont'
import { customerAtom } from '@/store/customer'
import { Image, ScrollView, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { AtButton, AtDivider } from 'taro-ui'
import './index.less'

const bannerLists = [
  {
    img: 'https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/MP_Home_Banner_1.jpg',
    url: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1648800549779_Z3pog8.jpg',
  },
  {
    img: 'https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/MP_Home_Banner_2.jpg',
    url: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1648800549779_Z3pog8.jpg',
  },
  {
    img: 'https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/MP_Home_Banner_3.jpg',
    url: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1648800549779_Z3pog8.jpg',
  },
]

const ProductLists = [
  {
    img: 'https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/Home_Hot_1.png',
    title: '离乳期幼猫全价猫奶糕更新',
    noPrice: '199',
    Price: '169',
  },
  {
    img: 'https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/Home_Hot_2.jpg',
    title: '幼猫全价粮',
    noPrice: '169',
    Price: '138',
  },
  {
    img: 'https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/Home_Hot_3.jpg',
    title: '小型犬幼犬离乳期全价奶糕',
    noPrice: '241',
    Price: '212',
  },
  {
    img: 'https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/Home_Hot_4.jpg',
    title: '柴犬幼犬全价粮',
    noPrice: '288',
    Price: '264',
  },
  {
    img: 'https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/Home_Hot_5.jpg',
    title: '小型犬幼犬全价粮',
    noPrice: '138',
    Price: '120',
  },
]

const ProductList = () => {
  const [openDistMyPets, setOpenDistMyPets] = useState(false)
  const [, setCustomer] = useAtom(customerAtom)

  const loginInit = async () => {
    if (Taro.getStorageSync('wxLoginRes')) {
      const data = await wxLogin()
      setCustomer(data)
    }
  }

  useEffect(() => {
    loginInit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const distMyPets = () => {
    setOpenDistMyPets(true)
  }

  return (
    <View className="HomeIndex">
      <NavBarForList />
      <View
        className={`text-xs flex items-center w-full fixed top-20 z-30 justify-center ${openDistMyPets && 'hidden'}`}
      >
        <View className="flex items-center justify-center bg-white shadow-2xl p-2 fexidMyPets">
          点击&quot;
          <IconFont name="a-Frame4" size={30} />
          &quot;<View className="text-red-500">添加到我的小程序</View>，订粮更方便
          <View className="ml-4" onClick={distMyPets}>
            <IconFont name="shanchu" size={20} />
          </View>
        </View>
      </View>
      <View className="mt-0 p-1 pb-0">
        <View className="text-xs">
          <View className="flex items-center justify-center text-sm text-gray-500 p-3">
            <IconFont name="a-Group233" size={38} />
            <View className="ml-1">
              皇家宠物<Text className="ml-2">提供全心营养支持</Text>
            </View>
          </View>
          <ListBanner bannerList={bannerLists} liveStreaming={[]} />
          <View className="p-2 pt-10 pb-0">
            <View className="flex h-12">
              <View className="w-12 h-full">
                <Image
                  className="w-full h-full"
                  src="https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/Wechat.png"
                />
              </View>
              <View className="flex flex-col h-full ml-2">
                <View>更多有趣易懂养宠知识都在这里</View>
                <View className="mt-1">订阅我，随时掌握宠粮发货进度</View>
              </View>
              <View className="flex-1 h-full flex pt-1 justify-end">
                <AtButton className="m-0 py-0" full={false} size="small" type="primary">
                  去关注
                </AtButton>
              </View>
            </View>
            <View className="mt-4">
              <View style={{ fontSize: '0.8rem' }} className="font-bold mt-6 mb-3">
                开启专属宠爱
              </View>
              <Image
                className="w-full h-48"
                src="https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/MP_Home_Fresh_new.gif"
              />
            </View>
            <View>
              <View style={{ fontSize: '0.8rem' }} className="font-bold mt-6 mb-3">
                热门产品/新品
              </View>
              <View className="flex">
                <ScrollView className="whitespace-nowrap " scrollX overflow-anchor={false}>
                  {ProductLists.map((item, index) => (
                    <View key={index} className="w-32 inline-block ml-2">
                      <Image className="w-full h-28" src={item.img} />
                      <View className="px-2">
                        <View className="text-block truncate">{item.title}</View>
                        <View className="flex justify-between items-center text-red-600">
                          <Text className="text-gray-300 line-through">原价￥{item.noPrice}</Text>
                          <Text>￥ {item.Price}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
            <View className="mt-6">
              <Image
                className="w-full"
                style={{ height: '52rem' }}
                src="https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/MP_Home_Introduce.png"
              />
            </View>
            <View>
              <Image
                className="w-full h-72"
                src="https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/MP_Home_other_new.png"
              />
            </View>
          </View>
        </View>
      </View>
      <AtDivider className="h-12 mb-4" fontColor="#d5d5d5" lineColor="#d5d5d5" content="我也是有底线的" />
    </View>
  )
}

export default ProductList
