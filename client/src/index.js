import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./components/store/Index";

ReactDOM.render(
  <Router>
    <Provider store={Store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
