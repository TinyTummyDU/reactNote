import React, { Component } from "react";
import axios from "axios";
import PubSub from "pubsub-js";

export default class Search extends Component {
  search = () => {
    const {
      keyWordElement: { value: keyWord },
    } = this;

    //发送请求前，要求List更新状态：isFirst改为false，isLoading改为true
    // this.props.updateAppState({ isFirst: false, isLoading: true });
    PubSub.publish("atguigu", { isFirst: false, isLoading: true });

    axios.get(`api1/search/users?q=${keyWord}`).then(
      (response) => {
        //请求成功通知List更新状态
        // this.props.updateAppState({
        //   isLoading: false,
        //   users: response.data.items,
        // });
        PubSub.publish("atguigu", { users: response.data.items ,isLoading: false });
      },
      (error) => {
        //请求失败通知List更新状态
        // this.props.updateAppState({
        //   isLoading: false,
        // //  不能存error对象，这样的话直接页面就会爆（比如，页面就会直接展示404的全部内容），你要存错误对象的一个属性
        //   err:error.message
        // });
        PubSub.publish("atguigu", { err:error.message, isLoading: false});

      }
    );
  };

  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">
          搜索github用户（都是英文的，同学）
        </h3>
        <div>
          <input
            ref={(c) => {
              this.keyWordElement = c;
            }}
            type="text"
            placeholder="输入关键词点击搜索"
          />
          &nbsp;<button onClick={this.search}>搜索</button>
        </div>
      </section>
    );
  }
}
