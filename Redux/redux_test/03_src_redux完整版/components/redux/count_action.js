
//count_action_creator
//每个组件都有一个
//该文件专门为Count组件生成action对象

import { INCREMENT,DECREMENT } from "./constant"


// function createIncrementAction(data){
//     // data key和value同名就可以这样写
//     return {type:'increment',data}
// }

// const createIncrementAction = data => {return {type:'increment',data}}
export const createIncrementAction = data => ({type:INCREMENT,data})


// function createDecrementAction(data){
//     return {type:'decrement',data}
// }

export const createDecrementAction = data => ({type:DECREMENT,data})



