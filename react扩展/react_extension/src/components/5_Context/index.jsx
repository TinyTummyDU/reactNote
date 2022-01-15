import React, { Component } from "react";
import "./index.css";

//为什么大写，因为你如果后续使用，<MyContext.Provider>，组件标签要大写
//或者 const {provider} = MyContext
//创建Context对象
const MyContext = React.createContext();

export default class A extends Component {
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
          <B />
        </MyContext.Provider>
      </div>
    );
  }
}

class B extends Component {
  render() {
    return (
      <div className="child">
        <h3>我是B组件</h3>
        <C />
      </div>
    );
  }
}

// class C extends Component {
//     //声明
//     static contextType = MyContext
//     render() {
//         return (
//             <div className="grand">
//             <h3>我是C组件</h3>
//             <h4>我从A接收到用户名是{this.context.username}</h4>
//             <h4>年龄{this.context.age}</h4>
//             </div>
//         )
//     }
// }

//如果C是函数式组件
//没有static，没有this，那么我们就用第二种使用Context的方式
function C() {
  return (
    <div className="grand">
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
