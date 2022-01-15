









# 1_Redux理解

Redux并不是在React的非用不可，但是涉及复杂交互的时候，别人用了，你就看不懂了。

## 学习文档

1. 英文文档: https://redux.js.org/
2. 中文文档: http://www.redux.org.cn/
3. Github: https://github.com/reactjs/redux



## redux 是什么

Redux和React就喝JS和JAVA一样，没卵关系。

1. redux 是一个专门用于做**状态管理**的 JS 库(**不是 react 插件库**)。

2. 它可以用在 react, angular, vue 等项目中, 但基本与 react 配合使用。

   vue里面人家vuex可以状态管理，基本不用redux。

3. 作用: 集中式管理 react 应用中多个组件**共享**的状态。

   

## 什么情况下要用Redux

1. 某个组件的状态，需要让其他组件可以随时拿到(共享)。
2.  一个组件需要改变另一个组件的状态(通信)。
3. 总体原则:能不用就不用, 如果不用比较吃力才考虑使用。



## redux工作流程



![redux原理图](/Users/dyq/Desktop/Redux/pics/redux原理图.png)



## redux状态共享示例

Redux是独立存在的

D把a和b交给redux。D自己就不保存a和b了，c不需要共享就不给redux用。

a和b是人人都要用的，redux然后说A,B,C,E,F，你们谁要用就问我来拿。（集中式状态管理，共享）![redux状态共享示例](/Users/dyq/Desktop/Redux/pics/redux状态共享示例.png)







# 2_redux的三个核心概念

## 看图理解

**看图理解三个概念**，这个图可以通过“饭店”例子来看。

消费者，服务员，老板，后厨。



![redux原理图](/Users/dyq/Desktop/react/Redux/pics/redux原理图.png)

Action Creators是帮你包装action的，其实你可以不借助他，你自己写action对象，自己dispatch。



action动作对象就是一个普通的对象，有两个属性。

生活中很多事情都可以用action描述！

dispatch分发是很必要的，传递action！！



Store是C位的人！！！仓库，调度者。自己本身是不干活的！Store只有一个！

store把previousState和action交给干活的Reducers，然后Reducers返回给Store以newState。



previousState首先要有才可以，Reducer也可以初始化状态，也可以加工状态。

你要有过女朋友，才能说前任！

怎么初始化状态呢，------>Store给Reducers传的是 (undefined. action)

你前任怎么样啊，我没有前任，前任是undifined





## 核心概念

### action

1. 动作的对象

2. 包含 2 个属性

   Action Creator给你初始化状态的时候。是通过@@init@@给你初始化type，data可以没有。

   type:标识属性, 值为字符串, 唯一, 必要属性 （初始化的时候是@@init@@）

   data:数据属性, 值类型任意, 可选属性 （可以不写）

3. 例子:{ type: 'ADD_STUDENT',data:{name: 'tom',age:18} }



### reducer

1. 用于初始化状态、加工状态。

2. 加工时，根据旧的 state 和 action，产生新的 state 的纯函数。

   纯函数



### store

1. 将 state、action、reducer 联系在一起的对象 

2. 如何得到此对象?

   \1)  import {createStore} from 'redux'

   \2)  import reducer from './reducers'

   \3)  const store = createStore(reducer)

3. 此对象的功能?

   \1)  getState(): 得到 state

   \2)  dispatch(action): 分发 action, 触发 reducer 调用, 产生新的 state

   \3)  subscribe(listener): 注册监听, 当产生了新的 state 时, 自动调用







# 3_redux精简版

精简版是不连Action Creators的

## 安装

```
$yarn add redux
```

## redux要单独成一个文件夹



![redux要单独一个文件夹](/Users/dyq/Desktop/react/Redux/pics/redux要单独一个文件夹.png)

### store.js

