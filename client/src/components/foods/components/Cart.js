import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/Cart-context";
import { Card, ListGroup } from "react-bootstrap";
import style from "./Cart.module.css";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import EmptyCart from "../../cart/EmptyCart";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);



  return (
    <React.Fragment>
      {
        <Card className={`shadow ${style.cart}`} style={{ width: "27rem" }}>
          <Card.Body className="px-0">
            <Card.Title className="ms-2">
              <h3>Cart</h3>
              {/* {cartItems.length} Items */}
            </Card.Title>
          </Card.Body>
          <ListGroup className={`list-group-flush ${style["cart--items"]}`}>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                amount={item.quantity}
                totalPrice={item.totalPrice}
                price={item.price}
                image={item.image}

              />
            ))}
          </ListGroup>
          <Card.Body
            className={`py-0 pt-4 d-flex justify-content-between ${style["cart-total"]}`}
          >
            <p>
              <b>Food & Beverage Total</b>
            </p>
            <p>
              <b>
                <span>Rs. </span>
                {totalPrice}
              </b>
            </p>
          </Card.Body>
          <Card.Body className="p-0">
              {props.content}
          </Card.Body>
        </Card>
      }
    </React.Fragment>
  );
};
export default Cart;
