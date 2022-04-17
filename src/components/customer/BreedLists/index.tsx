import { imageOptionProps, PySortProps } from "@/framework/types/common";
import { ScrollView, View, Image } from "@tarojs/components";
interface Props {
  activeId: string;
  list: PySortProps[];
  handleBreed: (option: imageOptionProps) => void;
}
const BreedLists = ({ activeId, list, handleBreed }: Props) => {
  return (
    <ScrollView
      className="scrollview"
      style={{ height: "100vh" }}
      scrollY
      scrollIntoView={activeId}
    >
      {list.map((item) => (
        <View id={`item-${item.letter}`}>
          <View className="title px-4 py-2">{item.letter.toUpperCase()}</View>
          <View>
            {item.data.map((el) => (
              <View
                className="bg-white px-6"
                onClick={() => {
                  handleBreed(el);
                }}
              >
                <View className="flex px-2 py-2 border-b border-t-0 border-l-0 border-r-0 border-solid border-gray-200 items-center">
                  <Image
                    className="w-8 rounded-full"
                    src={el.image}
                    mode="widthFix"
                  />
                  <View className="flex-1 pl-2">{el.value}</View>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};
export default BreedLists;
