//引入react核心库
import React from "react";
//引入ReactDOM
import ReactDOM from "react-dom";

//第三方的库往上靠
import { BrowserRouter as Router } from "react-router-dom";

//引入App
import App from "./App";

/* 整个页面只能用一个路由器处理，即路由链接和注册路由只能由一个Router标签去包 */
/* 怎么包呢，我们直接在index.js里面包，因为我们所有的组件都是App的自组件 */
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