```js
//store.js就是创建store的，专门用于暴露一个store对象，整个应用只有一个store对象


//有一个方法createStore，专门用于创建redux中最核心的
import { createStore } from "redux"

//引入为store服务的reducer，饭店老板必须有厨子
//当然你也可以分别暴露，但是没有必要，什么暴露就要对应的写法
//默认暴露，就暴露一个东西
import countReducer from './count_reducer'

export default createStore(countReducer)




// const store = {}
// //分别暴露，统一暴露
// //默认暴露，就一个？
// export default store
```



### count_reducer.js

```js
// store是很重要，但是你可以借助 import { createStore } from "redux"
// 但是reducer是你自己写的，也重要

// 1.该文件适用于创建一个为Count组件服务的reducer，其本质就是一个函数
// 2.reducer函数会接到两个函数，分别为：之前的状态previousState和动作对象action

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
    case "increment":
      return preState + data;
    //break; return了，break就没用了
    case "decrement":
      return preState - data;
    //奇数加和异步加，我们不用管，我们只写最基础的就行。 这个意思就是 纯函数！！！！！！
    default:
      //不说加还是减，就是初始化的时候，是整个一加载，store就会告诉reducer你给我初始化一下
      // preState是undefined
      return preState;
  }
}

```



## 第一次初始化

preState是undefined

action是随机的一个对象，type是随机字符，防止和你本身的type逻辑匹配，data属性没有

{type: '@@redux/INITf.b.8.q.x.s'}

1. type: "@@redux/INITf.b.8.q.x.s"

2. [[Prototype]]: Object





## store对象三个api的使用

Count.jsx

```jsx
import React, { Component } from "react";
//用于获取redux中帮你保存的状态
import store from "../redux/store";



export default class Count extends Component {
  //求和的和已经给redux管理了，就不用放在自己的state里面
  //state = { count: 0 }; 不给redux管理的属性再写在state里面，需要共享的再拿出去

  //如果有100个组件要共享redux里state，那你就要100个组件在componentDidMount钩子里面subscribe，太麻烦
  // componentDidMount(){
  //   // 检测redux中状态的变化，只要变化，就调用render

  //   //store的第三个api subscribe订阅，只要redux里面任何一个状态的改变
  //   store.subscribe(() => {
  //     // render不可以自己调用，这样不起作用
  //     // this.render()
  //     //我要更新自己的state，但是我什么也不更新，晃了react一下，react帮你调render
  //     //为什么不在increment方法里面写，因为redux的状态可能在别的地方也变化
  //     this.setState({})
  //   })
  // }

  increment = () => {
    const { value } = this.selectNumber;
    // 通知redux给我加value
    // 第二个api，dispatch方法也在store上
    store.dispatch({type:'increment',data:value*1})
    // 为什么不行呢，因为你Count组件实例state没有变了，Count组件没有再render了
    // this.setState({})
  };
  decrement = () => {
    const { value } = this.selectNumber;
    // 通知redux给我加value
    // 第二个api，dispatch方法也在store上
    store.dispatch({type:'decrement',data:value*1})
  };
  incrementIfOdd = () => {
    const { value } = this.selectNumber;
    const  count  = store.getState();
    if (count % 2 !== 0) {
      store.dispatch({type:'increment',data:value*1})
    }
  };
  incrementAsync = () => {
    const { value } = this.selectNumber;
    setTimeout(() => {
      store.dispatch({type:'increment',data:value*1})
    }, 500);
  };

  render() {
    return (
      <div>
          {/* 展示初始值，想redux的store要 */}
          {/* store的第一个api，getState() */}
        <h1>当前求和为: {store.getState()}</h1>
        <select ref={(c) => (this.selectNumber = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>{" "}
        &nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
        <button onClick={this.incrementAsync}>异步加</button>&nbsp;
      </div>
    );
  }
}

```





## store.subscribe的小技巧



如果有100个组件要共享redux里state

那你就要100个组件在componentDidMount钩子里面subscribe，太麻烦了

```jsx
componentDidMount(){
  // 检测redux中状态的变化，只要变化，就调用render
  //store的第三个api subscribe订阅，只要redux里面任何一个状态的改变
  store.subscribe(() => {
  // render不可以自己调用，这样不起作用
	// this.render()

   //我要更新自己的state，但是我什么也不更新，晃了react一下，react帮你调render
   //为什么不在increment方法里面写，因为redux的状态可能在别的地方也变化
   this.setState({})

  })
```

