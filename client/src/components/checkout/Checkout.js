import React from "react";
import style from "./Cart.module.css";
import { Container, Row, Col } from "react-bootstrap";
import NavBarNew from "../shared/components/UIElement/NavbarNew";
import Footer from "../home/components/footer";
import Address from "./Address";
import Cart from '../foods/components/Cart'
import {useSelector } from 'react-redux'
import EmptyCart from "../cart/EmptyCart";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <React.Fragment>
      <div className={style.checkouts}>
      <NavBarNew />
      <div className={`${style.container} container mt-5`}>
        <div className={`row offset-md-2 ${style.checkout}`}>
          <div className={`col-md-5  ${style.address}`}>
            <Address />
          </div>
          <div class="col-md-6">
           {cartItems.length >0 && <Cart/> }
           {cartItems.length ===0 && <EmptyCart/>}

          </div>
        </div>
      </div>
      <div className={style["cart--footer"]}>
        <Footer />
      </div>
      </div>
    </React.Fragment>
  );
};

export default Checkout;
