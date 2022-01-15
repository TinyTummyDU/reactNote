/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import Home from "./pages/Home"; //Home是路由组件
import About from "./pages/About"; //About是路由组件
import Header from "./components/Header"; //Header是路由组件
import MyNavLink from "./components/MyNavLink";
import Test from "./pages/Test";

//人家这个库给你很多组件，所以他用的是分别暴露
import { Route, Switch } from "react-router-dom";

export default class App extends Component {
  //状态在哪里，操作的方法就在哪，现在我们使用消息的发布与订阅后，实现了兄弟之间通信，那我们的App就成了真正意义上的壳

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <div className="page-header">
              <Header a={1} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              {/* 重复性比较多，因为你的导航栏item都差不多，那我们就封装一个NavLink->MyNavLink */}
              <MyNavLink to="/atguigu/about">About</MyNavLink>
              <MyNavLink to="/atguigu/home">Home</MyNavLink>

              {/* 那么MyNavLink就属于一般组件了 */}

              {/* <NavLink
                activeClassName="atguigu"
                className="list-group-item"
                to="/about"
              >
                About
              </NavLink>
              <NavLink
                activeClassName="atguigu"
                className="list-group-item"
                to="/home"
              >
                Home
              </NavLink> */}
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                <Switch>
                  <Route path="/atguigu/about" component={About}></Route>
                  <Route path="/atguigu/home" component={Home}></Route>
                  <Route path="/atguigu/home" component={Test}></Route>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
