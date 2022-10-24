// import { imageOptionProps, PySortProps } from "@/framework/types/common";
import { BreedListItemProps, PySortProps } from '@/pages/packageB/breedList'
import { ScrollView, View, Image } from '@tarojs/components'

interface Props {
  activeId: string
  list: PySortProps[]
  handleBreed: (option: BreedListItemProps) => void
}
const BreedLists = ({ activeId, list, handleBreed }: Props) => {
  console.info('list', list)
  return (
    <ScrollView className="scrollview" style={{ height: '100vh' }} scrollY scrollIntoView={activeId}>
      {list
        ?.filter((el) => el?.data?.length)
        ?.map((item) => (
          <View id={`item-${item.letter}`}>
            <View className="title px-4 py-2">{item.letter?.toUpperCase()}</View>
            <View>
              {item?.data?.map((el) => (
                <View
                  className="bg-white px-6"
                  onClick={() => {
                    handleBreed(el)
                  }}
                >
                  <View className="flex px-2 py-3 border-b border-t-0 border-l-0 border-r-0 border-solid border-gray-200 items-center">
                    {/* <View className="w-full max-"></View> */}
                    {/* <Image lazyLoad className="w-10 rounded-full h-10" src={el.image} mode="widthFix" /> */}
                    <Image lazyLoad className="w-0 rounded-full h-0" src={el.image} mode="widthFix" />
                    <View className="flex-1 pl-2 text-xs">{el.name}</View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
    </ScrollView>
  )
}
export default BreedLists
