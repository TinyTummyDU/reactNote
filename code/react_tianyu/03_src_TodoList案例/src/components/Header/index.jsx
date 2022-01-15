import React, { Component } from 'react'
import PropTypes from 'prop-types'
//nanoid库用了分别暴露的形式，暴露了nanoid函数
import {nanoid} from 'nanoid'
import './index.css'

// console.log(nanoid());
export default class Header extends Component {

	//对接收的props进行：类型、必要性的限制
	static propTypes = {
		addTodo:PropTypes.func.isRequired
	}

	//键盘事件的回调,绑定事件的元素和你要操作的是同一个节点，就没必要用ref了
	handleKeyUp = (event)=>{
		//解构赋值获取keyCode,target，这个keyCode是原生js的一些东西
		//现在已经不推荐使用keyCode了，可以用key！='Enter'
		const {keyCode,target} = event
		//判断是否是回车按键
		if(keyCode !== 13) return
		//添加的todo名字不能为空
		if(target.value.trim() === ''){
			alert('输入不能为空')
			target.value = ''
			return
		}
		//准备好一个todo对象，准备传给父亲App
		//nanoid是 UUID库可以生成一个全世界唯一的标识，和雪花算法有点区别
		// UUID库太大了 npm i uuid，还有一个库叫nanoid, yarn add nanoid
		const todoObj = {id:nanoid(),name:target.value,done:false}
		//将todoObj传递给App，这个addTodo是个回调函数，通过props父亲传给孩子的（自组件逆传递给父亲）
		this.props.addTodo(todoObj)
		//清空输入
		target.value = ''
	}

	render() {
		return (
			<div className="todo-header">
				<input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认"/>
			</div>
		)
	}
}