import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

import Home from "./pages/Home.js";
import Restaurants from "./pages/Restaurants";
import Foods from "./pages/Foods";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/user/Account";
import Favorite from "./pages/user/Favorite";
import Profile from "./pages/user/Profile";
import Payment from "./pages/user/Payment";
import OrderHistory from "./pages/user/Order-History";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { AuthActions } from "./components/store/Auth-slice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  // useEffect(() => {
  //   let logoutTimer;
  //   if (user.token && user.expiration) {
  //     const remainingTime = user.expiration - new Date().getTime();
  //     logoutTimer = setTimeout(dispatch(AuthActions.logout()), remainingTime);
  //     let time = new Date().getTime() + 1000 * 60 * 60;
  //     console.log(time - new Date().getTime());
  //   } else {
  //     clearTimeout(logoutTimer);
  //   }
  // }, [user.token, user.expiration]);

  let routes;
  if (user.token) {
    routes = (
      <>
        <Route path="/" element={<Home />} />
        <Route path=":location/restaurants" element={<Restaurants />} />
        <Route path="/:location/restaurants/:restId" element={<Foods />} />
        <Route path="checkout" element={<Checkout />} />

        <Route path="/:userId/profile" element={<Profile />}>
          <Route path="account" element={<Account />} />
          <Route path="orders" element={<OrderHistory />} />
          <Route path="favorites" element={<Favorite />} />
          <Route path="payments" element={<Payment />} />
        </Route>
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<Home />} />
        <Route path=":location/restaurants" element={<Restaurants />} />
        <Route path="/:location/restaurants/:restId" element={<Foods />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </>
    );
  }
  return (
    <div className="App ">
      <Routes>{routes}</Routes>
    </div>
  );
}

export default App;
