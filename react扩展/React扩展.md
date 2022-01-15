[TOC]



## 1. setState

### setState更新状态的2种写法

1. setState(stateChange, [callback])------对象式的setState

   stateChange为状态改变对象(该对象可以体现出状态的更改)

   callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调

2. setState(updater, [callback])------函数式的setState
               1.updater为返回stateChange对象的函数。
               2.updater可以接收到state和props。
               4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。

   ```jsx
   this.setState((state, props) => {
   	return { count: state.count + 1 };
   });
   
   //简写方式,返回一个东西且只有一个一句话，就加一个()
   this.setState((state) => ({ count: state.count + 1 }));
   ```

   

3. 总结:

   对象式的setState是函数式的setState的简写方式(语法糖)

   使用原则：（没那么绝对）
   				(1).如果新状态不依赖于原状态 ===> 使用对象方式
   				(2).如果新状态依赖于原状态 ===> 使用函数方式
   				(3).如果需要在setState()执行后获取最新的状态数据, 
   					要在第二个callback函数中读取

   

方括号的意思是可选参数

**react其实帮你更新状态的时候是一个异步的更新：**

**setState是一个同步的方法，但是react一会儿再帮你做，即setState调完引起的后续动作是异步的**

### 异步更新

```jsx
this.setState({count:count+1})
console.log("12航",this.state.count);
```

### callback回调

是在react帮你改变状态并且重新render后，才会调用的。

```
this.setState({count:count+1},()=>{})
```



------



## 2. lazyLoad

项目特别大的时候，lazyLoad必用。

用的时候才加载。

路由组件用的最多lazyLoad



如果没有用lazyLoad，其实左边的导航栏里面，所有的路由组件都已经被加载了。

<img src="/Users/dyq/Desktop/react/react扩展/pics/without_lazyLoad.png" alt="without_lazyLoad" style="zoom:50%;" />

### lazyLoad高阶函数

懒加载用lazyLoad函数，里面继续接受一个函数，那么lazyLoad就是高阶函数

```jsx
import React, { Component, lazy, Suspense } from "react";

//人家这个库给你很多组件，所以他用的是分别暴露
import { NavLink, Route, Routes } from "react-router-dom";


//Loading组件不可以懒加载
import Loading from "./Loading"

// import Home from "./Home";
// import About from "./About";

//加花括号需要return
const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));

```

### Suspense包裹路由

单这样还不行，按需加载，你网速慢，如果加载不出来怎么办。

此时就需要一个Suspense包裹注册的路由，fallback指定你默认的东西。

随用随请求引入，只会引入一次。

```jsx
<Suspense fallback={<h1>loading.....</h1>}>
  <Routes>
    <Route path="/about" element={<About />}></Route>
    <Route path="/home" element={<Home />}></Route>
  </Routes>
</Suspense>
```



### 路由组件的lazyLoad

```js
	//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
	const Login = lazy(()=>import('@/pages/Login'))
	
	//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
	<Suspense fallback={<h1>loading.....</h1>}>
        <Switch>
            <Route path="/xxx" component={Xxxx}/>
            <Redirect to="/login"/>
        </Switch>
    </Suspense>
```



------



## 3. Hooks

### 16.8版本

函数组件没有this，所以三大属性里面的state和refs都不能用，props特殊。

当时说，函数组件用于定义简单组件（没有state）。

但是16.8版本后提出了hooks，函数组件就有了这些东西，站起来了。

#### 1. React Hook/Hooks是什么?

```
(1). Hook是React 16.8.0版本增加的新特性/新语法
(2). 可以让你在函数组件中使用 state 以及其他的 React 特性
```

#### 2. 三个常用的Hook

```
(1). State Hook: React.useState()
(2). Effect Hook: React.useEffect()
(3). Ref Hook: React.useRef()
```

#### 3. State Hook

```
(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
(2). 语法: const [xxx, setXxx] = React.useState(initValue)  
			    //数组的结构赋值(按照位数写就行)

(3). useState()说明:
        参数: 第一次初始化指定的值在内部作缓存
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
(4). setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
```

