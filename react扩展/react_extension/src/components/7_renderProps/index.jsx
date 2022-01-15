import React, { Component } from "react";
import "./index.css";

export default class Parent extends Component {
  render() {
    return (
      <div className="parent">
        <h3>我是Parent组件</h3>
        <A
          render={(name) => {
            return <B name={name}></B>;
          }}
        ></A>
      </div>
    );
  }
}

class A extends Component {
  state = { name: "tom" };
  render() {
    console.log(this);
    const { name } = this.state;
    return (
      <div className="a">
        <h3>我是A组件</h3>
        {this.props.render(name)}
      </div>
    );
  }
}

class B extends Component {
  render() {
    return (
      <div className="b">
        <h3>我是B组件，收到的name是:{this.props.name}</h3>
      </div>
    );
  }
}
