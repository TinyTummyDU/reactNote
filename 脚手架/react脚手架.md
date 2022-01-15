# react脚手架文件目录

## public文件夹

### 偏爱图标

favicon.ico 

别用.jpg

### index.html

整个项目永远只有一个html，功能都是新的组件

所以vue和react都是SPA应用：single，page，app

### robots.txt

爬虫规则文件





## src文件目录

### App.js

定一个一个组件

为什么叫App呢，为什么不叫demo呢？

以后我们只会把一个组件（APP）放到 root 这个容器里

你如果写其他的组件，就要放在App这个组件里

引入logo图片，webpack，一切皆模块，所以logo图片也可以这样引入

### App.css

该组件的样式文件

### App.test.js

这个我们也几乎不用

### index.css

通用性的样式

### index.js

入口文件 webpack

入口文件里面引入react核心库

引入组件

引入样式

把App组件给他render了

reportWebVitals 是 *用于记录页面的性能的

### logo.svg

就是你看见react首页一直转的那个图

### reportWebVitals

这个需要自己好好配的，里面用了web-vitals的库

### setupTests.js

用一个第三方库jest-dom来实现







# React脚手架的server

## 端口

3000

## 依赖的是

webpack-dev-serveer





# react插件1 ES7 React/Redux/React-Native/JS snippets

不需要自己写全局snippet了，在vscode里面。

## rcc

## rfc

## ...





# 组件间通信

## 状态在哪里，操作状态的方法就在哪里 （App存state和方法）

比如我们的脚手架03例子里面，状态和操作方法都在App.js里面

### 父亲->孩子

通过props

### 孩子->父亲

父亲给孩子通过props传递一个回调函数，孩子通过这个回调给父亲数据

### 孙子->爷爷

Item和App的通信其实就是孙子和爷爷的通信，一样的还是使用props传回调函数
和孩子传父亲是一样的，只不过是嵌套

## 消息订阅与发布--》机制 （App变成真正的壳子）

例子：订阅报纸



1：交钱，说好地址，订阅哪一种地址

2：邮递员送报纸

订阅消息：

1：消息名

2：发布消息



有很多库实现这种机制，我们用一个比较主流的PubSubJS (publish subscribe js)

```js
import PubSub from 'pubsub-js'

// or when using CommonJS
const PubSub = require('pubsub-js');
```

在需要接受数据的组件里去订阅消息：

```js
var token = PubSub.subscribe('MY TOPIC', mySubscriber);

这个token就是你每一次订阅都会得到的token，当你不像订阅的时候，你可以取消订阅
// unsubscribe this subscriber from this topic
PubSub.unsubscribe(token);
```

订阅的消息是'MY TOPIC',当你接受到这个消息的时候，别人就会帮你调mySubscriber这个你写的回调

```js
// create a function to subscribe to topics
B->A，大多数情况下，B发布消息msg的时候也会带data
var mySubscriber = function (msg, data) {
    console.log( msg, data );
};
```

B如何发布消息呢

```js
// publish a topic asynchronously
PubSub.publish('MY TOPIC', 'hello world!');
```







# Ajax XHR JQuery Axios Fetch

原始的

```
xhr 发请求
const xhr = new XMLHttpRequest()
要写.open .send

jQueery 发请求
xhr没有很好的封装
JQuery有一些封装，比如$.send
但是有一个问题，就是可能会产生回调地狱

axios
可以解决回调地狱，因为他是promise风格的

jquery和axios都需要下载且引用
jquery 和 axios都是对xhr的封装，发起Ajax请求
但是服务器端的axios不是对xhr的封装，它封装的是http

```

## fetch

fetch本身也是promise风格的，可以解决回调地狱。但是其实没有那么好用，真实项目用的不是那么多

有一个不需要下载也能实现发Ajax请求，且不用xhr，window上内置就有

fetch 和 xhr是并列的

https://github.github.io/fetch/ fetch官方文档

https://segmentfault.com/a/1190000003810652 原谅我做一次标题党，Ajax 不会死，传统 Ajax 指的是 XMLHttpRequest（XHR），~~未来~~现在已被 [Fetch](https://link.segmentfault.com/?enc=z5MP7vc5%2FvKASzxLsZf%2B6g%3D%3D.h1eP0ioii%2FVwWGRJtq8ow5m4tLrk69XnSiZTGa2HVeE%3D) 替代。

