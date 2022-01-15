import React, { Component } from "react";
import { nanoid } from "nanoid";
import { connect } from "react-redux";
import { createAddPersonAction } from "../../redux/actions/person";


class Person extends Component {
  addPerson = () => {
    const name = this.nameNode.value;
    const age = this.ageNode.value*1;
    const personObj = {id: nanoid(), name,age}
    this.props.jiayiren(personObj)
    this.nameNode.value = ''
    this.ageNode.value = ''

  };
  render() {
    return (
      <div>
        <h1>我是Person组件,上方组件求和为{this.props.count}</h1>

        <input
          ref={(c) => (this.nameNode = c)}
          type="text"
          placeholder="输入名字"
        />
        <input
          ref={(c) => (this.ageNode = c)}
          type="text"
          placeholder="输入名字"
        />
        <button onClick={this.addPerson}>添加</button>

        <ul>
         {this.props.persons.map((p) => {
             return <li key={p.id}>{p.name}--{p.age}</li>
         })}
        </ul>
      </div>
    );
  }
}


export default connect(
    //总状态在store里面表明了，那么这里也要相应修改
    state => ({
      persons:state.persons,
      count:state.count}),  //映射状态
    {jiayiren: createAddPersonAction} //映射操作状态的犯法
)(Person)