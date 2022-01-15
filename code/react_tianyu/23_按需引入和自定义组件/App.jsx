import React, { Component } from "react";
import { Button, DatePicker } from "antd";
//样式其实还是需要你自己引入，css需要写后缀，react里面只有js和jsx可以省略

//比如图标太大了，antd的子库就独立出来了
import { WechatOutlined, SearchOutlined } from "@ant-design/icons";


//这样会把所有组件的所有样式都引进来，这样不太好，因为文件很大
//import "antd/dist/antd.css";

//按需引入样式






// function onChange(date, dateString) {
//   console.log(date, dateString);
// }

export default class App extends Component {

  onChange = (date, dateString) => {
    console.log(date,dateString);
  }


  render() {
    return (
      <div>
        App....
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="link">Link Button</Button>
        <Button type="primary" icon={<SearchOutlined />}>
          Search
        </Button>
        <WechatOutlined />
        <DatePicker onChange={this.onChange} />
      </div>
    );
  }
}
