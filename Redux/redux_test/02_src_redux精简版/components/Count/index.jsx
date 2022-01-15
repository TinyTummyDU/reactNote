import React, { Component } from "react";
//用于获取redux中帮你保存的状态
import store from "../redux/store";



export default class Count extends Component {
  //求和的和已经给redux管理了，就不用放在自己的state里面
  //state = { count: 0 }; 不给redux管理的属性再写在state里面，需要共享的再拿出去

  //如果有100个组件要共享redux里state，那你就要100个组件在componentDidMount钩子里面subscribe，太麻烦
  // componentDidMount(){
  //   // 检测redux中状态的变化，只要变化，就调用render

  //   //store的第三个api subscribe订阅，只要redux里面任何一个状态的改变
  //   store.subscribe(() => {
  //     // render不可以自己调用，这样不起作用
  //     // this.render()

  //     //我要更新自己的state，但是我什么也不更新，晃了react一下，react帮你调render
  //     //为什么不在increment方法里面写，因为redux的状态可能在别的地方也变化
  //     this.setState({})
  //   })
  // }

  increment = () => {
    const { value } = this.selectNumber;
    // 通知redux给我加value
    // 第二个api，dispatch方法也在store上
    store.dispatch({type:'increment',data:value*1})
    // 为什么不行呢，因为你Count组件实例state没有变了，Count组件没有再render了
    // this.setState({})
  };
  decrement = () => {
    const { value } = this.selectNumber;
    // 通知redux给我加value
    // 第二个api，dispatch方法也在store上
    store.dispatch({type:'decrement',data:value*1})
  };
  incrementIfOdd = () => {
    const { value } = this.selectNumber;
    const  count  = store.getState();
    if (count % 2 !== 0) {
      store.dispatch({type:'increment',data:value*1})
    }
  };
  incrementAsync = () => {
    const { value } = this.selectNumber;
    setTimeout(() => {
      store.dispatch({type:'increment',data:value*1})
    }, 500);
  };

  render() {
    return (
      <div>
          {/* 展示初始值，想redux的store要 */}
          {/* store的第一个api，getState() */}
        <h1>当前求和为: {store.getState()}</h1>
        <select ref={(c) => (this.selectNumber = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>{" "}
        &nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
        <button onClick={this.incrementAsync}>异步加</button>&nbsp;
      </div>
    );
  }
}