最近把阿里一个千万级 PV 的数据产品全部由 jQuery 的 `$.ajax` 迁移到 `Fetch`，上线一个多月以来运行非常稳定。结果证明，对于 IE8+ 以上浏览器，在生产环境使用 Fetch 是可行的。

**由于 Fetch API 是基于 Promise 设计，有必要先学习一下 Promise**，推荐阅读 [MDN Promise 教程](https://link.segmentfault.com/?enc=kEqtuCqcoGtMWq%2BYAWZSEQ%3D%3D.nDxo0Ql%2Fq6qW4vcY%2FhPYJOW%2B3LJ45YvNFyWQEy%2BXs97YH1Guwq%2B7JmOJcAY%2BoO%2FLq7cdnwHv85eKhXUqT1bTxST3fPtdk76P6k8xqfqLsAf3%2F6oBoiWcAzhumAb5AgWB)。旧浏览器不支持 Promise，需要使用 polyfill [es6-promise](https://link.segmentfault.com/?enc=dwcPxJygQG18PWEdjdLj0A%3D%3D.tkJOyO3ZktLCehAvh9kSSuCLueke9xML%2BRArUAB3Qe1rTZ1%2FpcngscRLgl5UNkT4) 。

### Why Fetch，Separation of Concerns

XMLHttpRequest 是一个设计粗糙的 API，不符合**关注分离（Separation of Concerns）**的原则，配置和调用方式非常混乱，而且基于事件的异步模型写起来也没有现代的 Promise，generator/yield，async/await 友好。



### Fetch的使用率其实不高，因为有些浏览器兼容性不行！！！



### 例子（fetch了解即可）：

```js
//#region 发送网络请求--使用axios发送
    // axios.get(`api1/search/users?q=${keyWord}`).then(
    //   (response) => {
    //     //请求成功通知List更新状态
    //     // this.props.updateAppState({
    //     //   isLoading: false,
    //     //   users: response.data.items,
    //     // });
    //     PubSub.publish("atguigu", { users: response.data.items ,isLoading: false });
    //   },
    //   (error) => {
    //     //请求失败通知List更新状态
    //     // this.props.updateAppState({
    //     //   isLoading: false,
    //     // //  不能存error对象，这样的话直接页面就会爆（比如，页面就会直接展示404的全部内容），你要存错误对象的一个属性
    //     //   err:error.message
    //     // });
    //     PubSub.publish("atguigu", { err:error.message, isLoading: false});
    //   }
    // );
    //#endregion

    //#region 发送网络请求--使用fetch发送(未优化)
    // fetch(`api1/search/users2?q=${keyWord}`)
    //   .then(
    //     //fetch的关注分离设计思想
    //     //tmd,404也是联系服务器成功了，虽然路径有问题
    //     // response=>{console.log('联系服务器成功了',response.json());},
    //     //如何获得状态了，response.json会返回一个promise，联系成功，promise是成功并且保存数据，联系失败，promise是失败并且保存原因
    //     (response) => {
    //       console.log("联系服务器成功了");
    //       // console.log(response.json());
    //       return response.json();
    //     },
    //     // 整个浏览器离线，就可以失败
    //     (error) => {
    //       console.log("联系服务器失败了", error);
    //       return new Promise(); //中断promise链，pending，下面的then走但是什么都不进
    //     }
    //   )
    //   .then(
    //     (response) => {
    //       console.log("获取数据成功", response);
    //     },
    //     (error) => {
    //       console.log("获取数据失败", error);
    //     }
    //   );
    //#endregion

    //所谓的separation of concerns其实就是不一下子给你data，response.json()
    //发送网络请求--使用fetch发送(优化),异常穿透统一处理，并且使用await和async代替then
    //await只能等到成功的结果，要想处理失败，就加try catch
    try {
      const response = await fetch(`api1/search/users2?q=${keyWord}`);
      const data = await response.json();
      // console.log(data);
      PubSub.publish("atguigu", { users: data.items, isLoading: false });
    } catch (error) {
      console.log("请求出错", error);
      PubSub.publish("atguigu", { err: error.message, isLoading: false });
    }
```



# 回调地狱

 回调函数：

​        把一个函数当作参数传递，传递的是函数的定义并不会立即执行，而是在将来特定的时机再去调用，这个函数就叫做回调函数。

​        注意：回调函数不会阻塞主线程代码的执行。比如下图控制台打印：

![img](https://img-blog.csdnimg.cn/20201130205959803.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyODA1NTY5,size_16,color_FFFFFF,t_70)

 为什么要用到回调函数：

​       在定时器setTimeout以及Ajax的请求时都会用到回调函数。

​      1.特定场景需求下，我们用定时器控制一个函数在指定时间后才会触发；

​      2.在发送Ajax中，客户端和服务器之间的请求和响应都是需要时间的，而我们要拿响应回来的数据就必须等响应完成，这些都是回调函数的常用场景。

 为什么要用到回调函数的嵌套：


​         ![img](https://img-blog.csdnimg.cn/20201130205019585.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyODA1NTY5,size_16,color_FFFFFF,t_70)

如图所示，我们想按照书写顺序分别读取三个文档的内容，虽然顺序是a.txt ···>  b.txt ··· >  ···c.txt，但是结果却不是预期中的那样显示，这是因为读取文件都是异步函数，互不影响，

就跟百米冲刺一样，谁先到终点都是不确定的，为了达到文档读取顺序为：a、b、c，我们就必须让百米赛跑变成接力赛，拿到上个同学的接力棒，下个同学才能上赛场。

代码演示如下：

![img](https://img-blog.csdnimg.cn/20201130211008468.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyODA1NTY5,size_16,color_FFFFFF,t_70)

   经过测试，每次打印结果都是 a、b、c文件的内容，然后如图所示，**回调函数一层套一层，就逐步形成了“回调地狱”，回调地狱虽然将异步函数的执行顺序变为同步。但是这样的代码阅读性非常不好，可维护性也很差。**



# Promise风格









# 分别暴露，统一暴露，默认暴露





# 箭头函数

## 快捷键

an+tab 





# 04_代理服务器

## node+express 

node server1.js

http://localhost:5001/students

浏览器默认的就是get请求



# 跨域

本质是 同源策略的限制

Access-Control-Allow-Origin

例如你 localhost:3000要给localhost:5000，axios引擎发现：哥们你从3000去5000啊，行你去吧，但是回来的数据就不行了。

发是能发的，但是回不来的

解决方法：

代理（找一个中间人）：

中间人是开在3000端口的，有一个很小的代理服务器。你的3000->给3000的小代理服务器发->5000，回也可以回来。因为3000的小代理服务器没有你axios引擎（同源策略不限制它）

![image-20211211171645068](/Users/dyq/Library/Application Support/typora-user-images/image-20211211171645068.png)

如何开启这个代理呢：

两种方法

（1）单独配置跨域

3000的package.json中加一句：  "proxy":"http://localhost:5000" （package.json改了就要重起脚手架yarn start ）

所有发给3000的请求就会发给5000。

然后axios也改成axios.get('http://localhost:3000/students').then(

**要注意的是：这时候你就是axios.get('http://localhost:3000/index.html').then( **

**也可以回来数据，public这个文件夹是脚手架server给你的根路径，这个资源3000有，代理就不会转发给5000发，比如index2.html，这个3000没有的话，代理就会转发给5000**

**所以代理只会去转发请求你本身没有的资源的请求**

（2）配置多个代理（setupProxy.js)

你要给多个服务器发请求例如3000要给5001和5002

配置多个，就不能在package.json里面操作了。

需要刷新脚手架，因为你改了setupProxy.js



# 后端可以通过cors解决跨域！一劳永逸，github自己用cors解决了跨域

此方法加上响应头以后，所有的网站就可以访问你了

但是，鲜有网站这样写，因为不安全

# react脚手架配置代理总结



## 方法一

> 在package.json中追加如下配置

```json
"proxy":"http://localhost:5000"
```

说明：

1. 优点：配置简单，前端请求资源时可以不加任何前缀。
2. 缺点：不能配置多个代理。
3. 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配前端资源）



## 方法二

1. 第一步：创建代理配置文件

   ```
   在src下创建配置文件：src/setupProxy.js
   ```

2. 编写setupProxy.js配置具体代理规则：

   ```js
   const proxy = require('http-proxy-middleware')
   
   module.exports = function(app) {
     app.use(
       proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
         target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
         changeOrigin: true, //控制服务器接收到的请求头中host字段的值
         /*
         	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
         	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
         	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
         */
         pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
       }),
       proxy('/api2', { 
         target: 'http://localhost:5001',
         changeOrigin: true,
         pathRewrite: {'^/api2': ''}
       })
     )
   }
   ```

说明：

1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
2. 缺点：配置繁琐，前端请求资源时必须加前缀。

# Javascript

## unshift

## push

## key和keyCode