import React,{ Component } from "react";
import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction,
} from "../../redux/count_action";


import { connect } from "react-redux";



//定义UI组件
class Count extends Component {


  increment = () => {
    const { value } = this.selectNumber;
    this.props.increment(value*1)
  };
  decrement = () => {
    const { value } = this.selectNumber;
    this.props.decrement(value*1)
  };
  incrementIfOdd = () => {
    const { value } = this.selectNumber;
    if(this.props.count %2 !== 0){
    this.props.increment(value*1)

    }
  };
  incrementAsync = () => {
    const { value } = this.selectNumber;
    this.props.incrementAsync(value*1,500)

  };

  render() {
    console.log(this.props);
    return (
      <div>
          {/* 展示初始值，想redux的store要 */}
          {/* store的第一个api，getState() */}
        <h1>当前求和为: {this.props.count}</h1>
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


export default connect(
  (state) => ({ count: state }),
  //mapDispatchToProps的精简版 （传递对象）
  {
    // 只需要你提供action，react-redux就可以帮你自动dispatch
    increment:createIncrementAction,
    decrement:createDecrementAction,
    incrementAsync:createIncrementAsyncAction
  }

)(Count);