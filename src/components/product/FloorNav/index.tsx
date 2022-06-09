import IconFont from '@/iconfont'
import { floorList } from '@/lib/product'
import { ScrollView, View } from '@tarojs/components'
import { useEffect, useState } from 'react'
import './Style.less'

interface FloorNavProps {
  setFloorId: (id: string) => void
  floorActiveId: string
  setFloorActiveId: Function
  MyPets: boolean
  onScrollFooList: Function
  scrollLeft: number
  scrollLeftOpen: boolean
  setShowPendant: boolean
}

const FloorNav = ({
  setFloorId,
  floorActiveId,
  setFloorActiveId,
  MyPets,
  onScrollFooList,
  scrollLeft,
  scrollLeftOpen,
  setShowPendant,
}: FloorNavProps) => {
  const [Left, setLeft] = useState<null | number>(null)

  const handleNavClick = ({ id }) => {
    setFloorId(id)
    setFloorActiveId(id)
  }

  useEffect(() => {
    setLeft(scrollLeft || null)
  }, [setShowPendant])

  return (
    <View className={`relative ${MyPets && 'opacity-0'} h-14 `}>
      <ScrollView
        className="whitespace-nowrap FloorNav bg-white flex h-full"
        enableFlex
        scrollX
        // scroll-left={Left}
        onScroll={(v) => {
          setLeft(v.detail.scrollLeft)
          onScrollFooList(v.detail.scrollLeft)
        }}
      >
        <View className="sticky top-0 text-xs h-full flex">
          {floorList.map((floor, idx) => (
            <View
              key={idx}
              onClick={() => {
                handleNavClick(floor)
              }}
              style={{
                fontSize: '0.82rem',
                background:
                  floorActiveId === floor.id
                    ? 'linear-gradient(rgba(255,255,255),rgba(255,255,255),rgb(210, 210, 210))'
                    : 'red',
              }}
              className={`inline-block px-2 flex flex-col items-center justify-center h-full ${
                floorActiveId === floor.id ? 'font-medium text-red-600' : 'text-white'
              }`}
            >
              <IconFont name={floor.icon} size={44} color={`${floorActiveId === floor.id ? 'red' : '#fff'}`} />
              {floor.label}
            </View>
          ))}
        </View>
      </ScrollView>
      <View
        className={`FloorNavIcon z-50 h-full flex items-center absolute top-0 right-0 px-1 ${
          scrollLeftOpen ? '' : 'opacity-0'
        }`}
        style={{
          borderTopLeftRadius: '0.5rem',
          background: 'linear-gradient(rgba(255,255,255),rgba(255,255,255),rgb(210, 210, 210))',
        }}
      >
        <IconFont name="gengduo1" size={44} />
      </View>
    </View>
  )
}

export default FloorNav
