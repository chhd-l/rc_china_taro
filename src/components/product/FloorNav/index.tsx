import { floorList } from "@/lib/product";
import { ScrollView, View, Text } from "@tarojs/components";
import { useState } from "react";
interface FloorNavProps {
  setFloorId: (id: string) => void;
}
const FloorNav = ({ setFloorId }: FloorNavProps) => {
  const [floorActiveId, setFloorActiveId] = useState<string>("activity");
  const handleNavClick = ({ id }) => {
    console.info("idid", id);
    setFloorId(id);
    setFloorActiveId(id);
  };
  return (
    <ScrollView className="whitespace-nowrap" scrollX>
      <View className="sticky top-0 text-xs">
        {floorList.map((floor) => (
          <Text
            onClick={() => {
              handleNavClick(floor);
            }}
            className={`inline-block p-2 ${
              floorActiveId == floor.id
                ? "bg-white font-medium text-red-600"
                : "bg-red-600 text-white"
            }`}
          >
            {floor.label}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

export default FloorNav;
