import Announcement from "@/components/common/Announcement";
import { View, Text } from "@tarojs/components";
import "./index.less";

const Account = () => {
  return (
    <View className="index">
      <Announcement title="添加社群，畅享更多专属福利！" />
      <Text>my account</Text>
    </View>
  );
};

export default Account;
