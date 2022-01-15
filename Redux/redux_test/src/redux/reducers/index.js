// 该文件用于汇总所有reducer为一个总的reducer
import {combineReducers} from "redux"



import countReducer from './count'
// 为Person组件服务的reducer
import personReducer from './person'


//需要存一个对象，该对象就是redux帮我们保存的总状态对象！！！
export default combineReducers({
    // 谁能初始化count呢，并且对count操作呢，countReducer
    count:countReducer,
    persons:personReducer
})

//多个reducer同时为一个store服务，多个厨师！！
// export default createStore(allReducer, applyMiddleware(thunk))



/*
触发对象简写方式，叫count和person就行

import count from './count'
// 为Person组件服务的reducer
import person from './person'


//需要存一个对象，该对象就是redux帮我们保存的总状态对象！！！
export default combineReducers({
    // 谁能初始化count呢，并且对count操作呢，countReducer
    count,
    person
})
*/
