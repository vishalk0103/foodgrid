import "./App.css";
import React, { Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "../node_modules/bootstrap/dist/js/bootstrap.esm.js";
import Spinner from "./components/shared/Spinner";

import Home from "./pages/Home.js";
import Restaurants from "./pages/Restaurants";

import GiftCard from "./pages/user/GiftCard";

import Foods from "./pages/Foods";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/user/Account";
import Favorite from "./pages/user/Favorite";
import Payment from "./pages/user/Payment";
import OrderHistory from "./pages/user/Order-History";

function App() {
  
  const user = JSON.parse(localStorage.getItem("user"));

  let routes;
  if (user.isLoggedIn) {
    routes = (
      <React.Fragment>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/:userId/profile/account">
          <Account />
        </Route>
        <Route path="/:userId/profile/orders">
          <OrderHistory />
        </Route>
        <Route path="/:userId/profile/favorites">
          <Favorite />
        </Route>
        <Route path="/:userId/profile/payments">
          <Payment />
        </Route>
        <Route path="/:location/restaurants" exact>
          <Restaurants />
        </Route>
        <Route path="/giftcard" exact>
          <GiftCard />
        </Route>
        <Route path="/:location/restaurants/:restId" exact>
          <Foods />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Redirect to="/" />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/:location/restaurants" exact>
          <Restaurants />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/:location/restaurants/:restId" exact>
          <Foods />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Redirect to="/" />
      </React.Fragment>
    );
  }
  return (
    <div className="App ">
      <Switch>
        <Suspense
          fallback={
            <div className="center">
              <Spinner />
            </div>
          }
        >
          {routes}
        </Suspense>
      </Switch>
    </div>
  );
}

export default App;
