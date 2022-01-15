import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import Detail from "./Detail";

export default class Message extends Component {
  state = {
    messageArr: [
      { id: "01", title: "消息1" },
      { id: "02", title: "消息2" },
      { id: "03", title: "消息3" },
    ],
  };
  render() {
    const { messageArr } = this.state;
    return (
      <div>
        <ul>
          {messageArr.map((msgObj) => {
            return (

              
              <li key={msgObj.id}>
                {/* 不需要高亮，就用Link就行 */}
                {/* 向路由组件传递params参数，像极了ajax请求里的param参数*/}
                {/* 模版字符串是js，要用的话就要{} */}
                <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link> &nbsp; &nbsp;
              </li>
            );
          })}
        </ul>
        <hr />

        {/* 注册路由 */}
        {/* 声明接收params参数 */}
          <Route path="/home/message/detail/:id/:title" component={Detail}></Route>


      </div>
    );
  }
}