```jsx
//函数式组件
//Demo函数调用了1+n次，为什么useState(0)不会覆盖count，因为react底层做了处理
function Demo() {
    //数组的结构赋值(按照位数写就行)
    const [count,setCount] = React.useState(0)
    // console.log(count,setCount);

    function add(){
      	//第一种setCount的方法
        setCount(count+1)
      	//第二种setCount的写法
      	setCount(count=>count+1)
    }

  return (
    <div>
      <h2>当前求和为：{count}</h2>
      <button onClick={add}>点我+1</button>
    </div>
  );
}

export default Demo
```

state hook需要写多行这个

```jsx
const [count, setCount] = React.useState(0);
const [name, setName] = React.useState('tom');
```





#### 4. Effect Hook （有点像vue watch）

```
(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
(2). React中的副作用（生命周期钩子）操作:
        发ajax请求数据获取
        设置订阅 / 启动定时器
        手动更改真实DOM
(3). 语法和说明: 
        useEffect(() => { 
          // 在此可以执行任何带副作用操作
          return () => { // 在组件卸载前执行
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
          }
        }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行
    
(4). 可以把 useEffect Hook 看做如下三个函数的组合，具体是谁
        componentDidMount() 取决于后面的第二个参数
        componentDidUpdate() 取决于后面的第二个参数
    	componentWillUnmount() 第一个参数返回的函数就相当于componentWillUnmount
    	
    	
```

```jsx
React.useEffect(() => {
    let timer = setInterval(() => {
        setCount(count=> count+1)
    }, 1000);
    // useEffect的第一个参数的返回的那个函数就相当于componentWillUnmount
    return ()=>{
        clearInterval(timer)
    }
   //谁也不监测 
}, []);
```

！！！如果用effect hook去模拟类组件的生命周期钩子，稍微有点麻烦！！！



##### useEffect可以接受两个参数

```
//可以接受两个参数，第二个为空数组相当于谁都不监测
React.useEffect(()=>{
console.log('@');
},[])


//如果不接受后面的空数组，react底层监测到你componentDidUpdate的时候，也会给你调用第一个参数
//不写第二个参数，相当于监测所有人
React.useEffect(()=>{
console.log('@');
})

//相当于只监测count，count改变就会被监测到
React.useEffect(()=>{
console.log('@');
},[count])
```



#### 5. Ref Hook

```
(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
(2). 语法: const refContainer = React.useRef()
(3). 作用:保存标签对象,功能与React.createRef()一样
		和createRef这个类组件的ref容器（第三种）是一样的，创建了一个ref容器，专人专用。
```



------



## 4. Fragment

### 使用

	<Fragment><Fragment>
	<></>

### 作用

> 可以不用必须有一个真实的DOM根标签了

骗过jsx的检查，最后编译后Fragment标签会被抛弃。

```jsx
import React, { Component , Fragment} from 'react'

export default class Demo extends Component {
    render() {
        return (
            <Fragment>
                <input type='text'></input>
                <input type='text'></input>
            </Fragment>
        )
    }
}

```

```jsx
import React, { Component, Fragment} from 'react'
import Demo from './components/4_Fragment'

export default class App extends Component {
    render() {
        return (
            <Fragment>
                <Demo/>
            </Fragment>
        )
    }
}

```

### 另一种方法：空标签

import React, { Component , Fragment} from 'react'

export default class Demo extends Component {
    render() {
        return (
            <>
                <input type='text'></input>
                <input type='text'></input>
            </>
        )
    }
}

### 空标签和Fragment的区别

Fragment可以传递key，例如key={1}，但是Fragment不允许其他属性。

所以如果只是一个简单的组件，可以用空标签

如果参与遍历，你就写Fragment

<hr/>

## 5. Context

### 理解

> 一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信
>
> 父子之间用props更方便

### 使用

层数多的时候，如果中间组件不用，只需要：祖->孙，这样的话用props中间就会冗余。

```jsx
import React, { Component } from 'react'
import './index.css'

export default class A extends Component {

    state = {username:'tom'}
    render() {
        return (
            <div className="parent">
                <h3>我是A组件</h3>
                <h4>我的用户名是{this.state.username}</h4>
                <B username={this.state.username}/>
            </div>
        )
    }
}



class B extends Component {
    render() {
        return (
            <div className="child">
            <h3>我是B组件</h3>
            <h4>我从A接收到用户名是:{this.props.username}</h4>
            <C/>
        </div>
        )
    }
}


class C extends Component {
    render() {
        return (
            <div className="grand">
            <h3>我是C组件</h3>
            <h4>我从A接收到用户名是:???</h4>
            </div>
        )
    }
}

```

