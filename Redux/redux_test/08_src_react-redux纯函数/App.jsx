import React, { Component } from 'react'
//人家是默认暴露
import Count from './containers/Count'
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
