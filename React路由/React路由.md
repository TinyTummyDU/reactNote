[TOC]











# 1_SPA



1. 单页 Web 应用(single page web application，SPA)
2. 整个应用只有**一个完整的页面**。
3. 点击页面中的链接**不会刷新**页面，只会做页面的**局部更新。** （单页面，多组件，刷新的是组件）
4. 数据都需要通过 ajax 请求获取, 并在前端异步展现。





# 2_路由的理解



## 什么是路由

1. 一个路由就是一个映射关系(key:value)
2. key 为path路径（这里不能说是url，url是http的东西）, value 可能是 function 或 component









## 路由分类



后段路由和前端路由的key都是path

### 后端路由

1. 理解: value 是 function, 用来处理客户端提交的请求。

2. 注册路由: router.get(path, function(req, res))

3. 工作过程:当 node 接收到一个请求时, 根据请求路径找到匹配的路由, 调用路

   由中的函数来处理请求, 返回响应数据

   ```js
   app.get("/search/users", function (req, res) {
     const {q} = req.query
     axios({
       url: 'https://api.github.com/search/users',
       params: {q}
     }).then(response => {
       res.json(response.data)
     })
   })
   ```

   



### 前端路由

1. 浏览器端路由，value 是 component，用于展示页面内容。

2. 注册路由: <Route path="/test" component={Test}>

3. 工作过程:当浏览器的 path 变为/test 时, 当前路由组件就会变为 Test 组件

   为什么这种就可以将127.0.0.1:5501/home变为127.0.0.1:5501/test，而不是.html的改变呢

   **工作原理**

   浏览器的history

   DOM 和 BOM（例如window就是BOM对象），BOM身上有history属性，但是我们不直接操作history，因为原生的不好用。

   我们借助一个库 **history.js**

   

   #### history有两种工作模式

   ```js
   let history = History.createBrowserHistory() 
   //方法一，直接使用H5推出的history身上的API，是比较新的，有的旧浏览器不允许你直接操作history
   
   let history = History.createHashHistory() 
   //方法二，用了hash值（像锚点，锚点跳转不会更新页面，但是会留下历史记录）
   //兼容性极佳，就是url不太好看
   ```
   
   锚点test
   
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>anchor test</title>
   </head>
   <body>
       <!-- 锚点，锚点跳转不会更新页面，但是会留下历史记录 -->
       <a href="#demo1">跳转到demo1</a>
       <a href="#demo2">跳转到demo2</a>
       <a href="#demo3">跳转到demo3</a>
   </body>
   </html>
   ```
   
   
   
   **工作原理demo**
   
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <title>前端路由的基石_history</title>
   </head>
   <body>
   	<a href="http://www.atguigu.com" onclick="return push('/test1') ">push test1</a><br><br>
   	<button onClick="push('/test2')">push test2</button><br><br>
   	<button onClick="replace('/test3')">replace test3</button><br><br>
   	<button onClick="back()">&lt;= 回退</button>
   	<button onClick="forword()">前进 =&gt;</button>
   
   	<script type="text/javascript" src="https://cdn.bootcss.com/history/4.7.2/history.js"></script>
   	<script type="text/javascript">
   		
   		//浏览器的history其实是stack的结构
   
   		//这个history是为了我们方便操作window的history
   
   		//history有两种工作模式
   		
   		// let history = History.createBrowserHistory() //方法一，直接使用H5推出的history身上的API，是比较新的，有的旧浏览器不允许你直接操作history
   
   
   		let history = History.createHashHistory() //方法二，用了hash值（像锚点，锚点跳转不会更新页面，但是会留下历史记录）
   		//和方法一的区别 “#/”
   		//http://127.0.0.1:5500/src/***_history.html#/
   
   		//stack压入新的路径
   		function push (path) {
   			history.push(path) //往浏览器的历史记录里面推入path
   			return false //这个return，加上onclick="return push('/test1')就可以实现禁止a标签跳转，至少响应click
   		}
   		//替换栈顶的路径
   		function replace (path) {
   			history.replace(path)
   		}
   		//有history在手，路径和历史记录随你操作
   		function back() {
   			history.goBack()
   		}
   		function forword() {
   			history.goForward()
   		}
   		//只要history的路径出现变化，就调用回调
   		history.listen((location) => {
   			console.log('请求路由路径变化了', location)
   		})
   	</script>
   </body>
   </html>
   ```
   
   **history stack**
   
   <img src="/Users/dyq/Desktop/React路由/pics/history_stack.png" alt="history_stack" style="zoom: 25%;" />





