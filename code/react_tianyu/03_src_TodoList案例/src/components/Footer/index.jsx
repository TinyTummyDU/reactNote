import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {

	//全选checkbox的回调
	handleCheckAll = (event)=>{
		//全选或者全不够
		this.props.checkAllTodo(event.target.checked)
	}

	// 清除已完成任务的回调
	handleClearAllDone = ()=>{
		this.props.clearAllDone()
	}

	//下面这种不行，因为this是undefined ！！！！！！
	// handleClearAllDone(){
	// 	this.props.clearAllDone()
	// }



	render() {
		const {todos} = this.props
		//已完成的个数，我们要对数组做条件统计
		//pre是上一次的返回值，默认是你给的0，todo是遍历的每个元素（官网是current）
		// const doneCount = todos.reduce((pre,todo)=> return pre + (todo.done ? 1 : 0),0)
		const doneCount = todos.reduce((pre,todo)=> {return pre + (todo.done ? 1 : 0)},0)
		//总数
		const total = todos.length
		return (
			<div className="todo-footer">
				<label>
					{/* 全选亮有两种：1 自己点  2 全都勾上了 */}
					{/* defaultCheck只能使用一次，所以我们这里不用。 用checked则必须搭配onChange */}
					{/* 相等的同时，总数还不能等于0，要不然你全删了，结果全选还是亮着的 */}
					<input type="checkbox" onChange={this.handleCheckAll} checked={doneCount === total && total !== 0 ? true : false}/>
				</label>
				<span>
					<span>已完成{doneCount}</span> / 全部{total}
				</span>
				<button onClick={this.handleClearAllDone} className="btn btn-danger">清除已完成任务</button>
			</div>
		)
	}
}
