//store.js就是创建store的，专门用于暴露一个store对象，整个应用只有一个store对象

//store创建的时候，需要汇总reducers，变为一个总的reducer
import { createStore,applyMiddleware} from "redux"



//引入redux-thunk,用于支持异步action,默认暴露
import thunk from 'redux-thunk'

//引入redux-devtools-extension,compose有编译的意思
import { composeWithDevTools } from "redux-devtools-extension"

// 如果叫index.js可以写
// import allReducer from './reducers/index'
import allReducer from './reducers'

export default createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)) )




//多个reducer同时为一个store服务，多个厨师！！
// export default createStore(allReducer, applyMiddleware(thunk))