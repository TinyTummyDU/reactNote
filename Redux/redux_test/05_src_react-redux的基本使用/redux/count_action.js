
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



//异步action
export const createIncrementAsyncAction = (data,time)=> {
    //返回一个函数，但是这个函数并没有被调用
    //store比较守旧，他一直要的都是plain object
    //此时我们就需要一个中间件 redux-thunk，然后store就可以帮你调用这个函数，形参直接就是dispatch可以
    //异步action中一般回调用同步action，可以发现异步action不是一定要用的，客人可以直接等5分钟再报菜名
    return (dispatch) => {
        setTimeout(() => {
            dispatch(createIncrementAction(data))
        },time)
        
    }
}
