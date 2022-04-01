import { useEffect } from "react";
import "@/utils/global.ts"
import "windi.css";
import "taro-ui/dist/style/index.scss";
import "./app.less";
import "./assets/css/global.less"

const App = (props) => {
  useEffect(() => {
    console.log(props, "12345");
  }, []);

  return props.children;
};

export default App;
