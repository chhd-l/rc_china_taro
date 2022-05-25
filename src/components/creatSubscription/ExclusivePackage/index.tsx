import IconFont from "@/iconfont"
import { recommendInfoAtom, recommendProductAtom } from "@/store/subscription"
import { Image, Text, View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { useAtom } from "jotai"
import { useState } from "react"
import Card from "../Card"
import AtMyRadio from "../components/AtMyRadio"
import CountTag from "../components/CountTag"
import './index.less'


const ExclusivePackage = () => {
  const [recommendProduct, setRecommendProduct] = useAtom(recommendProductAtom)
  const [recommendInfo] = useAtom(recommendInfoAtom)
  const { goodsVariantInfo: { goodsVariants } } = recommendProduct
  const [current, setCurrent] = useState('FRESH_NORMAL')

  const changeFreshType = (val: string) => {
    const { goodsList } = recommendInfo
    if (val === 'FRESH_100_DAYS') {
      if (!goodsVariants[0].isSupport100) {
        // 新鲜度不存在100天 筛选存在100天的第一条数据
        const good = goodsList.filter(item => item.goodsVariantInfo.goodsVariants[0].isSupport100)[0]
        setRecommendProduct({ ...recommendProduct, ...good, freshType: val })
      }
    } else {
      // 切换到普通 默认显示推荐第一条商品
      setRecommendProduct({ ...recommendProduct, ...goodsList[0], freshType: val })
    }
    setCurrent(val)
  }
  return <View>
    <View className="m-4">
      <View className="font-bold text-base ">{recommendInfo?.recommPetInfo?.name}的专属套餐</View>
      <View className="borderLine" />
      <View className="px-rc120 pt-rc120" >
        <View className="w-full relative" >
          <Image className="w-full " mode="widthFix" src={goodsVariants[0].defaultImage} />
          <CountTag count={recommendProduct.quantity} />
        </View>
        <View onClick={() => Taro.navigateTo({ url: '/pages/packageB/recommendationList/index' })}
          className="border border-rc_ECECEC border-solid text-rc16 text-textGray h-rc38 leading-rc38 mt-1 flex items-center justify-center" >
          <IconFont name="dingzhitaocan0" size={30} />
          更多套餐选择备份  {'>'}</View>
        <View className="font-bold text-rc26 my-2">{goodsVariants[0].name}</View>
        <View className="flex direction-row items-center">
          <View className="bg-primary-red text-white text-rc20 w-rc98 h-rc26 flex flex-row items-center justify-center">
            <IconFont name="shangdianjia" size={24} />商城价</View>
          <View className="text-primary-red font-bold text-rc28">￥{goodsVariants[0].marketingPrice}/包</View>
          <View className="line-through text-textGray text-rc22 ml-2">￥{goodsVariants[0].listPrice}</View>
        </View>
      </View>
      <View className="divider" />
      <View className="flex flex-row items-center">
        <View className=' text-textGray text-rc22 line-through flex items-center'>
          <IconFont name="wenhao01" size={20} />
          <Text className="ml-1">新鲜度</Text>
        </View>
        <AtMyRadio value={current} onClick={changeFreshType} />
      </View>
    </View>
    <Card />
  </View>

}

export default ExclusivePackage