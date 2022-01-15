// 容器组件不能rcc，他是一个桥梁
// 引入左手引入右手

//引入Count的UI组件(左手)
import CountUI from "../../components/Count";

import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction,
} from "../../redux/count_action";

//引入redux，就把最核心的store引入就行(右手)
// import store from '../../redux/store'
// 右手：容器组件的  store  需要在App.jsx里面用props引入

//引入connect用于连接UI组件与redux
import { connect } from "react-redux";
//不需要store了，react-redux库已经帮你做了,人家知道mapStateToProps就要用state,mapDispatchToProps就要用dispatch
// import store from '../../redux/store'

//你没有机会写 <CountUI a="1">，我们通过函数的返回值来传递a="1"

//3.本质上，mapStateToProps用于传递状态
//1.mapStateToProps返回的是一个对象
//2.mapStateToProps函数返回的对象中的key就作为传递给UI组件的props的key,value就作为传递给UI组件props的value
//react-redux已经自动帮你从redux接收了state
function mapStateToProps(state) {
  return { count: state };
  //相当于<CountUI n={900} />
}

//3本质上，mapDispatchToProps传递操作状态的方法
//1.mapDispatchToProps函数返回的对象中的key就作为传递给UI组件的props的key,value就作为传递给UI组件props的value->操作状态的方法
//2.mapDispatchToProps返回的是一个方法
function mapDispatchToProps(dispatch) {
  return {
    // 返回多个对象！！！！！！
    increment: (number) =>
      // 通知redux指向加法，dispatch一个action
      dispatch(createIncrementAction(number)),
    decrement: (number) => dispatch(createDecrementAction(number)),
    incrementAsync: (number, time) =>
      dispatch(createIncrementAsyncAction(number, time)),
  };
}

// 连接左右手`
// connect是一个函数，返回值还是一个函数，左手连接，就是放入参数在第二个函数中
// UI组件是容器组件的子组件，那么我们直接渲染容器组件就行
// connect第一次调用的时候传入两个参数，且必须是参数
export default connect(mapStateToProps, mapDispatchToProps)(CountUI);
// const CountContainer = connect()(CountUI)

// 虽然不直观，但是其实容器组件是UI组件的父组件
// 那不直观，如何父亲给儿子传递props呢