## react-router的理解

react-router有三种实现，给三种人用：

1. web: react-router-dom

2. native

3. anywhere(哪里都能用，通用性强，但是api不太好用)

### react-router-dom

通俗来说，路由就是你家里的路由器后面的插口。你没有路由器就没有路由可用。Router，Route。

1. react 的一个插件库。
2. 专门用来实现一个 SPA 应用。
3. 基于 react 的项目**基本都会用到此库**。
4. 这个库是没有帮我们下载的，就像prop-types一样 (yarn add react-router-dom)











# 3_路由的基本使用

1. 明确好界面中的导航区、展示区
2. 导航区的a标签改为Link标签
                       <Link to="/xxxxx">Demo</Link>
3. 展示区写Route标签进行路径的匹配
              <Route path='/xxxx' component={Demo}/>
   react-router-dom v6:
               <Routes>
                 <Route path="/about" element={<About />}></Route>
                 <Route path="/home" element={<Home />}></Route>
               </Routes>
4. <App>的最外侧包裹了一个<BrowserRouter>或<HashRouter>



## 例子：

App.jsx

```html
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import Home from "./components/Home";
import About from "./components/About";

//人家这个库给你很多组件，所以他用的是分别暴露
import { Link, Route, Routes } from "react-router-dom";

export default class App extends Component {
  //状态在哪里，操作的方法就在哪，现在我们使用消息的发布与订阅后，实现了兄弟之间通信，那我们的App就成了真正意义上的壳

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <div className="page-header">
              <h2>React Router Demo</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              {/* 原生html中，靠<a>跳转不同的页面 */}
              {/* <a className="list-group-item" href="./about.html">
                About
              </a>
              <a className="list-group-item active" href="./home.html">
                Home
              </a> */}

              {/* 在React中靠路由链接实现切换组件-编写路由链接 */}

              {/* React中靠路由链接实现切换组件, Link必须包裹在Router里面，有了路由器才能使用路由 */}
              {/* 路由器分为两种（你需要告诉人家你要哪种路由器）：BrowerRouter和HashRouter，对应了history的两种模式 */}
              {/* to 后面尽量别写大写 */}
              <Link className="list-group-item" to="/about">
                About
              </Link>
              <Link className="list-group-item" to="/home">
                Home
              </Link>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/* 整个页面只能用一个路由器处理，即路由链接和注册路由只能由一个Router标签去包 */}
                {/* 怎么包呢，我们直接在index.js里面包，因为我们所有的组件都是App的自组件 */}

                {/* 注册路由,检测浏览器path的变化，展示组件*/}
                {/* P77. 路由基础。如果使用的react-router-dom版本是v6，则需要用Routes把Route包裹起来。同时Route标签中的conponent要换成element，且引用的组件名称要使用尖括号。 */}
                <Routes>
                  <Route path="/about" element={<About />}></Route>
                  <Route path="/home" element={<Home />}></Route>
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

```

#### BrowerRouter

index.js

```js
//引入react核心库
import React from "react";
//引入ReactDOM
import ReactDOM from "react-dom";

//第三方的库往上靠
import { BrowserRouter as Router } from "react-router-dom";

//引入App
import App from "./App";

/* 整个页面只能用一个路由器处理，即路由链接和注册路由只能由一个Router标签去包 */
/* 怎么包呢，我们直接在index.js里面包，因为我们所有的组件都是App的自组件 */
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

```

#### HashRouter

如果不用<BrowerRouter>而是用<HashRouter>

井号后面的是hash值，后面的内容都不会再发给服务器，属于前台资源。

```js
//引入react核心库
import React from "react";
//引入ReactDOM
import ReactDOM from "react-dom";

//第三方的库往上靠
import { HashRouter as Router } from "react-router-dom";

//引入App
import App from "./App";

/* 整个页面只能用一个路由器处理，即路由链接和注册路由只能由一个Router标签去包 */
/* 怎么包呢，我们直接在index.js里面包，因为我们所有的组件都是App的自组件 */
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

```











# 4_路由组件



## 路由组件和一般组件

1. 写法不同：

   一般组件：<Demo/>

    路由组件：<Route path="/demo" component={Demo}/>

