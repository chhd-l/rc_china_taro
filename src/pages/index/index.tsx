import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import "./index.less";
import React, { useState } from "react";

// scrollTop: 0,
const list = [
  {
    id: "A",
    name: "A",
  },
  {
    id: "B",
    name: "B",
  },
  {
    id: "C",
    name: "C",
  },
  {
    id: "D",
    name: "D",
  },
];
export default () => {
  const [viewId, setViewId] = useState("A");
  const setViews = (item) => {
    console.log(item);
    let id = item.id;
    setViewId(id);
  };
  return (
    <View>
      <View style="height:90vh">cscs</View>
      <View className="toolBar sticky top-10">
        {list.map((item) => {
          return (
            <View
              className="tag inline-block"
              key={item.id}
              onClick={() => {
                setViews(item);
              }}
            >
              {[item.name]}
            </View>
          );
        })}
      </View>
      <ScrollView
        style="height:100vh"
        className="scrollview"
        scrollY
        scrollIntoView={viewId}
      >
        <View id="A" style="height:500px;background:red">
          A
        </View>
        <View id="B" style="height:500px;background:green">
          B
        </View>
        <View id="C" style="height:500px;background:red">
          C
        </View>
        <View id="D" style="height:500px;background:green">
          D
        </View>
        <View id="E" style="height:500px;background:red">
          E
        </View>
        <View id="F" style="height:500px;background:green">
          F
        </View>
        <View id="G" style="height:500px;background:red">
          G
        </View>
        <View id="H" style="height:500px;background:green">
          H
        </View>
        <View id="I" style="height:500px;background:red">
          I
        </View>
        <View id="J" style="height:500px;background:green">
          J
        </View>
      </ScrollView>
    </View>
  );
};
