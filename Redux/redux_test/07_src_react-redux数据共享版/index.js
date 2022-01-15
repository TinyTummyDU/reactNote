import React from "react";
import ReactDOM from "react-dom";
import store from "./redux/store";

import { Provider } from "react-redux";
//provider会拿到store，哪个容器组件需要，他就给你递过去

import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// ReactDOM.render(<App/>,document.getElementById("root"))

// store.subscribe(() => {
//     ReactDOM.render(<App/>,document.getElementById("root"))
// })
