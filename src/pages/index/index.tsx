import HomeNarBar from "@/components/home/HomeNavbar";
import { useEffect, useState } from "react";
import { View, Text, Button } from "@tarojs/components";
import { AtButton } from "taro-ui";
import Taro from "@tarojs/taro";
import "./index.less";

const Index = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    setName("zyq");
  }, []);
  return (
    <View className="index">
      <HomeNarBar />
      <Text>{`Hello world!${name}`}</Text>
      <View className="text-26">text-26</View>
      <View className="text-28">text-28</View>
      <View className="text-30">text-30</View>
      <View className="text-32">text-32</View>
      <View className="text-34">text-34</View>
      <View className="text-36">text-36</View>
      <View className="text-38">text-38</View>
      <View className="text-40">text-40</View>
      <View className="text-42">text-42</View>
      <View className="text-48">text-48</View>
      <View className="text-xs">text-xs</View>
      <View className="text-sm">text-sm</View>
      <View className="text-base">text-base</View>
      <Button
        onClick={() => {
          Taro.navigateTo({
            url: "/pages/productDetail/index",
          });
        }}
      >
        go
      </Button>
      <Button className="w-10 flex flex-row" openType="contact">
        contact
      </Button>
      <AtButton
        type="primary"
        onClick={() => {
          Taro.navigateTo({
            url: "/pages/productDetail/index",
          });
        }}
      >
        contact
      </AtButton>
    </View>
  );
};

export default Index;
