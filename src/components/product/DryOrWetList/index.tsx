import { OptionsProps } from '@/framework/types/common'
import cloneDeep from 'lodash.cloneDeep'
import { ScrollView, View, Image, Text } from '@tarojs/components'
import { useEffect, useState } from 'react'
import ShopProductList from '../ShopProductList'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
interface TabOptionsProps extends OptionsProps {
  icon: string
  active: boolean | undefined
  subLabel: string
  children?: TabOptionsProps[]
  headerImg?: string
  seeMoreUrl?: string
  moduleColor?: string
  titleLable?: string
}
interface DryListProps {
  list: any
  lifestageList: TabOptionsProps[]
  queryList: (params: any) => void
  setLifestageList: (lifestageList: TabOptionsProps[]) => void
}
const DryOrWetList = ({ list, lifestageList, queryList, setLifestageList }: DryListProps) => {
  const [breedList, setBreedList] = useState<TabOptionsProps[]>(lifestageList[0].children || [])
  const [seeMoreUrl, setseeMoreUrl] = useState<string>('')
  const [headerImg, setHeaderImg] = useState<string>('')
  useEffect(() => {
    let newItem = { headerImg: '', seeMoreUrl: '' } as TabOptionsProps
    if (breedList?.length) {
      newItem = breedList.find((breed) => breed.active) || breedList[0]
    } else {
      newItem = lifestageList.find((lifestage) => lifestage.active) || lifestageList[0]
    }
    setHeaderImg(newItem.headerImg || '')
    setseeMoreUrl(newItem.seeMoreUrl || '')
  }, [lifestageList, breedList])
  useEffect(() => {
    //一进来默认第一个是active
    lifestageList[0].active = true
    if (breedList?.length) {
      breedList[0].active = true
    }
  }, [])
  const handleChangeBreed = (breed) => {
    breedList.forEach((item) => {
      if (item.value === breed.value) {
        item.active = !item.active
      }
    })
    setBreedList(cloneDeep(breedList))
  }
  const handleChangeLifestage = (lifestage) => {
    let params: any = {}
    lifestageList.forEach((item) => {
      if (item.value === lifestage.value) {
        item.active = !item.active
        params.lifestage = lifestage.value
        // 更换lifestage的时候切换breed并重置到第一个默认active
        if (item.children) {
          item.children.forEach((breed) => {
            breed.active = false
          })
          item.children[0].active = true
          params.breed = item.children[0].value
          setBreedList(item.children)
        }
      }
    })

    queryList(params)
    setLifestageList(cloneDeep(lifestageList))
  }
  const handleSeeMore = () => {
    let selected = breedList?.length ? breedList : lifestageList
    let title = selected.find((item) => item.active)?.titleLable
    let url = `${seeMoreUrl || '/pages/packageA/moreProducts/index'}?title=${title}`
    console.info(seeMoreUrl, url)
    Taro.navigateTo({
      url,
    })
  }
  return (
    <View>
      {lifestageList ? (
        <ScrollView className="whitespace-nowrap pb-2" scrollX>
          {lifestageList.map((lifestage) => (
            <View
              className={`px-1 inline-block text-center `}
              onClick={() => {
                handleChangeLifestage(lifestage)
              }}
            >
              <View
                className={` inline-block w-12 h-12 rounded-full border-10 border-solid `}
                style={{
                  borderColor: `${lifestage.active ? lifestage.moduleColor : 'transparent'}`,
                }}
              >
                <Image
                  className={`box-border w-12 h-12 rounded-full border-1 border-solid  ${
                    lifestage.active ? 'border-transparent' : 'border-gary-300'
                  }`}
                  src={lifestage.icon}
                />
              </View>
              <View className="text-24">{lifestage.label}</View>
            </View>
          ))}
        </ScrollView>
      ) : null}
      {breedList ? (
        <ScrollView className="whitespace-nowrap" scrollX>
          {breedList.map((breed) => (
            <View
              style="width:33.3%"
              className={`inline-block text-center px-1 ${breed.active ? 'bg-red-600' : 'bg-gray-400'}`}
              onClick={() => {
                handleChangeBreed(breed)
              }}
            >
              <View>
                <Image
                  className={`box-border w-4 h-4  border-1 border-solid  ${
                    breed.active ? 'border-transparent' : 'border-gary-300'
                  }`}
                  src={breed.icon}
                />
                <Text className="text-26 font-medium">{breed.label}</Text>
              </View>

              <View className="text-24">{breed.subLabel}</View>
            </View>
          ))}
        </ScrollView>
      ) : null}
      <Image src={headerImg} className="w-full" mode="widthFix" />
      <ShopProductList list={list} />
      <View className="p-2">
        <AtButton size="small" type="primary" className="bg-red-600 border-0" circle onClick={handleSeeMore}>
          查看更多
        </AtButton>
      </View>
    </View>
  )
}
export default DryOrWetList
