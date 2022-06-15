import { Image, ScrollView, View } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { AtButton } from 'taro-ui'
import './index.less'

const httpsTilte = 'https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/'

const SecondaryMenu1 = [httpsTilte + 'Dog_bg1_01.png']
const SecondaryMenu2 = [httpsTilte + 'Dog_bg2_01.png', httpsTilte + 'Dog_bg2_02.png']
const SecondaryMenu3 = [httpsTilte + 'Dog_bg3_01.png', httpsTilte + 'Dog_bg3_02.png', httpsTilte + 'Dog_bg3_03.png']

const DogPetsList = ({ list, systemType }: any) => {
  const [dog, setDog] = useState(list[0])
  const [pets, setPets] = useState(dog.Children[0])
  const [bg, setBg] = useState<{
    DogBg: string
    bgList: string[]
  }>({
    DogBg: '',
    bgList: [],
  })

  useEffect(() => {
    if (list[0].Children.length === 1) {
      setBg({
        DogBg: SecondaryMenu1[0],
        bgList: SecondaryMenu1,
      })
    } else if (list[0].Children.length === 2) {
      setBg({
        DogBg: SecondaryMenu2[0],
        bgList: SecondaryMenu2,
      })
    } else {
      setBg({
        DogBg: SecondaryMenu3[0],
        bgList: SecondaryMenu3,
      })
    }
  }, [list])

  return (
    <View className="pb-4 mt-1 flex flex-col DogPetList">
      <View className="flex items-center px-2 mb-2">
        {list.map((item, idx) => (
          <View
            className="flex flex-col text-center items-center"
            style={{ width: '20%' }}
            key={idx}
            onClick={() => {
              const arr = list.find((_, index) => idx === index).Children
              setDog(list.find((_, index) => idx === index))
              setPets(arr[0])
              if (arr.length === 1) {
                setBg({
                  DogBg: SecondaryMenu1[0],
                  bgList: SecondaryMenu1,
                })
              } else if (arr.length === 2) {
                setBg({
                  DogBg: SecondaryMenu2[0],
                  bgList: SecondaryMenu2,
                })
              } else {
                setBg({
                  DogBg: SecondaryMenu3[0],
                  bgList: SecondaryMenu3,
                })
              }
            }}
          >
            <View
              className={`rounded-full ${dog.title === item.title ? 'border-10' : 'border-2'} border-solid`}
              style={{
                borderColor: dog.title === item.title ? dog.color : '#C1C1C1',
                width: '116rpx',
                height: '116rpx',
              }}
            >
              <Image className="box-border w-full h-full rounded-full" src={httpsTilte + item.titleImg} />
            </View>
            <View className="text-24">{item.title}</View>
          </View>
        ))}
      </View>
      <ScrollView enableFlex className="whitespace-nowrap" scrollX>
        <View
          className="flex items-center pb-4"
          style={{
            width: '107vw',
            background: `url(${bg.DogBg}) no-repeat center`,
            backgroundSize: '100% 100%',
          }}
        >
          {dog.Children.map((item, idx) => (
            <View
              key={idx}
              className="text-center flex flex-col items-center justify-center pr-1 pt-3"
              style={{ width: '33.33%' }}
              onClick={() => {
                setPets(dog.Children.find((_, index) => idx === index))
                const DogBg = bg.bgList[idx]
                console.log(DogBg)
                setBg({
                  DogBg,
                  bgList: bg.bgList,
                })
              }}
            >
              <View className="text-xs font-bold flex">
                <View
                  className="w-5 mr-1"
                  style={{
                    background: `url(${httpsTilte}Dog_0${idx + 1}.svg) no-repeat center`,
                    backgroundSize: `1${idx * 4}0% 1${idx * 4}0%`,
                  }}
                />
                {/* <Image
                  className="w-5 mr-1"
                  src={`${httpsTilte}Dog_02_new.svg`}
                  style={{
                    backgroundSize: `1${idx * 4}0% 1${idx * 4}0%`,
                  }}
                /> */}
                {item.title}
              </View>
              <View style={{ fontSize: '.5rem' }}>参考成年体重10kg</View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View
        className="bg-gray-100 relative flex flex-col justify-between"
        style={{
          height: pets.Children.length > 1 ? '1115rpx' : pets.Children.length === 0 ? '346rpx' : '683rpx',
        }}
      >
        <View className="w-full" style={{ height: '260rpx' }}>
          <Image className="w-full h-full" src={httpsTilte + pets.img} />
        </View>
        <View
          style={{
            transform: 'translateY(-64rpx)',
            height: pets.Children.length > 1 ? '' : pets.Children.length === 0 ? '0' : '403rpx',
          }}
        >
          <ScrollView className="whitespace-nowrap" scrollX>
            <View className="inline-block px-1">
              <View
                className="flex flex-col flex-wrap"
                style={{ height: pets.Children.length > 1 ? '842rpx' : '403rpx' }}
              >
                {pets.Children.map((item, idx) => (
                  <View
                    key={idx}
                    className="inline-block px-1"
                    style={{
                      width: '285rpx',
                      height: '411rpx',
                    }}
                  >
                    <View className="bg-white rounded-lg overflow-hidden pb-2">
                      <Image src={httpsTilte + item.img} className="w-full" style={{ height: '274rpx' }} />
                      <View className="text-center text-28 pb-1 px-1 whitespace-normal">{item.title}</View>
                    </View>
                    <View className="flex items-center h-6 justify-end">
                      <View style={{ fontSize: '37rpx', lineHeight: '1.1' }}>￥{item.price}</View>
                      <View
                        style={{ borderRadius: '2px', fontSize: '22rpx' }}
                        className="bg-red-600 px-1 text-white ml-1"
                      >
                        {item.span}
                      </View>
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
