/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import Home from "./components/Home";
import About from "./components/About";

//人家这个库给你很多组件，所以他用的是分别暴露
import { Link, Route, Routes } from "react-router-dom";

export default class App extends Component {
  //状态在哪里，操作的方法就在哪，现在我们使用消息的发布与订阅后，实现了兄弟之间通信，那我们的App就成了真正意义上的壳

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <div className="page-header">
              <h2>React Router Demo</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              {/* 原生html中，靠<a>跳转不同的页面 */}
              {/* <a className="list-group-item" href="./about.html">
                About
              </a>
              <a className="list-group-item active" href="./home.html">
                Home
              </a> */}

              {/* 在React中靠路由链接实现切换组件-编写路由链接 */}

              {/* React中靠路由链接实现切换组件, Link必须包裹在Router里面，有了路由器才能使用路由 */}
              {/* 路由器分为两种（你需要告诉人家你要哪种路由器）：BrowerRouter和HashRouter，对应了history的两种模式 */}
              {/* to 后面尽量别写大写 */}
              <Link className="list-group-item" to="/about">
                About
              </Link>
              <Link className="list-group-item" to="/home">
                Home
              </Link>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/* 整个页面只能用一个路由器处理，即路由链接和注册路由只能由一个Router标签去包 */}
                {/* 怎么包呢，我们直接在index.js里面包，因为我们所有的组件都是App的自组件 */}

                {/* 注册路由,检测浏览器path的变化，展示组件*/}
                {/* P77. 路由基础。如果使用的react-router-dom版本是v6，则需要用Routes把Route包裹起来。同时Route标签中的conponent要换成element，且引用的组件名称要使用尖括号。 */}
                <Routes>
                  <Route path="/about" element={<About />}></Route>
                  <Route path="/home" element={<Home />}></Route>
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
