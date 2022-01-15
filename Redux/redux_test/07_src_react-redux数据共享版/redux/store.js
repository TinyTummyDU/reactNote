//store.js就是创建store的，专门用于暴露一个store对象，整个应用只有一个store对象


//store创建的时候，需要汇总reducers，变为一个总的reducer
import { createStore,applyMiddleware,combineReducers} from "redux"

import countReducer from './reducers/count'
import personReducer from './reducers/person'

//引入redux-thunk,用于支持异步action,默认暴露
import thunk from 'redux-thunk'

//需要存一个对象，该对象就是redux帮我们保存的总状态对象！！！
const allReducer = combineReducers({
    // 谁能出实话he，并且对he操作呢，countReducer
    he:countReducer,
    
    rens:personReducer
})

//多个reducer同时为一个store服务，多个厨师！！
export default createStore(allReducer, applyMiddleware(thunk))


