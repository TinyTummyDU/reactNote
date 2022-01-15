import React, { Component } from "react";
import "./index.css";
export default class List extends Component {
  render() {
    const { users, isFirst, isLoading, err } = this.props;

    return (
      <div className="row">
        {
          //这里只能写jsx expression 不能写 statement
          isFirst ? (
            <h2> 欢迎使用，输入关键字，然后点击搜索 </h2>
          ) : isLoading ? (
            <h2>loading...</h2>
          ) : err ? (
            <h2 style={{ color: "red" }}>{err}</h2>
          ) : (
            users.map((userObj) => {
              return (
                <div key={userObj.id} className="card">
                  {/* target="_blank" rel="noreferrer 要一块使用*/}
                  <a href={userObj.html_url} target="_blank" rel="noreferrer">
                    {/* alt是img战士不出来的话，展示的文字 ，image,photo,picture都是不允许在alt里面用的关键字*/}
                    <img
                      alt="head_portrait"
                      src={userObj.avatar_url}
                      style={{ width: "100px" }}
                    />
                  </a>
                  <p className="card-text">{userObj.login}</p>
                </div>
              );
            })
          )
        }
      </div>
    );
  }
}
