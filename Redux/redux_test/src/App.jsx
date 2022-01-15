import React, { Component } from 'react'
//人家是默认暴露

//引入的是Count的容器组件
import Count from './containers/Count'
//引入的是Person的容器组件
import Person from './containers/Person'

export default class App extends Component {
    render() {
        return (
            <div>
                <Count />
                <hr></hr>
                <Person/>
            </div>
        )
    }
}
