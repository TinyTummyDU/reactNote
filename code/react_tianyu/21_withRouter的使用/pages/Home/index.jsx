import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Message from "./Message";
import News from "./News";
import MyNavLink from "../../components/MyNavLink";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h3>我是Home的内容</h3>
        <ul className="nav nav-tabs">
          <li>
              {/* 你点了news，然后路径变为了/home/news，然后模糊匹配home，所以home组件没有丢。你可以看到 */}
              {/* home组件一挂载，进行下面的第二次路由注册*/}
              {/* 因此哪怕你注册三级路由，前两级路由也得规规矩矩的写 */}
              {/* 这里也解释了严格匹配的的问题，如果第一级路由开启了严格匹配，那么你点击news的时候，home组件就丢了 （每次匹配都是从最开始的第一级路由开始匹配） */}
            <MyNavLink to="/home/news">News</MyNavLink>
          </li>
          <li>
            {/* 模糊匹配home，路径里还残留了/message，这时候再第二次注册路由 */}
            <MyNavLink to="/home/message">Message</MyNavLink>
          </li>
        </ul>

        {/* 注册路由 */}
        {/* App.jsx里面的路由一定是最先注册的 */}

        <Switch>
          <Route path="/home/news" component={News}></Route>
          <Route path="/home/message" component={Message}></Route>
          {/* home组件一挂载，这里就执行，因为当前路径是home，所以和上面两行都无法模糊匹配，那么就会走Redirect实现默认勾选News */}
          <Redirect to="/home/news"/>
        </Switch>

      </div>
    );
  }
}
