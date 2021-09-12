import "./App.css";
import React, { useCallback,Suspense, useState, useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "../node_modules/bootstrap/dist/js/bootstrap.esm.js";
import Favorite from "./components/users/pages/Favorite";
import Payment from "./components/users/pages/Payment";
import OrderHistory from "./components/users/pages/Order-History";
import { AuthContext } from "./components/store/Auth-context";
import UserContext from "./components/store/User-context";
import LocationContext from "./components/store/Location-context";
import {sendCartData ,fetchCartData } from './components/store/cart-actions'
import Spinner from './components/shared/components/UIElement/Spinner'


const Home= React.lazy(()=> import('./components/home/pages/Home.js'))
const Restaurants = React.lazy(()=>import("./components/restaurants/pages/Restaurants"))
const Profile = React.lazy(()=>import("./components/users/pages/Profile"))
const GiftCard = React.lazy(()=>import("./components/users/pages/GiftCard"))
const Foods = React.lazy(()=>import("./components/foods/page/Foods"))
const Checkout = React.lazy(()=>import("./components/checkout/Checkout"))
const Login = React.lazy(()=>import("./components/auth/Login"))
const Account = React.lazy(()=>import("./components/users/pages/Account"))
const Signup = React.lazy(()=>import("./components/auth/Signup"))

let isInitial = true;
let logoutTimer;
function App() {
  const dispatch = useDispatch()
  const cart= useDispatch(state =>state.cart )
  const [token, setToken] = useState(false);
  const [location, setLocation] = useState([]);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState();
  // const [isLoggedIn, setIsloggedIn] = useState(false);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);
  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
  const sendRequest = async () => {
        const response = await fetch(
          process.env.REACT_APP_BACKEND+`/user/${uid}/profile`
        );
        const responseData = await response.json();
        setUsername(responseData.username);
        setEmail(responseData.email);
  }
  sendRequest()
    const tokenExpirationDate =expirationDate || new Date(new Date().getTime() + 3000 * 60*60 *24 *7);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    // setIsloggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);
  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/:userId/profile" exact>
          <Profile />
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
        <Redirect to='/'/>
      
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
        <Route path="/login" exact >
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
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <LocationContext.Provider value={{ location, setLocation }}>
        <UserContext.Provider
          value={{ username, setUsername, email, setEmail }}
        >
          <div className="App ">
            <Switch><Suspense fallback={<div className='center'><Spinner/></div>}>{routes}</Suspense></Switch>
          </div>
        </UserContext.Provider>
      </LocationContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
