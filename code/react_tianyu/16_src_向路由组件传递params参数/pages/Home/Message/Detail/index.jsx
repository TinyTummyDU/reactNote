import React, { Component } from "react";

const data = [
    {id:'01',content:'你好中国'},
    {id:'02',content:'爱你哦'},
    {id:'03',content:'未来的自己'}
]
export default class Detail extends Component {
  render() {

    console.log(this.props);
    const {id,title} = this.props.match.params
    const dataObj = data.find((obj) => {
        return obj.id === id;
    })
    return (
      <ul>
        <li>ID:{id}</li>
        <li>TITLE:{title}</li>
        <li>CONTENT:{dataObj.content}</li>
        
      </ul>
    );
  }
}
