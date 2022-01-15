import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class MyNavLink extends Component {
  render() {
    // const { title } = this.props;
    // console.log(this.props);
    return (
      // {...this.props}让你省心，不用一个个接收
      //   <NavLink activeClassName="atguigu" className="list-group-item" {...this.props}>
      //     {title}
      //   </NavLink>

      //那么title怎么办呢
      //在使用MyNavLink的地方不要用自闭和标签
      // <MyNavLink to="/home" title='Home'/> -> <MyNavLink to="/home">Home</MyNavLink>
      // 但是我们没有接收过标签体内容啊 --> 标签体内容也是一种特殊属性，也可以通过this.props收集
      // {to: '/home', children: 'Home'}

      <NavLink
        activeClassName="atguigu"
        className="list-group-item"
        {...this.props}
      />
      /* {this.props.children} 可以不这样写，直接配在标签属性里面 */
      /* </NavLink> */
    );
  }
}
