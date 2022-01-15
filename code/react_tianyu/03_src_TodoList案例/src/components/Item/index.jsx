import React, { Component } from 'react'
import './index.css'
import PropTypes from 'prop-types'

export default class Item extends Component {

	//标识鼠标移入、移出
	//一上来是false
	state = {mouse:false} 

	//鼠标移入、移出的回调
	//如果事件绑定的函数你后面加了小括号，代表直接调用，那么这个时候，你就要加一个函数闭包（柯里化）
	handleMouse = (flag)=>{
		return ()=>{
			this.setState({mouse:flag})
		}
	}

	//勾选、取消勾选某一个todo的回调
	//这里必须要拿到id
	//用高阶函数，柯里化，高阶函数就是该函数返回的还是函数
	handleCheck = (id)=>{
		return (event)=>{
			// 这是后是checkbox的input标签type，这时候不能用原生value了，要用原生的checked属性
			//当你勾选以后，需要更改App里面的todos的数据，那么item和App的通信其实就是孙子和爷爷的通信，一样的还是使用props传回调函数
			this.props.updateTodo(id,event.target.checked)

		}
	}

	//删除一个todo的回调
	//这里必须要拿到id
	//不一定非要和handleCheck一样写高阶
	handleDelete = (id)=>{
		console.log(this);
		if(window.confirm('确定删除吗？')){
			this.props.deleteTodo(id)
		}
	}
	//这样也可以，因为handleDelete是通过this调用的，在render里
	// handleDelete(id){
	// 	console.log(this);
	// 	if(window.confirm('确定删除吗？')){
	// 		this.props.deleteTodo(id)
	// 	}
	// }


	static propTypes = {
		// todos:PropTypes.array.isRequired,
		updateTodo:PropTypes.func.isRequired,
		deleteTodo:PropTypes.func.isRequired,
	}

	render() {
		const {id,name,done} = this.props
		const {mouse} = this.state
		return (
			//为什么不用css的hover，而是要用onMouseEnter和onMouseLeave，因为方便删除操作
			//鼠标移入移出，我们要高亮，这里用了三元表达式
			<li style={{backgroundColor:mouse ? '#ddd' : 'white'}} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
				<label>
					{/* defaultChecked */}
					<input type="checkbox" checked={done} onChange={this.handleCheck(id)}/>
					<span>{name}</span>
				</label>
				{/* 鼠标进来，删除按钮再出现 */}
				{/* <button onClick={()=> this.handleDelete(id) } className="btn btn-danger" style={{display:mouse?'block':'none'}}>删除</button> */}
				<button onClick={()=> this.handleDelete(id)} className="btn btn-danger" style={{display:mouse?'block':'none'}}>删除</button>
			
			</li>
		)
	}
}