import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// 为什么下面要写StrictMode，这个和es5的严格模式无关
// 写了这个，可以给你检测一些代码的不太合理的东西，例如 ref="" 字符串类型的ref，它就会帮你警告
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // 这里会自动去public的index.html里面找root节点
  // 这两个文件的名字是不能动的，是react的底层实现的
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
