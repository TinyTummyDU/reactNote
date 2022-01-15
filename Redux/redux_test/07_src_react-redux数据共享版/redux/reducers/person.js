
//对人的state初始化，且对state加工


import { ADD_PERSON } from "../constant";

//出实话人的列表
const initState = [{id:'001',name:'tom',age:18}]

export default function personReducer(preState=initState,action){

    const {type,data} = action
    switch (type) {
        case ADD_PERSON:
            // 也可以用unshift
            return [data,...preState]
        default:
            return preState
    }

}