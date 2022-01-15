import React, { Component } from "react";
// import qs from 'querystring'

// const qs = require('query-string')

const data = [
  { id: "01", content: "你好中国" },
  { id: "02", content: "爱你哦" },
  { id: "03", content: "未来的自己" },
];
export default class Detail extends Component {
  render() {
    // console.log(this.props);

    // 接收params参数
    // const {id,title} = this.props.match.params

    //接收search参数，search没帮你像是params一样在match里面整合为对象，你需要自己做（字符串分割），或者借助一个库（react已经有了，querystring）
    // let obj = {name:'tom',age:18}
    // name=tom&age=18
    //这种编码形式叫做urlencoded编码
    //用querystring库可以帮你，和json的方法有点像
    //qs.stringify(obj)
    //let obj1 = qs.parse(str)
    // const {search} = this.props.location
    // const {id,title} = qs.parse(search.slice(1))

    //接收state参数
    // console.log(this.props);
    //没有缓存，为了不让其报错，我们可以给一个空对象
    const { id, title } = this.props.location.state || {};

    const dataObj = data.find((obj) => {
      return obj.id === id;
    }) || {};

    return (
      <ul>
        <li>ID:{id}</li>
        <li>TITLE:{title}</li>
        <li>CONTENT:{dataObj.content}</li>
      </ul>
    );
  }
}
