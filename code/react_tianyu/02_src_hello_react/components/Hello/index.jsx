import React,{Component} from 'react'
//此时所有关于Hello的样式就保存在hello这个对象里面了
import hello from "./index.module.css"

//方式1: Hello大写，可以让你区分组件和非组件的js
//方式2: 对于组件的js，不要js，写jsx
export default class Hello extends Component{
        render(){
            return(
                <div className={hello.title}>Hello React！！！</div>
            )
        }
}