一劳永逸的办法

在index.js里写

```jsx
import React from "react";
import ReactDOM from "react-dom";
import store from "./components/redux/store";


import App from "./App"


ReactDOM.render(<App/>,document.getElementById("root"))

//效率低吗？
//App组件直接重写render，子组件也重新render
//但是又diff算法啊，没有动的子组件就不会被重新render
store.subscribe(() => {
    ReactDOM.render(<App/>,document.getElementById("root"))
})
```



## redux求和案例精简版总结

1.求和案例_redux精简版

​        (1).去除Count组件自身的状态

​        (2).src下建立:

​                        -redux

​                            -store.js

​                            -count_reducer.js



​        (3).store.js：

​                    1).引入redux中的createStore函数，创建一个store

​                    2).createStore调用时要传入一个为其服务的reducer

​                    3).记得暴露store对象



​        (4).count_reducer.js：

​                    1).reducer的本质是一个函数，接收：preState,action，返回加工后的状态

​                    2).reducer有两个作用：初始化状态，加工状态

​                    3).reducer被第一次调用时，是store自动触发的，

​                                    传递的preState是undefined,

​                                    传递的action是:{type:'@@REDUX/INIT_a.2.b.4}



​        (5).在index.js中监测store中状态的改变，一旦发生改变重新渲染 <App/>

​                备注：redux只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写。







4_redux完整版

## 新增文件：

1. count_action.js 专门用于创建action对象
2. constant.js 放置容易写错的type值

count_action.js

```js

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




```





constant.js

```js
// 该模块是用于定义action对象中type类型中的常量值
// 企业中常用，防止写错
// 便于管理的同时防止程序员单词写错


export const INCREMENT = 'increment'
export const DECREMENT = 'decrement'
```







# 4_redux异步action



![redux原理图](/Users/dyq/Desktop/react/Redux/pics/redux原理图.png)

## 同步action，异步action

action可以两种

1. 一般对象 object(plain object)，这种叫同步action
2. 如果action是一个函数，这种action叫异步action





### 例子：异步加

#### 客人等五分钟，和服务员说一份蛋炒饭，然后瞬间上菜。

index.js

```jsx
incrementAsync = () => {
   const { value } = this.selectNumber;
   setTimeout(() => {
     store.dispatch(createIncrementAction(value*1))
   }, 500);
};
```

count_action.js

```js
export const createIncrementAction = data => ({type:INCREMENT,data})
```



#### 或者，客人说一份蛋炒饭，后厨做5分钟，然后上菜。

count_action.js

异步action中一般回调用同步action，可以发现异步action不是一定要用的

客人可以直接等5分钟再报菜名，不是非要后厨

```js
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
```

安装redux-thunk中间件

```
yarn add redux-thunk
```

index.js

```jsx
incrementAsync = () => {
	const { value } = this.selectNumber;
	store.dispatch(createIncrementAsyncAction(value*1,3000))
};
```

store.js

```js
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

```



## 异步action总结

​         (1).明确：延迟的动作不想交给组件自身，想交给action

​         (2).何时需要异步action：想要对状态进行操作，但是具体的数据靠异步任务返回。

​         (3).具体编码：

​                    1).yarn add redux-thunk，并配置在store中

​                    2).创建action的函数不再返回一般对象，而是一个函数，该函数中写异步任务。

​                    3).异步任务有结果后，分发一个同步的action去真正操作数据。

​         (4).备注：异步action不是必须要写的，完全可以自己等待异步任务的结果了再去分发同步action。





# 5_react-redux

react方向那么多人用redux，然后facebook就自己出了一个react-redux插件



![react-redux原理图](/Users/dyq/Desktop/react/Redux/pics/react-redux原理图.png)



UI组件放在component文件夹里面，不能包涵任何关于redux的api，只负责页面呈现

