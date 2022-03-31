import Taro from "@tarojs/taro";
import Announcement from "@/components/common/Announcement";
import defaultIcon from "@/assets/icons/icon-home.png";
import { View, Text, Image } from "@tarojs/components";
import { AtAvatar, AtButton } from "taro-ui";
import "./index.less";


const Account = () => {
  const orderTypeList = [
    { label: "待付款", icon: defaultIcon, url: "" },
    { label: "待发货", icon: defaultIcon, url: "" },
    { label: "待收货", icon: defaultIcon, url: "" },
    { label: "退货/退款", icon: defaultIcon, url: "" },
    { label: "我的卡券", icon: defaultIcon, url: "" },
  ];
  return (
    <View className="index">
      <Announcement title="添加社群，畅享更多专属福利！" />
      <View className="p-2">
        {/*个人信息和个人管理*/}
        <View className="flex flex-row justify-between px-2 pb-4 items-center">
          <View className="flex flex-row items-center">
            <AtAvatar circle size="large" openData={{type: 'userAvatarUrl'}}/>
            <View className="flex-col ml-4">
              <View>
                <Text>左琴</Text>
                <Text className="text-xs ml-4">新手铲屎官</Text>
              </View>
              <View className="text-xs mt-2">当前积分：50</View>
            </View>
          </View>
          <View className="m-0">
            <AtButton className="text-xs" size="small" onClick={()=>{
              Taro.navigateTo({
                url: '/pages/addressManage/index'
              })
            }}>
              地址管理+
            </AtButton>
          </View>

        </View>
        {/*我的订单*/}
        <View className="p-2 bg-gray-50">
          <View className="flex justify-between pb-2 border-b-2 border-l-0 border-r-0 border-t-0 border-solid border-gray-300">
            <View>我的订单</View>
            <View className="text-xs">查看全部订单&gt;</View>
          </View>
          <View className="flex flex-row justify-around items-center mt-2">
            {orderTypeList.map((item) => (
              <View className="flex flex-col items-center">
                <Image className="w-6 h-6" src={item.icon} />
                <Text className="text-xs">{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
        {/*官方福利群*/}
        <View></View>
        {/*打卡冷知识*/}
        <View></View>
        {/*微信关注*/}
        <View></View>
        {/*我的宠物*/}
        <View></View>
      </View>
    </View>
  );
};

export default Account;
