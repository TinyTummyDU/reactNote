//入口文件引入react核心库
import React from 'react'
//引入ReactDOM 
import ReactDOM from 'react-dom'
//引入App组件, .js可省略，.css不可省略
import App from './App'

//渲染App到页面
ReactDOM.render(<App/>,document.getElementById("root"))