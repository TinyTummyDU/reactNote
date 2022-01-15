import React, { Component } from "react";
// import axios from "axios";
import PubSub from "pubsub-js";

export default class Search extends Component {
  //注意加async的位置
  search = async () => {
    const {
      keyWordElement: { value: keyWord },
    } = this;

    //发送请求前，要求List更新状态：isFirst改为false，isLoading改为true
    // this.props.updateAppState({ isFirst: false, isLoading: true });
    PubSub.publish("atguigu", { isFirst: false, isLoading: true });

    //#region 发送网络请求--使用axios发送
    // axios.get(`api1/search/users?q=${keyWord}`).then(
    //   (response) => {
    //     //请求成功通知List更新状态
    //     // this.props.updateAppState({
    //     //   isLoading: false,
    //     //   users: response.data.items,
    //     // });
    //     PubSub.publish("atguigu", { users: response.data.items ,isLoading: false });
    //   },
    //   (error) => {
    //     //请求失败通知List更新状态
    //     // this.props.updateAppState({
    //     //   isLoading: false,
    //     // //  不能存error对象，这样的话直接页面就会爆（比如，页面就会直接展示404的全部内容），你要存错误对象的一个属性
    //     //   err:error.message
    //     // });
    //     PubSub.publish("atguigu", { err:error.message, isLoading: false});
    //   }
    // );
    //#endregion

    //#region 发送网络请求--使用fetch发送(未优化)
    // fetch(`api1/search/users2?q=${keyWord}`)
    //   .then(
    //     //fetch的关注分离设计思想
    //     //tmd,404也是联系服务器成功了，虽然路径有问题
    //     // response=>{console.log('联系服务器成功了',response.json());},
    //     //如何获得状态了，response.json会返回一个promise，联系成功，promise是成功并且保存数据，联系失败，promise是失败并且保存原因
    //     (response) => {
    //       console.log("联系服务器成功了");
    //       // console.log(response.json());
    //       return response.json();
    //     },
    //     // 整个浏览器离线，就可以失败
    //     (error) => {
    //       console.log("联系服务器失败了", error);
    //       return new Promise(); //中断promise链，pending，下面的then走但是什么都不进
    //     }
    //   )
    //   .then(
    //     (response) => {
    //       console.log("获取数据成功", response);
    //     },
    //     (error) => {
    //       console.log("获取数据失败", error);
    //     }
    //   );
    //#endregion

    //所谓的separation of concerns其实就是不一下子给你data，response.json()
    //发送网络请求--使用fetch发送(优化),异常穿透统一处理，并且使用await和async代替then
    //await只能等到成功的结果，要想处理失败，就加try catch
    try {
      const response = await fetch(`api1/search/users2?q=${keyWord}`);
      const data = await response.json();
      // console.log(data);
      PubSub.publish("atguigu", { users: data.items, isLoading: false });
    } catch (error) {
      console.log("请求出错", error);
      PubSub.publish("atguigu", { err: error.message, isLoading: false });
    }
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