容器组件放在container文件夹里面



<img src="/Users/dyq/Desktop/react/Redux/pics/react-redux目录结构.png" alt="react-redux目录结构" style="zoom:50%;" />





容器组件不能rcc，他是一个桥梁，正是因为其重要，它必须借助一个东西生成，不能程序员自己写。



## react-redux安装



yarn add react-redux





## 容器组件

```jsx
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
    // 返回一个对象！！！！！！
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
// connect第一次调用的时候传入两个参数，且必须是函数
export default connect(mapStateToProps, mapDispatchToProps)(CountUI);
// const CountContainer = connect()(CountUI)

// 虽然不直观，但是其实容器组件是UI组件的父组件
// 那不直观，如何父亲给儿子传递props呢

```



## ui组件

```jsx
import React, { Component } from "react";

export default class Count extends Component {
  increment = () => {
    const { value } = this.selectNumber;
    this.props.increment(value*1)
  };
  decrement = () => {
    const { value } = this.selectNumber;
    this.props.decrement(value*1)
  };
  incrementIfOdd = () => {
    const { value } = this.selectNumber;
    if(this.props.count %2 !== 0){
    this.props.increment(value*1)

    }
  };
  incrementAsync = () => {
    const { value } = this.selectNumber;
    this.props.incrementAsync(value*1,500)

  };

  render() {
    console.log(this.props);
    return (
      <div>
          {/* 展示初始值，想redux的store要 */}
          {/* store的第一个api，getState() */}
        <h1>当前求和为: {this.props.count}</h1>
        <select ref={(c) => (this.selectNumber = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>{" "}
        &nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
        <button onClick={this.incrementAsync}>异步加</button>&nbsp;
      </div>
    );
  }
}

```



## App.jsx 容器组件连接store

```jsx
import React, { Component } from 'react'
import Count from './containers/Count'
import store from './redux/store'

export default class App extends Component {
    render() {
        return (
            <div>
                {/* 给容器组件传递store */}
                <Count store={store}/>
            </div>
        )
    }
}

```



## react-redux总结

​            (1).明确两个概念：

​                        1).UI组件:不能使用任何redux的api，只负责页面的呈现、交互等。

​                        2).容器组件：负责和redux通信，将结果交给UI组件。

​            (2).如何创建一个容器组件————靠react-redux 的 connect函数

​                            connect(mapStateToProps,mapDispatchToProps)(UI组件)

​                                -mapStateToProps:映射状态，返回值是一个对象

​                                -mapDispatchToProps:映射操作状态的方法，返回值是一个对象

​            (3).备注1：容器组件中的store是靠props传进去的，而不是在容器组件中直接引入

​            (4).备注2：mapDispatchToProps，也可以是一个对象



# 6_react-redux简化

## 不用subscribe(不用自己监测了)

这就是为什么你不能自己写容器组件的原因，你没法实现人家这种功能！

react-redux可以不用subscribe监测，因为你connect已经帮你监测。其实从图也可以看出来，UI组件是容器组件的孩子！

原来：

```jsx
import React from "react";
import ReactDOM from "react-dom";
import store from "./redux/store";

import App from "./App"

ReactDOM.render(<App/>,document.getElementById("root"))

store.subscribe(() => {
    ReactDOM.render(<App/>,document.getElementById("root"))
})
```

现在：

```jsx
import React from "react";
import ReactDOM from "react-dom";
import store from "./redux/store";

import App from "./App"

ReactDOM.render(<App/>,document.getElementById("root"))
```



## 不用给容器组件传递store

你如果有很多容器组件都需要store（右手），你就要写很多次props传递参数：

```jsx
import React, { Component } from 'react'
//人家是默认暴露
import Count from './containers/Count'
import store from './redux/store'

export default class App extends Component {
    render() {
        return (
            <div>
                {/* 给容器组件传递store */}
                <Count store={store}/>
                <Count1 store={store}/>
                <Count2 store={store}/>
                <Count3 store={store}/>
                <Count4 store={store}/>
                <Count5 store={store}/>
            </div>
        )
    }
}

```