2. 存放位置不同

   一般组件：components

    路由组件：pages

3. 接收到的props不同

   一般组件：写组件标签时传递了什么，就能收到什么

   路由组件：接收到三个固定的属性 history，location，match

   

## 路由组件的3个固定props

只把常用的一些东西留下来

### **history**

go: ƒ go(n)

goBack: ƒ goBack()

goForward: ƒ goForward()

push: ƒ push(path, state)

replace: ƒ replace(path, state)

###  **location**

 pathname: "/about"

 earch: ""

 state: undefined

###  **match**

params: {}

path: "/about"

url: "/about"





# 5_react-router-dom相关api

## 内置组件

### 1_BrowerRouter

### 2_HashRouter

### 3_Route

### 4_Redirect

### 5_Link



```jsx

{/* 原生html中，靠<a>跳转不同的页面 */}
 <a className="list-group-item" href="./about.html">
About
</a>
<a className="list-group-item active" href="./home.html">
Home
</a>

{/* 在React中靠路由链接实现切换组件-编写路由链接 */}

{/* React中靠路由链接实现切换组件, Link必须包裹在Router里面，有了路由器才能使用路由 */}
{/* 路由器分为两种（你需要告诉人家你要哪种路由器）：BrowerRouter和HashRouter，对应了history的两种模式 */}
{/* to 后面尽量别写大写 */}
<Link className="list-group-item active " to="/about"> 
  
  
<Link className="list-group-item" to="/about">
About
</Link>
<Link className="list-group-item" to="/home">
Home
</Link> 
```



### 6_NavLink



```jsx
{/* 如果像用高亮，就不要Link的升级版 NavLink */}
{/* 你点谁，谁就会被追加一个类名叫active */}
{/* 但是我们还是加一个属性，activeClassName 点的时候就会加改属性的类名 */}
<NavLink activeClassName="atguigu" className="list-group-item" to="/about">
About
</NavLink>
<NavLink activeClassName="atguigu" className="list-group-item" to="/home">
Home
</NavLink>
```

atguigu类样式可一些在index.html里面

```html
<!-- 为啥App.jsx里面需要的样式，可以卸载index.html里面，因为SPA -->
<!-- 把权限提高，才能盖过bootstrap -->
<style>
  .atguigu{
    background-color: red !important;
    color: white !important;
  }
</style>
```

#### 封装MyNavLink

1. NavLink可以实现路由链接的高亮，通过activeClassName指定样式名

2. .标签体内容是一个特殊的标签属性

3. 通过this.props.children可以获取标签内容

   

{this.props} : {to: '/about', children: 'About'}

MyNavLink

```jsx
// {...this.props}让你省心，不用一个个接收
//   <NavLink activeClassName="atguigu" className="list-group-item" {...this.props}>
//     {title}
//   </NavLink>

//那么title怎么办呢
//在使用MyNavLink的地方不要用自闭和标签
// <MyNavLink to="/home" title='Home'/> -> <MyNavLink to="/home">Home</MyNavLink>
// 但是我们没有接收过标签体内容啊 --> 标签体内容也是一种特殊属性，也可以通过this.props收集
// {to: '/home', children: 'Home'}

<NavLink
activeClassName="atguigu"
className="list-group-item"
{...this.props}
/>
/* {this.props.children} 可以不这样写，直接配在标签属性里面 {...this.props帮你全做了}*/
/* </NavLink> */
```

对应的App.jsx

```jsx
<MyNavLink to="/about">About</MyNavLink>
```



### 7_Switch

一般情况下，我们不会出现一个路径对应多个组件，这样的话，react会把Home和Test两个路由组件都展示，如果真的有这种需求，为什么你不把他俩合成一个组件。

```jsx
<Route path="/about" component={About}></Route>
<Route path="/home" component={Home}></Route>
<Route path="/home" component={Test}></Route>
```

因此，我们从react-router-dom里引入Switch组件。

高效：有匹配就不继续向下走了。

```jsx
<Switch>
<Route path="/about" component={About}></Route>
<Route path="/home" component={Home}></Route>
<Route path="/home" component={Test}></Route>
</Switch>
```

1. 通常情况下，path和component是一一对应的关系。
2. Switch可以提高路由匹配效率(单一匹配)。

## 其他

### 1_history对象

### 2_match对象

### 3_withRouter函数







# 6_多级路径刷新页面样式丢失的问题