使用Context后

```jsx
import React, { Component } from "react";
import "./index.css";

//为什么大写，因为你如果后续使用，<MyContext.Provider>，组件标签要大写
//或者 const {provider} = MyContext
//创建Context对象
const MyContext = React.createContext();

export default class A extends Component {
  state = { username: "tom", age: 18 };
  render() {
    const { username, age } = this.state;

    return (
      <div className="parent">
        <h3>我是A组件</h3>
        <h4>我的用户名是{username}</h4>

        {/* 包裹以后，谁想要value，谁就要声明，即举手 */}
        {/* 属性必须交value */}
        <MyContext.Provider value={{ username, age }}>
          <B />
        </MyContext.Provider>
      </div>
    );
  }
}

class B extends Component {
  render() {
    return (
      <div className="child">
        <h3>我是B组件</h3>
        <C />
      </div>
    );
  }
}

// class C extends Component {
//     //声明
//     static contextType = MyContext
//     render() {
//         return (
//             <div className="grand">
//             <h3>我是C组件</h3>
//             <h4>我从A接收到用户名是{this.context.username}</h4>
//             <h4>年龄{this.context.age}</h4>
//             </div>
//         )
//     }
// }

//如果C是函数式组件
//没有static，没有this，那么我们就用第二种使用Context的方式
function C() {
  return (
    <div className="grand">
      <h3>我是C组件</h3>
      <h4>
        我从A接收到用户名是
        <MyContext.Consumer>
          {
            //value就是provider传下来的
            (value) => `${value.username},年龄是${value.age}`
          }
        </MyContext.Consumer>
      </h4>
    </div>
  );
}

```



```js
1) 创建Context容器对象：
	const XxxContext = React.createContext()  
	
2) 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
	<xxxContext.Provider value={数据}>
		子组件
    </xxxContext.Provider>
    
3) 后代组件读取数据：

	//第一种方式:仅适用于类组件 
	  static contextType = xxxContext  // 声明接收context
	  this.context // 读取context中的value数据
	  
	//第二种方式: 函数组件与类组件都可以
	  <xxxContext.Consumer>
	    {
	      value => ( // value就是context中的value数据
	        要显示的内容
	      )
	    }
	  </xxxContext.Consumer>
```

### 注意

	在应用开发中一般不用context, 一般都用它的封装react插件



<hr/>


## 6. 组件优化

### Component的2个问题 

> 1. 只要执行setState(),即使不改变状态数据, 组件也会重新render() ==> 效率低
>
> 2. 只当前组件重新render(), 就会自动重新render子组件，纵使子组件没有用到父组件的任何数据 ==> 效率低
>
>    ```jsx
>    import React, { Component } from 'react'
>    import './index.css'
>    export default class Parent extends Component {
>    
>        state = {carName:"奔驰"}
>    
>        changeCar = () => {
>            this.setState(state=>({carName:"迈巴赫"}))
>        }
>    
>        render() {
>            console.log("Parent render");
>            const {carName} = this.state;
>            return (
>                <div className='parent'>
>                    <h3>我是Parent组件</h3>
>                    <span>我的车名字是:{carName}</span><br/>
>                    <button onClick={this.changeCar}>点我换车</button>
>                    {/* <Child carName={carName}></Child> */}
>                    <Child></Child>
>    
>                </div>
>            )
>        }
>    }
>    
>    //我的子组件没有用到你的东西，我为什么还要render？
>    //不公平啊～！！！！！！！！！！！！！！
>    class Child extends Component {
>        render() {
>            console.log("Child render");
>            return (
>                <div className='child'>
>                    <h3>我是Child组件</h3>
>                    {/* <span>我接到的车是:{this.props.carName}</span> */}
>                </div>
>            )
>        }
>    }
>    ```
>
>    

### 效率高的做法

>  只有当组件的state或props数据发生改变时才重新render()

### 原因

>  Component中的shouldComponentUpdate()总是返回true

### 解决

	办法1: 
		重写shouldComponentUpdate()方法
		比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
	办法2:  
		使用PureComponent
		PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
		注意: 
			只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false  
			不要直接修改state数据, 而是要产生新数据
	项目中一般使用PureComponent来优化





