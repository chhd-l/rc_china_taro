import { Image, ScrollView, Text, View } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { AtButton } from 'taro-ui'
import './index.less'

const httpsTilte = 'https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/'

const SecondaryMenu1 = [httpsTilte + 'Dog_bg1_01.png']
const SecondaryMenu2 = [httpsTilte + 'Dog_bg2_01.png', httpsTilte + 'Dog_bg2_02.png']
const SecondaryMenu3 = [httpsTilte + 'Dog_bg3_01.png', httpsTilte + 'Dog_bg3_02.png', httpsTilte + 'Dog_bg3_03.png']

const DogPetsList = ({ list }: any) => {
  const [dog, setDog] = useState(list[0])
  const [pets, setPets] = useState(dog.Children[0])
  const [bg, setBg] = useState<{
    DogBg:string
    bgList:string[]
  }>({
    DogBg : "",
    bgList : []
  })

  useEffect(() => {
    if(list.length === 1) {
      setBg({
        DogBg : SecondaryMenu1[0],
        bgList : SecondaryMenu1
      })
    } else if (list.length === 2) {
      setBg({
        DogBg : SecondaryMenu2[0],
        bgList : SecondaryMenu2
      })
    } else {
      setBg({
        DogBg : SecondaryMenu3[0],
        bgList : SecondaryMenu3
      })
    }
  }, [list])

  return (
    <View className="pb-4 mt-1 flex flex-col DogPetList">
      <View className="flex justify-between items-center px-2 mb-2">
        {list.map((item, idx) => (
          <View
            className="px-1 flex flex-col text-center"
            key={idx}
            onClick={() => {
              setDog(list.find((_, index) => idx === index))
              setPets(list.find((_, index) => idx === index).Children[0])
            }}
          >
            <View
              className={`w-12 h-12 rounded-full border-10 border-solid `}
              style={{
                borderColor: dog.title === item.title ? dog.color : 'transparent',
              }}
            >
              <Image className="box-border w-full h-full rounded-full" src={httpsTilte + item.titleImg} />
            </View>
            <View className="text-24">{item.title}</View>
          </View>
        ))}
      </View>
      <ScrollView enableFlex className="whitespace-nowrap" scrollX>
        <View className="flex items-center pb-4" style={{ 
          width: '107vw',
          background: `url(${bg.DogBg}) no-repeat center`,
          backgroundSize: "100% 100%"
           }}>
          {dog.Children.map((item, idx) => (
            <View
              key={idx}
              className="text-center flex-1 flex flex-col items-center justify-center"
              onClick={() => {
                setPets(dog.Children.find((_, index) => idx === index))
                const DogBg = bg.bgList[idx]
                console.log(DogBg)
                setBg({
                  DogBg,
                  bgList: bg.bgList
                })
              }}
            >
              <View>{item.title}</View>
              <View style={{ fontSize: '0.75rem' }}>参考成年体重10kg</View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View
        className="bg-gray-100 relative flex flex-col justify-between"
        style={{ height: pets.Children.length > 1 ? '36rem' : pets.Children.length === 0 ? '10.6rem' : '23rem' }}
      >
        <View className="w-full h-32">
          <Image className="w-full h-full" src={httpsTilte + pets.img} />
        </View>
        <View style={{ transform: 'translateY(-8%)' }}>
          <ScrollView className="whitespace-nowrap" scrollX>
            <View className="inline-block px-1">
              <View
                className="flex flex-col flex-wrap"
                style={{ height: pets.Children.length > 1 ? '27rem' : '15rem' }}
              >
                {pets.Children.map((item, idx) => (
                  <View key={idx} className="inline-block px-1 h-52  w-36">
                    <View className="bg-white rounded-lg">
                      {/* <Image src={item.img} className="w-30 h-28" /> */}
                      <Image src={httpsTilte + item.img} className="w-full h-32" />
                      <View className="text-center text-28 pb-1 px-1 whitespace-normal" style="height:3em">
                        {item.title}
                      </View>
                    </View>
                    <View className="text-right py-1">
                      <Text className="pr-2 ">￥{item.price}</Text>
                      <Text style={{ borderRadius: '2px' }} className="bg-red-600 px-1 text-white text-24">
                        {item.span}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
        <View className="absolute bottom-2 left-0 flex justify-center" style={{ width: '100vw' }}>
          <AtButton
            customStyle={{ width: '80%' }}
            size="small"
            type="primary"
            className="bg-red-600 border-0"
            circle
            onClick={() => {}}
          >
            查看更多
          </AtButton>
        </View>
      </View>
    </View>
  )
}
export default DogPetsList
