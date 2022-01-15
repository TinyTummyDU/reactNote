/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import List from "./components/List";
import Search from "./components/Search";

export default class App extends Component {


 //状态在哪里，操作的方法就在哪，现在我们使用消息的发布与订阅后，实现了兄弟之间通信，那我们的App就成了真正意义上的壳

  render() {
    return (
      <div className="container">
        <Search/>
        <List/>
      </div>
    );
  }
}