现在又有一个新的需求，所有路由前面加一个/atguigu，这样会产生一个样式丢失的问题

http://localhost:3000

webpack将public设置成你react脚手架内置服务器的根路径

http://localhost:3000/css/bootstrap.css

可以拿到bootstrap.css

如果你请求了一个不存在的资源，就返回给你index.html

http://localhost:3000/a/b/haha.html

同理，你直接访问http://localhost:3000，也给你index.html



P82

304是存缓存了

强刷一下，你会发现bootstrap.css的访问路径错了，然后会给你index.html





什么时候样式丢失呢？？？

**多级路径刷新页面样式丢失的问题**

## 三种解决办法

```html
./的意思是从当前路径出发，这样写的话就会带上atguigu
<link rel="stylesheet" href="./css/bootstrap.css">

方法一：
->去掉"."
直接去localhost，public下面去找
<link rel="stylesheet" href="/css/bootstrap.css">


方法二：
->public的绝对路径 %PUBLIC_URL%，这种写法只适用于react脚手架里面这样写
<link rel="stylesheet" href="%PUBLIC_URL%/css/bootstrap.css">

方法三：
->不用BrowserRouter，用HashRouter，这种处理方法其实用的比较少
井号后面的都是前端资源，不带给3000
```





# 7_路由的模糊匹配和严格匹配



1. 默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）
2. 开启严格匹配：<Route exact={true} path="/about" component={About}/>
3. 严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由



## 模糊匹配（默认）

人家要你不能少，但是可以多（顺序不能串）

/home/a/b -> home 可以

a/home/b -> home 不可以

```jsx
//路由链接
<MyNavLink to="/about">About</MyNavLink>
<MyNavLink to="/home/a/b">Home</MyNavLink>

//路由注册
<Switch>
  <Route path="/about" component={About}></Route>
  <Route path="/home" component={Home}></Route>
</Switch>
```



## 严格匹配（exact）

```jsx
//路由链接
<MyNavLink to="/about">About</MyNavLink>
<MyNavLink to="/home/a/b">Home</MyNavLink>

//路由注册
<Switch>
  <Route exact={true} path="/about" component={About}></Route>
  <Route exact={true} path="/home" component={Home}></Route>
</Switch>

//直接写个exact也行
<Switch>
  <Route exact path="/about" component={About}></Route>
  <Route exact path="/home" component={Home}></Route>
</Switch>
```

**不要随便用严格匹配**

如果东西都是好好的，你不要开严格匹配。







# 8_Redirect重定向

http://localhost:3000

和

http://localhost:3000/

的效果是一样的

这个斜杠/，会被拿去和你的路由注册做对比，但是/其实是做分隔的，所以他真正拿到的是一个空字符串。

空字符串和/about和/home都匹配不上，就给你默认的index.html



此时你如果匹配不上的话，就Redirect。一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由。

**这个可以解决一上来就选择一个导航item的需求**

```jsx
<Switch>
<Route path="/about" component={About}></Route>
<Route path="/home" component={Home}></Route>
<Redirect to="/about"/>
</Switch>
```











# 9_嵌套路由（多级路由）

1. 注册子路由时要写上父路由的path值
2. 路由的匹配是按照注册路由的顺序进行的



Home组件理由有了新的导航

二级路由

```jsx
import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Message from "./Message";
import News from "./News";
import MyNavLink from "../../components/MyNavLink";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h3>我是Home的内容</h3>
        <ul className="nav nav-tabs">
          <li>
              {/* 你点了news，然后路径变为了/home/news，然后模糊匹配home，所以home组件没有丢。你可以看到 */}
              {/* home组件一挂载，进行下面的第二次路由注册*/}
              {/* 因此哪怕你注册三级路由，前两级路由也得规规矩矩的写 */}
              {/* 这里也解释了严格匹配的的问题，如果第一级路由开启了严格匹配，那么你点击news的时候，home组件就丢了 （每次匹配都是从最开始的第一级路由开始匹配） */}
            <MyNavLink to="/home/news">News</MyNavLink>
          </li>
          <li>
            {/* 模糊匹配home，路径里还残留了/message，这时候再第二次注册路由 */}
            <MyNavLink to="/home/message">Message</MyNavLink>
          </li>
        </ul>

        {/* 注册路由 */}
        {/* App.jsx里面的路由一定是最先注册的 */}

        <Switch>
          <Route path="/home/news" component={News}></Route>
          <Route path="/home/message" component={Message}></Route>
          {/* home组件一挂载，这里就执行，因为当前路径是home，所以和上面两行都无法模糊匹配，那么就会走Redirect实现默认勾选News */}
          <Redirect to="/home/news"/>
        </Switch>

      </div>
    );
  }
}


```

