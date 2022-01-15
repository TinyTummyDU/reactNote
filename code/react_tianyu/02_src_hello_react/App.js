//创建“外壳”组件App
//es6 的一种引入方式，不是解构赋值，可以引入分别暴露和默认暴露的东西，下面这一行证明react.js里面有多种暴露方法
import React,{Component} from 'react'
// const {Component} = React

// 有的公司干脆就Hello和Welcome里面的文件都叫index，比如index.css和index.jsx
// 这种情况下就文件名都不用写，直接写到文件夹就行，但是这种写法有个缺点，就是文件同时打开容易搞混
import Hello from './components/Hello'
import Welcome from './components/Welcome'


// //react脚手架里面 有两个人都可以不写后缀 js和jsx
// import Hello from './components/Hello'
// import Welcome from './components/Welcome'


//创建并且暴露App组件，不用下面单独写一行暴露语句
export default class App extends Component{
    render(){
        return(
            <div>
                <Hello/>
                <Welcome/>
            </div>
        )
    }
}

//一般用默认暴露，你也可以分别暴露
// export default App;