import React, { Component } from "react";
import "./index.css";
import PubSub from "pubsub-js";
export default class List extends Component {
  state = {
    //初始化状态
    users: [], //users初始值为数组
    isFirst: true, //是否为第一次打开页面
    isLoading: false, //标识是否处于加载中
    err: "", //存储请求相关的错误信息
  };

  //list什么时候订阅消息合适呢
  componentDidMount() {
    //做一些和初始化相关的事情
    //不想用msg就占个位置也行
    // PubSub.subscribe('atguigu',(msg,data) => {
    this.token = PubSub.subscribe("atguigu", (_, stateObj) => {
        //不是覆盖哦
        this.setState(stateObj)
    });
  }

  componentWillUnmount(){
    PubSub.unsubscribe(this.token);
  }

  render() {
    const { users, isFirst, isLoading, err } = this.state;
    return (
      <div className="row">
        {
          //这里只能写jsx expression 不能写 statement
          isFirst ? (
            <h2> 欢迎使用，输入关键字，然后点击搜索 </h2>
          ) : isLoading ? (
            <h2>loading...</h2>
          ) : err ? (
            <h2 style={{ color: "red" }}>{err}</h2>
          ) : (
            users.map((userObj) => {
              return (
                <div key={userObj.id} className="card">
                  {/* target="_blank" rel="noreferrer 要一块使用*/}
                  <a href={userObj.html_url} target="_blank" rel="noreferrer">
                    {/* alt是img战士不出来的话，展示的文字 ，image,photo,picture都是不允许在alt里面用的关键字*/}
                    <img
                      alt="head_portrait"
                      src={userObj.avatar_url}
                      style={{ width: "100px" }}
                    />
                  </a>
                  <p className="card-text">{userObj.login}</p>
                </div>
              );
            })
          )
        }
      </div>
    );
  }
}