一级路由

```jsx
<Switch>
<Route path="/about" component={About}></Route>
<Route path="/home" component={Home}></Route>
<Redirect to="/about"/>
</Switch>
```







# 10_向路由组件传递参数





Ajax 有三种传递参数的方式

1. query
2. params
3. body: 两种编码形式 url encoded 和 json



## 传递params参数

具体操作

1. 路由链接的时候：携带参数

   ```jsx
   {/* 模版字符串是js，要用的话就要{} */}
   <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link> &nbsp; &nbsp;
   ```

2. 注册路由的时候：声明接收

   ```jsx
   {/* 注册路由 */}
   {/* 声明接收params参数 */}
   <Route path="/home/message/detail/:id/:title" component={Detail}></Route>
   ```

3. 接受参数

   ```jsx
   const {id,title} = this.props.match.params
   ```

Detail.jsx路由组件

```jsx
import React, { Component } from "react";

const data = [
    {id:'01',content:'你好中国'},
    {id:'02',content:'爱你哦'},
    {id:'03',content:'未来的自己'}
]
export default class Detail extends Component {
  render() {
    //接收params参数
    const {id,title} = this.props.match.params
    const dataObj = data.find((obj) => {
        return obj.id === id;
    })
    return (
      <ul>
        <li>ID:{id}</li>
        <li>TITLE:{title}</li>
        <li>CONTENT:{dataObj.content}</li>
        
      </ul>
    );
  }
}

```



Message.jsx路由组件

```jsx
import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import Detail from "./Detail";

export default class Message extends Component {
  state = {
    messageArr: [
      { id: "01", title: "消息1" },
      { id: "02", title: "消息2" },
      { id: "03", title: "消息3" },
    ],
  };
  render() {
    const { messageArr } = this.state;
    return (
      <div>
        <ul>
          {messageArr.map((msgObj) => {
            return (

              
              <li key={msgObj.id}>
                {/* 不需要高亮，就用Link就行 */}
                {/* 向路由组件传递params参数，像极了ajax请求里的param参数*/}
                {/* 模版字符串是js，要用的话就要{} */}
                <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link> &nbsp; &nbsp;
              </li>
            );
          })}
        </ul>
        <hr />

        {/* 注册路由 */}
        {/* 声明接收params参数 */}
          <Route path="/home/message/detail/:id/:title" component={Detail}></Route>


      </div>
    );
  }
}

```













## 传递search参数

相比params参数，注册路由的时候省心一些，但是接受的时候比较麻烦

1. 路由链接(携带参数)：

   ```jsx
   <Link to='/demo/test?name=tom&age=18'}>详情</Link>
   ```

   

2. 注册路由(无需声明，正常注册即可)：

   ```jsx
   <Route path="/demo/test" component={Test}/>
   ```

3. 接收参数：this.props.location.search (一定要把 ? 去掉)

4. 注：获取到的search是urlencoded编码字符串，需要借助querystring解析



urlencoded编码

```jsx
let obj = {name:'tom',age:18}
    //name=tom&age=18
    //这种编码形式叫做urlencoded编码
    //用querystring库可以帮你，和json的方法有点像（react已经内置了，querystring）

qs.stringify(obj)
let obj1 = qs.parse(str)
```



```jsx
//接收search参数，search没帮你像是params一样在match里面整合为对象，你需要自己做（字符串分割），或者借助一个库（react已经有了，querystring）
// let obj = {name:'tom',age:18}
// name=tom&age=18
//这种编码形式叫做urlencoded编码
//用querystring库可以帮你，和json的方法有点像
//qs.stringify(obj)
//let obj1 = qs.parse(str)
const {search} = this.props.location
const {id,title} = qs.parse(search.slice(1))

const dataObj = data.find((obj) => {
return obj.id === id;
})

console.log("111",dataObj);
return (
<ul>
<li>ID:{id}</li>
<li>TITLE:{title}</li>
<li>CONTENT:{dataObj.content}</li>
</ul>
);
```







## 传递state参数



params和search的参数都能在path上暴露出来

state的优势在这里！



