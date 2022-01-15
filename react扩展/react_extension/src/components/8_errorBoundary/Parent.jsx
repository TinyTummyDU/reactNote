import React, { Component } from 'react'
import Child from './Child'
export default class Parent extends Component {

    //如果state的值任何时候都取决于取决于props就用这个钩子
    // static getDerivedStateFromProps(){
    // }

    state = {hasError:''} //用于标识子组件是否有错误

    //如果Parent的子组件出现错误，就会调用这个钩子
    //并且会携带错误信息
    static getDerivedStateFromError(error){
        // 过了一会还是会出问题，这是为什么，因为这个错误边界不使用于开发环境，只适用于生产环境。
        console.log('@@@',error);
        return {hasError:error}
    }

    //做的更好
    //一般在这个钩子里面统计错误次数，反馈给服务器，用于通知编码人员进行bug的解决
    componentDidCatch(){
        console.log('渲染组件时出错');
    }

    render() {
        return (
            <div>
                <h2>我是Parent组件</h2>
                {this.state.hasError? <h2>当前网络不稳定</h2> : <Child/>}
            </div>
        )
    }
}
