import React, { Component } from 'react'
//人家是默认暴露
import Count from './containers/Count'

export default class App extends Component {
    render() {
        return (
            <div>
                {/* 给容器组件传递store */}
                <Count/>
            </div>
        )
    }
}
