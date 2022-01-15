import axios from "axios";
import React, { Component } from "react";

export default class App extends Component {
  //我们下面直接要在APP里面写东西
  //主要学axios，我们想讲 脚手架 如何配置代理

  getStudentData = () => {
	  //如果3000没有这个资源，就会走api1这个前缀配置的代理
	  //不写api1的话干脆都不会走代理，因为你没有配，然后本地也没有这个资源，那就是404
    axios.get("http://localhost:3000/api1/students").then(
      (response) => {
        console.log("成功了", response.data);
      },
      (error) => {
        console.log("失败了", error);
      }
    );
  };

  getCarData = () => {
    axios.get("http://localhost:3000/api2/cars").then(
      (response) => {
        console.log("成功了", response.data);
      },
      (error) => {
        console.log("失败了", error);
      }
    );
  };

  render() {
    return (
      <div>
        <button onClick={this.getStudentData}>点我获得学生数据</button>
        <button onClick={this.getCarData}>点我获得汽车数据</button>
      </div>
    );
  }
}
