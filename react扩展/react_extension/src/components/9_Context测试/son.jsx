import React from "react";
import { MyContext } from "./parent";

export default function Son() {
    return (
      <div className="son">
        <h3>我是C组件</h3>
        <h4>
          我从A接收到用户名是
          <MyContext.Consumer>
            {
              //value就是provider传下来的
              (value) => `${value.username},年龄是${value.age}`
            }
          </MyContext.Consumer>
        </h4>
      </div>
    );
  }
  