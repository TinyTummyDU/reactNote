import React, { Component } from 'react'
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import './App.css'

export default class App extends Component {
	//状态在哪里，操作状态的方法就在哪里

	//初始化状态
	state = {todos:[
		{id:'001',name:'吃饭',done:true},
		{id:'002',name:'睡觉',done:true},
		{id:'003',name:'打代码',done:false},
		{id:'004',name:'逛街',done:false}
	]}

	//addTodo用于添加一个todo，接收的参数是todo对象，该回调通过props父亲传给孩子
	//这种儿子向父亲发信息的方式，其实关键理解的地方，还是this指向
	addTodo = (todoObj)=>{
		//获取原todos
		const {todos} = this.state
		//追加一个todo
		const newTodos = [todoObj,...todos]
		// todos.unshift(todoObj) //不能用unshift，因为这样还是触犯了setState的必要性
		//更新状态，回调用App的render，然后又回引发自组件的重新渲染
		this.setState({todos:newTodos})
	}

	//updateTodo用于更新一个todo对象
	updateTodo = (id,done)=>{
		//获取状态中的todos
		const {todos} = this.state
		//匹配处理数据
		const newTodos = todos.map((todoObj)=>{
			// 替换操作（先拷贝展开整体，再覆盖）
			// if(todoObj.id === id) return {...todoObj,done:done}
			//下面这行是上面这行的简写方式
			if(todoObj.id === id) return {...todoObj,done}
			else return todoObj
		})
		this.setState({todos:newTodos})
	}

	//deleteTodo用于删除一个todo对象
	deleteTodo = (id)=>{
		//获取原来的todos
		const {todos} = this.state
		//删除指定id的todo对象
		const newTodos = todos.filter((todoObj)=>{
			return todoObj.id !== id
		})
		//更新状态
		this.setState({todos:newTodos})
	}

	//checkAllTodo用于全选
	checkAllTodo = (done)=>{
		//获取原来的todos
		const {todos} = this.state
		//加工数据
		const newTodos = todos.map((todoObj)=>{
			return {...todoObj,done}
		})
		//更新状态
		this.setState({todos:newTodos})
	}

	//clearAllDone用于清除所有已完成的
	clearAllDone = ()=>{
		//获取原来的todos
		const {todos} = this.state
		//过滤数据
		const newTodos = todos.filter((todoObj)=>{
			// 整体为true的留下，false的过滤掉
			return !todoObj.done
		})
		//更新状态
		this.setState({todos:newTodos})
	}

	render() {
		const {todos} = this.state
		return (
			<div className="todo-container">
				<div className="todo-wrap">
					<Header addTodo={this.addTodo}/>
                    {/* 父亲把todos通过props传给儿子 List */}
					<List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/>
					<Footer todos={todos} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone}/>
				</div>
			</div>
		)
	}
}
