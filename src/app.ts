import { useEffect } from "react";
import "taro-ui/dist/style/index.scss";
import "./app.less";
import "windi.css";

const App = (props) => {
  useEffect(() => {
    console.log(props, "12345");
  }, []);

  return props.children;
};

export default App;
