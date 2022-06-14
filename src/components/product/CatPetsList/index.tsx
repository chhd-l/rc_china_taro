import { Image, ScrollView, View } from '@tarojs/components'
import { useState } from 'react'
import { AtButton } from 'taro-ui'

const CatPetsList = ({ list, systemType }: any) => {
  const [cat, setCat] = useState(list[0])

  return (
    <View className="pb-4 mt-1 flex flex-col">
      <View className="flex items-center px-2 mb-2">
        {list.map((item, idx) => (
          <View
            className="flex flex-col text-center items-center"
            style={{ width: '20%' }}
            key={idx}
            onClick={() => {
              setCat(list.find((_, index) => idx === index))
            }}
          >
            <View
              className={`w-12 h-12 rounded-full ${cat.title === item.title ? 'border-10' : 'border-2'} border-solid `}
              style={{
                borderColor: cat.title === item.title ? cat.color : '#C1C1C1',
              }}
            >
              <Image className="box-border w-full h-full rounded-full" src={item.titleImg} />
            </View>
            <View className="text-24">{item.title}</View>
          </View>
        ))}
      </View>
      <View
        className="bg-gray-100 relative flex flex-col justify-between"
        style={{
          height:
            cat.Children.length > 1
              ? systemType
                ? '34.5rem'
                : '37rem'
              : cat.Children.length === 0
              ? systemType
                ? '10.5rem'
                : '12rem'
              : systemType
              ? '22.5rem'
              : '24rem',
        }}
      >
        <View className={`w-full ${systemType ? 'h-32' : 'h-36'}`}>
          <Image className="w-full h-full" src={cat.img} />
        </View>
        <View style={{ transform: systemType ? 'translateY(-6%)' : 'translateY(-8%)' }}>
          <ScrollView className="whitespace-nowrap" scrollX>
            <View className="inline-block px-1">
              <View className="flex flex-col flex-wrap" style={{ height: cat.Children.length > 1 ? '27rem' : '15rem' }}>
                {cat.Children.map((item, idx) => (
                  <View key={idx} className="inline-block px-1 h-52 w-36">
                    <View className="bg-white overflow-hidden rounded-lg pb-2">
                      <Image src={item.img} className="w-full h-36" />
                      <View className="text-center text-28 pb-1 px-1 whitespace-normal">{item.title}</View>
                    </View>
                    <View className="flex items-center h-6 justify-end">
                      <View style={{ fontSize: systemType ? '1rem' : '20px', lineHeight: '1.1' }}>￥{item.price}</View>
                      <View
                        style={{ borderRadius: '2px', fontSize: '.6rem' }}
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
export default CatPetsList
