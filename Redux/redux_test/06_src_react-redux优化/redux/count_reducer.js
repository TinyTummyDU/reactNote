// store是很重要，但是你可以借助 import { createStore } from "redux"
// 但是reducer是你自己写的，也重要

// 1.该文件适用于创建一个为Count组件服务的reducer，其本质就是一个函数
// 2.reducer函数会接到两个函数，分别为：之前的状态previousState和动作对象action
import { INCREMENT,DECREMENT } from "./constant"


const initState = 0;
// 没有传preState或者是undefined的时候，形参默认值就可以起作用了
export default function countReducer(preState = initState, action) {
    console.log(preState,action);
  // 用形参默认值更好
  // if(preState === undefined) preState = 0;

  const { type, data } = action;
  // if(type == "increment")
  // 一般不写if，写switch case

  //根据type决定如何加工数据
  switch (type) {
    case INCREMENT:
      return preState + data;
    //break; return了，break就没用了
    case DECREMENT:
      return preState - data;
    //奇数加和异步加，我们不用管，我们只写最基础的就行。 这个意思就是 纯函数！！！！！！
    default:
      //不说加还是减，就是初始化的时候，是整个一加载，store就会告诉reducer你给我初始化一下
      // preState是undefined
      return preState;
  }
}
