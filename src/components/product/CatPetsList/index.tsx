import { Image, ScrollView, Text, View } from '@tarojs/components'
import { useState } from 'react'
import { AtButton } from 'taro-ui'

const CatPetsList = ({ list }: any) => {
  const [cat, setCat] = useState(list[0])

  return (
    <View className="pb-4 mt-1 flex flex-col">
      <View className="flex justify-between items-center px-2 mb-2">
        {list.map((item, idx) => (
          <View
            className="px-1 flex flex-col text-center"
            key={idx}
            onClick={() => {
              setCat(list.find((_, index) => idx === index))
            }}
          >
            <View
              className={`w-12 h-12 rounded-full border-10 border-solid `}
              style={{
                borderColor: cat.title === item.title ? cat.color : 'transparent',
              }}
            >
              <Image
                className="box-border w-full h-full rounded-full"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </View>
            <View className="text-24">{item.title}</View>
          </View>
        ))}
      </View>
      <View
        className="bg-gray-100 relative flex flex-col justify-between"
        style={{ height: cat.Children.length > 1 ? '35rem' : '22rem' }}
      >
        <View className="w-full h-28" style={{ backgroundColor: cat.color }} />
        <View style={{ transform: 'translateY(-9%)' }}>
          <ScrollView className="whitespace-nowrap" scrollX>
            <View className="inline-block px-1">
              <View className="flex flex-col flex-wrap" style={{ height: cat.Children.length > 1 ? '27rem' : '15rem' }}>
                {cat.Children.map((item, idx) => (
                  <View key={idx} className="inline-block px-1 h-52  w-36">
                    <View className="bg-white rounded-lg">
                      {/* <Image src={item.img} className="w-30 h-28" /> */}
                      <Image
                        src="https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1613794160492_Id2TmT.png"
                        className="w-full h-32"
                      />
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
export default CatPetsList
