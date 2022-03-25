/**
 * 通知公告
 */
import { useState } from "react";
import { View, Text } from "@tarojs/components";

const Announcement = (props) => {
  const [display, setDisplay] = useState("flex");
  return (
    <View
      style={{ display: display }}
      className="bg-gray-300 flex flex-row justify-around items-center p-2"
    >
      <View className="at-icon at-icon-volume-plus" />
      <View>
        <Text>{props.title}</Text>
      </View>
      <View
        onClick={() => {
          setDisplay("hidden");
        }}
        className="at-icon at-icon-close justify-self-end"
      />
    </View>
  );
};
export default Announcement;
