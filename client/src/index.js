import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./components/store/Index";

if (!localStorage.getItem("user")) {
  let data = {
    token: null,
    username: null,
    email: null,
    userId: null,
    isLoggedIn: false,
  };
  localStorage.setItem("user", JSON.stringify(data));
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