1.  路由链接(携带参数)：

   ```jsx
   <Link to={{pathname:'/demo/test',state:{name:'tom',age:18}}}>详情</Link>
   ```

2. 注册路由(无需声明，正常注册即可)：

   ```jsx
   <Route path="/demo/test" component={Test}/>
   ```

3.  接收参数：this.props.location.state

   备注：刷新也可以保留住参数，但是缓存清除了的话，就要特别注意了



```jsx
{/* 路由链接 */}

{/* 向路由组件传递state参数 */}
{/* 传递一个对象给to，并且注意是pathname */}
<Link to={{pathname:'/home/message/detail',state:{id:msgObj.id,title:msgObj.title}}}>
  {msgObj.title}
</Link>


{/* 注册路由 */}

{/* 声明接收params参数 */}
{/* <Route path="/home/message/detail/:id/:title" component={Detail}></Route> */}

{/* search参数无需声明接收，正常注册路由即可*/}
{/* <Route path="/home/message/detail" component={Detail}/> */}

{/* state参数无需声明接收，正常注册路由即可*/}
<Route path="/home/message/detail" component={Detail}/>
</div>


```



```jsx
//接收state参数
console.log(this.props);
//没有缓存，为了不让其报错，我们可以给一个空对象
const { id, title } = this.props.location.state || {};

const dataObj = data.find((obj) => {
  return obj.id === id;
}) || {};

return (
  <ul>
    <li>ID:{id}</li>
    <li>TITLE:{title}</li>
    <li>CONTENT:{dataObj.content}</li>
  </ul>
);
```





一个问题，由于用state参数的话，path不体现参数，那么我们刷新的话，state会丢吗？

**不会！**

因为我们用的是BrowserRouter，所以会操作一个history对象。

props属性有history属性和location属性，但是history属性里面还有一个同引用指向的location属性。

缓存如果清除了的话，就没有了！！！this.props.location.state就变成undifined的了。













# 11_浏览器history

history是一个栈

默认是push模式

replace模式需要自己开启



例如你现在想在第三级路由，message里开启replace模式

```jsx
<Link replace={true} to={{pathname:'/home/message/detail',state:{id:msgObj.id,title:msgObj.title}}}>
{msgObj.title}
</Link>

```



点击消息1就会replace /home/message -> /home/message/detail

点击消息2就会replace /home/message/detail -> /home/message/detail

点击消息3就会replace /home/message/detail -> /home/message/detail

此时再回退，会直接到/home/news

![replace_mode](/Users/dyq/Desktop/React路由/pics/replace_mode.png)



如果把所有的路由都开启replace模式

那么，你的路由跳转，一点痕迹都不会留下，浏览器左上角的 < 和 > 按钮都不会被激活













# 12_编程式路由导航

**编程事路由导航其实就是用路由组件的props.history里面的api来实现**

需求一：点图片跳转（这个还可以通过包裹Link标签或者NavLink实现）

需求二：3秒后自动跳转，这时候不需要你点击，怎么实现呢？

```jsx
import React, { Component } from "react";

export default class News extends Component {

  componentDidMount(){
    setTimeout(()=>{
      this.props.history.push('/home/message')
    },2000)
  }
  render() {
    return (
      <div>
        <ul>
          <li>news001</li>
          <li>news002</li>
          <li>news003</li>
        </ul>
      </div>
    );
  }
}
```





 借助this.prosp.history对象上的API对操作路由跳转、前进、后退

1. -this.prosp.history.push()
2.  -this.prosp.history.push()
3.  -this.prosp.history.replace()
4.   -this.prosp.history.goBack()
5.  -this.prosp.history.goForward()
6.   -this.prosp.history.go(int i) //直接可以实现goBack和goForward 

​                           



```jsx
  replaceShow = (id, title) => {
    //编写一段代码，让其实现跳转到Detail组件，且为replace跳转
    //即手动操作history对象

    //replace跳转+携带params参数
    // this.props.history.replace(`/home/message/detail/${id}/${title}`);

    //replace跳转+携带params参数
    // this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`);

    //replace跳转+携带state参数
    this.props.history.replace(`/home/message/detail`, { id, title });
  };

  //高阶的形式
  pushShow = (id, title) => {
    return () => {
      //push跳转+携带params参数
      // this.props.history.push(`/home/message/detail/${id}/${title}`);

      //push跳转+携带search参数
      // this.props.history.push(`/home/message/detail?id=${id}&title=${title}`);

      //push跳转+携带search参数
      console.log(this.props);
      this.props.history.push(`/home/message/detail`, { id, title });
    };
  };

  back =() => {
    this.props.history.goBack();
  }

  forward =() => {
    this.props.history.goForward();
  }

  go = () => {
    this.props.history.go(2);
    // this.props.history.go(-2);
  }

