import React from "react";
import ReactDOM from "react-dom";
import store from "./redux/store";

import { Provider } from "react-redux";
//provider会拿到store，哪个容器组件需要，他就给你递过去

import App from "./App";

ReactDOM.render(
  // 此处，需要用provider包裹app，目的是让app所有的后代容器组件都能接收到store
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// ReactDOM.render(<App/>,document.getElementById("root"))

// store.subscribe(() => {
//     ReactDOM.render(<App/>,document.getElementById("root"))
// })