### 方法一：手动控制componentShouldUpdate阀门

```jsx
import React, { Component } from 'react'
import './index.css'
export default class Parent extends Component {

    state = {carName:"奔驰"}

    changeCar = () => {
        this.setState(state=>({carName:"迈巴赫"}))
    }

    //可以接到两个参数
    shouldComponentUpdate(nextProps,nextState){
        console.log(this.props,this.state);
        console.log(nextProps,nextState);
        if(this.state.carName===nextState.carName){
            return false
        }
        return true
    }

    render() {
        console.log("Parent render");
        const {carName} = this.state;
        return (
            <div className='parent'>
                <h3>我是Parent组件</h3>
                <span>我的车名字是:{carName}</span><br/>
                <button onClick={this.changeCar}>点我换车</button>
                <Child carName={carName}></Child>
                {/* <Child></Child> */}
            </div>
        )
    }
}


class Child extends Component {
    
    shouldComponentUpdate(nextProps){
        if(this.props.carName===nextProps.carName){
            return false
        }
        return true
    }

    render() {
        console.log("Child render");
        return (
            <div className='child'>
                <h3>我是Child组件</h3>
                <span>我接到的车是:{this.props.carName}</span>
            </div>
        )
    }
}
```

方法二：使用PureComponent

```jsx
import React, { PureComponent } from 'react'
import './index.css'
export default class Parent extends PureComponent {

    state = {carName:"奔驰"}

    changeCar = () => {
        this.setState(state=>({carName:"迈巴赫"}))
    }
    
    render() {
        console.log("Parent render");
        const {carName} = this.state;
        return (
            <div className='parent'>
                <h3>我是Parent组件</h3>
                <span>我的车名字是:{carName}</span><br/>
                <button onClick={this.changeCar}>点我换车</button>
                <Child carName={carName}></Child>
            </div>
        )
    }
}

class Child extends PureComponent {
    render() {
        console.log("Child render");
        return (
            <div className='child'>
                <h3>我是Child组件</h3>
                <span>我接到的车是:{this.props.carName}</span>
            </div>
        )
    }
}
```

PureComponent其实帮你重写了componentShouldUpdate方法

但是有一点点小瑕疵，pureComponent只做一个浅对比

```jsx
changeCar = ()=>{
	const obj = this.state
	obj.carName='迈巴赫'
	this.setState(obj)
}
```



<hr/>


## 7. render props

### 如何向组件内部动态传入带内容的结构(标签)?

	Vue中: 
		使用slot技术, 也就是通过组件标签体传入结构  <A><B/></A>
	React中:
		使用children props: 通过组件标签体传入结构
		使用render props: 通过组件标签属性传入结构,而且可以携带数据，一般用render函数属性

### children props

	<A>
	  <B>xxxx</B>
	</A>
	{this.props.children}
	问题: 如果B组件需要A组件内的数据, ==> 做不到 

### render props

此render只是一个props属性，为啥叫render，因为该函数返回的是一个组件。（当然不叫render也可以）

	<A render={(data) => <C data={data}></C>}></A>
	A组件: {this.props.render(内部state数据)}
	C组件: 读取A组件传入的数据显示 {this.props.data} 

你是parent组件的编写者，你告诉写A组件的人，给我预留出一个插槽来在你的A组件里面，插槽里面放啥等我以后自己render。

<hr/>

## 8. 错误边界(Errot boundary)

npm run build



#### 理解：

错误边界(Error boundary)：用来捕获后代组件错误，渲染出备用页面

不要让子组件的问题影响到父组件，不要让其扩散。**做手脚应该在父组件里面。**

#### 特点：

只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

##### 使用方式：

getDerivedStateFromError配合componentDidCatch

```js
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    };
}

componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info);
}
```
## 9. 组件通信方式总结

#### 组件间的关系：

- 父子组件
- 兄弟组件（非嵌套组件）
- 祖孙组件（跨级组件）

#### 几种通信方式：

		1.props：
			(1).children props
			(2).render props
		2.消息订阅-发布：
			pubs-sub、event等等
		3.集中式管理：
			redux、dva等等
		4.Context:
			生产者-消费者模式

#### 比较好的搭配方式：
		父子组件：props
		兄弟组件：消息订阅-发布、集中式管理
		祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(开发用的少，封装插件用的多)