办法：（provider）

找到App的上一层，index.js

```js
import React from "react";
import ReactDOM from "react-dom";
import store from "./redux/store";

import { Provider } from "react-redux";
//provider会拿到store，哪个容器组件需要，他就给你递过去

import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```



## 简写容器组件里的map

原来：

```jsx
export default connect(
  (state) => ({ count: state }),
mapDispatchToProps的一般写法
  (dispatch) => ({
    increment: (number) => dispatch(createIncrementAction(number)),
    decrement: (number) => dispatch(createDecrementAction(number)),
    incrementAsync: (number, time) =>
      dispatch(createIncrementAsyncAction(number, time)),
  })
)(CountUI);

```

现在：

```jsx
export default connect(
  (state) => ({ count: state }),
  //mapDispatchToProps的精简版 （传递对象）
  {
    // 只需要你提供action，react-redux就可以帮你自动dispatch
    increment:createIncrementAction,
    decrement:createDecrementAction,
    incrementAsync:createIncrementAsyncAction
  }
)(CountUI);
```

## 文件层面的优化

### 原来

需要和redux打交道的UI容器为20个，你就要再写20个容器组件与之搭配。

不需要和redux打交道的UI容器就无所谓。

![react-redux原理图](/Users/dyq/Desktop/react/Redux/pics/react-redux原理图.png)

### 现在

把容器组件和UI组件融合，其实没有违反图的原则。你在一个.jsx中定义两个组件。

```jsx
import React,{ Component } from "react";
import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction,
} from "../../redux/count_action";


import { connect } from "react-redux";



//定义UI组件
class Count extends Component {
  increment = () => {
    const { value } = this.selectNumber;
    this.props.increment(value*1)
  };
  decrement = () => {
    const { value } = this.selectNumber;
    this.props.decrement(value*1)
  };
  incrementIfOdd = () => {
    const { value } = this.selectNumber;
    if(this.props.count %2 !== 0){
    this.props.increment(value*1)

    }
  };
  incrementAsync = () => {
    const { value } = this.selectNumber;
    this.props.incrementAsync(value*1,500)

  };

  render() {
    console.log(this.props);
    return (
      <div>
          {/* 展示初始值，想redux的store要 */}
          {/* store的第一个api，getState() */}
        <h1>当前求和为: {this.props.count}</h1>
        <select ref={(c) => (this.selectNumber = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>{" "}
        &nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
        <button onClick={this.incrementAsync}>异步加</button>&nbsp;
      </div>
    );
  }
}


export default connect(
  (state) => ({ count: state }),
  //mapDispatchToProps的精简版 （传递对象）
  {
    // 只需要你提供action，react-redux就可以帮你自动dispatch
    increment:createIncrementAction,
    decrement:createDecrementAction,
    incrementAsync:createIncrementAsyncAction
  }

)(Count);
```



## 优化总结

1. 容器组件和UI组件整合一个文件
2. 无需自己给容器组件传递store，给<App/>包裹一个<Provider store={store}>即可。
3. 使用了react-redux后也不用再自己检测redux中状态的改变了，容器组件可以自动完成这个工作
4. mapDispatchToProps也可以简单的写成一个对象
5. 一个组件要和redux“打交道”要经过哪几步？
   1. 定义好UI组件---不暴露
   2. 引入connect生成一个容器组件，并暴露，写法如下：

​                                    connect(

​                                        state => ({key:value}), //映射状态

​                                        {key:xxxxxAction} //映射操作状态的方法

​                                    )(UI组件)

​                            (4).在UI组件中通过this.props.xxxxxxx读取和操作状态



这里有一套行云流水的总结：使用react-redux，在p108的后半段。









# 7_数据共享



redux里面存总状态，一定是用对象。



## store创建的时候，需要汇总reducers，变为一个总的reducer

原来只有count的时候，store保存的就是一个数值

当你汇总reducers以后，store保存的就是一个对象了

store.js

```js
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

```



