import React, { Component } from "react";
import ReactDOM from "react-dom";

//类式组件
// class Demo extends Component {

//     state = {count:0}
//     add = () => {
//         this.setState(state => ({count:state.count+1}))
//     }

//     componentDidMount(){
//         //把定时器实例挂载到自身
//         this.timer = setInterval(()=>{
//             this.setState(state=>({count:state.count+1}))
//         },1000)
//     }

//     unmount = () => {
//         ReactDOM.unmountComponentAtNode(document.getElementById('root'))
//     }

//     componentWillUnmount(){
//         clearInterval(this.timer)
//     }

//     //第三种写法，ref容器
//     myRef = React.createRef()

//     show = () => {
//         alert(this.myRef.current.value)
//     }
//     render() {
//         return (
//             <div>
//                 <input type="text" ref={this.myRef}></input>
//                 <button onClick={this.show}>点我展示input内容</button>
//                 <h2>当前求和为{this.state.count}</h2>
//                 <button onClick={this.add}>点我+1</button>
//                 <button onClick={this.unmount}>点我卸载</button>
//             </div>
//         )
//     }
// }

//函数式组件
function Demo() {
  //数组的结构赋值(按照位数写就行)
  const [count, setCount] = React.useState(0);
  // console.log(count,setCount);

  function add() {
    //第一种setCount的方法
    // setCount(count + 1);
    //第二种setCount的写法
    setCount((count) => count + 1);
  }

  function unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("root"));
  }

  //可以接受两个参数
  React.useEffect(() => {
    let timer = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
    // useEffect的第一个参数的返回的那个函数就相当于componentWillUnmount
    return () => {
      clearInterval(timer);
    };
  }, []);

  const myRef = React.useRef();

  function show(){
    alert(myRef.current.value)
  }

  return (
    <div>
      <input type="text" ref={myRef}></input>
      <button onClick={show}>点我展示11input内容</button>
      <h2>当前求和为：{count}</h2>
      <button onClick={add}>点我+1</button>
      <button onClick={unmount}>点我卸载</button>
    </div>
  );
}

export default Demo;
