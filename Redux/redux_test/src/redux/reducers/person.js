
//对人的state初始化，且对state加工


import { ADD_PERSON } from "../constant";

//出实话人的列表
const initState = [{id:'001',name:'tom',age:18}]

export default function personReducer(preState=initState,action){

    const {type,data} = action
    switch (type) {
        case ADD_PERSON:
            // 也可以用unshift吗？不行
            // preState.unshift(data)
            // return preState，redux发现preState的引用地址没有变化，就不给你刷新页面
            // 展开运算符
            return [data,...preState]
        default:
            return preState
    }

}