```

路由链接

```jsx
<button onClick={this.pushShow(msgObj.id, msgObj.title)}>
push查看
</button>
&nbsp;
<button
onClick={() => this.replaceShow(msgObj.id, msgObj.title)}
>
replace查看
</button>
```

注册路由

```jsx
{/* 声明接收params参数 */}
{/* <Route
path="/home/message/detail/:id/:title"
component={Detail}
></Route> */}

{/* search参数无需声明接收，正常注册路由即可*/}
{/* <Route path="/home/message/detail" component={Detail} /> */}

{/* state参数无需声明接收，正常注册路由即可*/}
<Route path="/home/message/detail" component={Detail}/>

<button onClick={this.back}>回退</button>
&nbsp;
<button onClick={this.forward}>前进</button>
&nbsp;
<button onClick={this.go}>go</button>
```







# 13_withRouter的使用

亲自写了标签使用的组件都是一般组件，vue不一样，vue不区分一般组件和路由组件

注意，只有路由组件的props里面才有history和location和match这些属性

**那么如何让一般组件也可以用路由组件的API的**

用一个withRouter的函数，注意她是小写的！！

withRouter的返回值是一个新组件！！！！！！



```jsx
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Header extends Component {
  //亲自写了标签使用的组件都是一般组件，vue不一样，vue不区分一般组件和路由组件
  //注意，只有路由组件的props里面才有history和location和match这些属性
  //那么如何让一般组件也可以用路由组件的API的
  //用一个withRouter的函数，注意她是小写的！！

  back = () => {
    this.props.history.goBack();
  };

  forward = () => {
    this.props.history.goForward();
  };

  go = () => {
    this.props.history.go(2);
  };

  render() {
    // console.log("header",this.props);
    return (
      <div className="page-header">
        <h2>React Router Demo</h2>
        <button onClick={this.back}>回退</button>
        &nbsp;
        <button onClick={this.forward}>前进</button>
        &nbsp;
        <button onClick={this.go}>go</button>
      </div>
    );
  }
}

//暴露的事withRouter加工过的一般组件-》就给该一般组件加上了路由组件的api
export default withRouter(Header);

```



14_BrowserRouter与HashRouter的区别



this.props.history是react对H5的histroy API的一个封装



1. 底层原理不一样：

   BrowserRouter使用的是H5的history API，不兼容IE9及以下版本。

   HashRouter使用的是URL的哈希值。

2. path表现形式不一样

   BrowserRouter的路径中没有#,例如：localhost:3000/demo/test

   HashRouter的路径包含#,例如：localhost:3000/#/demo/test

3. 刷新后对路由state参数的影响

    (1).BrowserRouter没有任何影响，因为state保存在history对象中。

    (2).HashRouter刷新后会导致路由state参数的丢失！！！（缓存问题）

   因为HashRouter不借助history对象！！！

4. 备注：HashRouter可以用于解决一些路径错误相关的问题。





锚点可以形成历史记录，但是#号后面的内容不会认为是资源请求

那么HashRouter更好喽？其实不是，你一般react或者vue项目要求的浏览器不会低于IE9的



# npm和yarn

你可以yarn start 也可以 npm start



## 忌讳 yarn add 和 npm i 混着用

这样可能会造成包的丢失



# 5_react-router-dom v5 v6

讲解路由哪里老师当时安装的版本是5.0版本，我们学习时下载的版本可能是6.0版本，6.0版本的写法和5.0的写法有些不同，效果可能和老师讲解的不一致，建议直接安装指定的版本 npm i react-router-dom@5.2.0 --save，这个坑我已经踩过了，望后面的小伙伴避免踩坑



## v6的路由注册

```html
<Routes>
<Route path="/about" element={<About />}></Route>
<Route path="/home" element={<Home />}></Route>
</Routes>
```



## v5的路由注册



```html
{/* component的c要小写 */}
<Route path="/about" component={About}></Route>
<Route path="/home" component={Home}></Route>
```