## 数据共享版总结

1. 定义一个Pserson组件，和Count组件通过redux共享数据。

2. 为Person组件编写：reducer、action，配置constant常量。

3. 重点：Person的reducer和Count的Reducer要使用combineReducers进行合并，合并后的总状态是一个对象！！！

4. 交给store的是总reducer，最后注意在组件中取出状态的时候，记得“取到位”。



# 8_纯函数和高阶函数



redux要求reducer是一个纯函数。

你unshift了以后，就改变了参数了，就不纯了。



不可以做不靠谱的事情。



**7.8.1.** **纯函数**

1. 一类特别的函数: 只要是同样的输入(实参)，必定得到同样的输出(返回) 

2. 必须遵守以下一些约束
   1. 不得改写参数数据
   2. 不会产生任何副作用，例如网络请求，输入和输出设备 
   3. 不能调用 Date.now()或者 Math.random()等不纯的方法，因为他们

3. redux 的 reducer 函数必须是一个纯函数



**7.8.2.** **高阶函数**

1. 理解: 一类特别的函数
   1. 情况 1: 参数是函数
   2. 情况 2: 返回是函数

2. 常见的高阶函数:
   1. 定时器设置函数
   2.  数组的 forEach()/map()/filter()/reduce()/find()/bind()
   3.  promise
   4. react-redux 中的 connect 函数

3. 作用：能实现更加动态，更加可拓展的的功能





# 9_redux开发者工具



Redux DevTools



需要配合以一个库使用

yarn add redux-devtools-extension



store.js

```js
//store.js就是创建store的，专门用于暴露一个store对象，整个应用只有一个store对象

//store创建的时候，需要汇总reducers，变为一个总的reducer
import { createStore,applyMiddleware,combineReducers} from "redux"

import countReducer from './reducers/count'
import personReducer from './reducers/person'

//引入redux-thunk,用于支持异步action,默认暴露
import thunk from 'redux-thunk'

//引入redux-devtools-extension,compose有编译的意思
import { composeWithDevTools } from "redux-devtools-extension"

//需要存一个对象，该对象就是redux帮我们保存的总状态对象！！！
const allReducer = combineReducers({
    // 谁能出实话he，并且对he操作呢，countReducer
    he:countReducer,
    rens:personReducer
})

//多个reducer同时为一个store服务，多个厨师！！
// export default createStore(allReducer, applyMiddleware(thunk))

//语法需要这样写，或者不写applyMiddleware(thunk)异步action
export default createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)) )


```



## redux开发者工具总结

1. yarn add redux-devtools-extension

2. store中进行配置

   import {composeWithDevTools} from 'redux-devtools-extension'

   const store = createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))





# 10_redux最终版本



## p114

如果有40个reducer，那你的store.js就要引入40个reducer，文件就太大了。

解决方法：store里只引入一个汇总的reducer

<img src="/Users/dyq/Desktop/react/Redux/pics/汇总reducer文件目录.png" alt="汇总reducer文件目录" style="zoom: 33%;" />

reducers文件夹下的index.js

```js
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

```



store.js

```js
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
```





# 11_react项目打包运行

其实就是把jsx转为js



开发模式，react-dev-tools是红色的。

最终上线肯定是打包成静态文件。



<img src="/Users/dyq/Desktop/react/Redux/pics/打包目录.png" alt="打包目录" style="zoom:50%;" />



```
npm run build
//改命令的速度取决于电脑配置和你的项目复不复杂，用的库多不多
```



打包后会生成一个build文件夹，里面都是最纯粹的html和js。上线后，react-dev-tools就会变成正常颜色，表示现在是生产环境。

如何运行呢，不能直接右键打开。

方法：

1. 自己用java或者node.js搭一台服务器

   （其实用node.js的express其实也不难）

2. 借助一个库，serve 或者 http-server

   把一个文件夹作为根目录，快速搭建一个服务器

   ```
   http-server ./build
   //或者
   http-server build
   
   就是以build文件夹为根目录配置的服务器
   ```

   



​	
