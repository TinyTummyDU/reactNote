//store.js就是创建store的，专门用于暴露一个store对象，整个应用只有一个store对象


//有一个方法createStore，专门用于创建redux中最核心的
import { createStore,applyMiddleware} from "redux"

//引入为store服务的reducer，饭店老板必须有厨子
//当然你也可以分别暴露，但是没有必要，什么暴露就要对应的写法
//默认暴露，就暴露一个东西
import countReducer from './count_reducer'


//引入redux-thunk,用于支持异步action,默认暴露
import thunk from 'redux-thunk'

export default createStore(countReducer, applyMiddleware(thunk))


