import React, { Component } from "react";
import "./index.css";
import Son from "./son";

export const MyContext = React.createContext();

export default class Parent extends Component {
  state = { username: "tom", age: 18 };
  render() {
    const { username, age } = this.state;

    return (
      <div className="parent">
        <h3>我是A组件</h3>
        <h4>我的用户名是{username}</h4>

        {/* 包裹以后，谁想要value，谁就要声明，即举手 */}
        {/* 属性必须交value */}
        <MyContext.Provider value={{ username, age }}>
          <Son />
        </MyContext.Provider>
      </div>
    );
  }
}
