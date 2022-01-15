import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Header extends Component {
  //亲自写了标签使用的组件都是一般组件，vue不一样，vue不区分一般组件和路由组件
  //注意，只有路由组件的props里面才有history和location和match这些属性
  //那么如何让一般组件也可以用路由组件的API的
  //用一个withRouter的函数，注意她是小写的！！


  back = () => {
    this.props.history.goBack();
  };

  forward = () => {
    this.props.history.goForward();
  };

  go = () => {
    this.props.history.go(2);
  };

  render() {
    // console.log("header",this.props);
    return (
      <div className="page-header">
        <h2>React Router Demo</h2>
        <button onClick={this.back}>回退</button>
        &nbsp;
        <button onClick={this.forward}>前进</button>
        &nbsp;
        <button onClick={this.go}>go</button>
      </div>
    );
  }
}

//暴露的事withRouter加工过的一般组件-》就给该一般组件加上了路由组件的api
export default withRouter(Header);
