import React, { Component } from "react";
import axios from "axios";
export default class Search extends Component {
  search = () => {
    //获取用户的输入

    //常规解构复制
    // const {value} = this.keyWordElement;
    // console.log(value);

    //连续解构赋值，这种写法就只定义了一个value变量，如果value还是一个对象，还可以继续写下去
    // const {a:{b:{c}}} = abj
    //连续解构赋值还可以再改名，我不想用c这个名字，想用data这个名字
    // const {a:{b:{c:data}}} = abj

    const {
      keyWordElement: { value: keyWord },
    } = this;

    //发送请求前，要求app更新状态：isFirst改为false，isLoading改为true
    this.props.updateAppState({ isFirst: false, isLoading: true });

    //发送网络请求
    //短时间内多次访问，可能会401，拒绝请求
    //解决方法：通过一个中间件5000，但是同理多次请求也会驳回
    //我们的5000还有第二个接口，在github不给数据的时候，我们通过这个接口得到假数据

    //配了setupProxy以后就可以站在3000给3000发
    //api1必须紧随端口号，它是前缀
    // axios.get(`http://localhost:3000/api1/search/users?q=${keyWord}`).then(
    //如果你站在3000给3000发，前面的其实可以省略
    axios.get(`api1/search/users?q=${keyWord}`).then(
      (response) => {
          //请求成功通知App更新状态
        this.props.updateAppState({
          isLoading: false,
          users: response.data.items,
        });
      },
      (error) => {
          //请求失败通知App更新状态
        this.props.updateAppState({
          isLoading: false,
        //  不能存error对象，这样的话直接页面就会爆（比如，页面就会直接展示404的全部内容），你要存错误对象的一个属性
          err:error.message
        });
      }
    );
  };

  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">搜索github用户（都是英文的，同学）</h3>
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
