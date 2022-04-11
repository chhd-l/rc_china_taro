import { FloorListProps, FloorType } from "@/framework/types/products";

export const floorList: FloorListProps[] = [
  {
    title: "活动专区",
    label: "活动专区",
    subTitle: "订阅商城  社群福利",
    icon: "",
    type: FloorType.Activity,
    active: true,
    id: "activity",
  },
  {
    title: "明星猫粮",
    label: "明星猫粮",
    subTitle: "省薪囤货  爆款猫粮",
    icon: "",
    type: FloorType.Stars,
    active: false,
    id: "catStar",
  },
  {
    title: "全价猫干粮",
    label: "猫干粮",
    subTitle: "让不同年龄、品种、健康问题的猫咪定制专属营养",
    icon: "",
    type: FloorType.Dry,
    active: false,
    id: "catDryFood",
  },
  {
    title: "全价主食级猫湿粮",
    label: "猫湿粮",
    subTitle: "宠爱升级，享受肉食乐趣同时满足每日所需营养",
    icon: "",
    type: FloorType.Wet,
    active: false,
    id: "catWetFood",
  },
  {
    title: "明星犬粮",
    label: "明星犬粮",
    subTitle: "省薪囤货  爆款犬粮",
    icon: "",
    type: FloorType.Stars,
    active: false,
    id: "dogStar",
  },
  {
    title: "犬干粮",
    label: "犬干粮",
    subTitle: "让不同年龄、品种、健康问题的狗狗都有自己的精准营养",
    icon: "",
    type: FloorType.Dry,
    active: false,
    id: "odgDryFood",
  },
  {
    title: "犬湿粮",
    label: "犬湿粮",
    subTitle: "宠爱升级，享受肉食乐趣同时满足每日所需营养",
    icon: "",
    type: FloorType.Wet,
    active: false,
    id: "dogWetFood",
  },
];

export const editPetButton = [
  {
    text: "编辑",
    style: {
      backgroundColor: "rgb(254, 202, 202)",
    },
  },
  {
    text: "删除",
    style: {
      backgroundColor: "rgb(239, 68, 68)",
    },
  },
];
