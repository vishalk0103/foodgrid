import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import FoodItem from "./FoodItem";
import style from "./FoodList.module.css";
import EmptyCart from "../../cart/EmptyCart";

import { useSelector } from "react-redux";

const FoodList = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  return (

      <div className={style.content}>
        <div className={style.cart}>
         {cartItems.length >0 && <Cart content={  <Link to="/checkout">
              <button className={`btn btn-success ${style["cart--btn"]}`}>
              <strong>  CHECKOUT </strong>
              </button>
            </Link>} />}
            {cartItems.length ===0 && 
            <EmptyCart 
          button={  <button className={`btn text-white ${style['cart--btn']}`} disabled><strong>CHECKOUT</strong></button>}
            />
            }
        </div>
        <div className={style.foodItem}>
        <h2 className='ms-2 mb-4'>Main Course</h2>
          {props.foods.filter(food=>food.category ==='main course').map((food) => (
            <FoodItem
              id={food._id}
              key={food._id}
              title={food.title}
              image={food.image}
              cateogry={food.cateogry}
              type={food.type}
              price={food.price}
            />
          ))}
          <h2 className='ms-2 mb-4 mt-5'>Quick Bites</h2>
          {props.foods.filter(food=>food.category ==='quick bites').map((food) => (
            <FoodItem
              id={food._id}
              key={food._id}
              title={food.title}
              image={food.image}
              cateogry={food.cateogry}
              type={food.type}
              price={food.price}
            />
          ))}
          <h2 className='ms-2 mb-4 mt-5'>Extraas</h2>
          {props.foods.filter(food=>food.category ==='extra').map((food) => (
            <FoodItem
              id={food._id}
              key={food._id}
              title={food.title}
              image={food.image}
              cateogry={food.cateogry}
              type={food.type}
              price={food.price}
            />
          ))}
          <h2 className='ms-2 mb-4 mt-5'>beverages</h2>
          {props.foods.filter(food=>food.category ==='beverages').map((food) => (
            <FoodItem
              id={food._id}
              key={food._id}
              title={food.title}
              image={food.image}
              cateogry={food.cateogry}
              type={food.type}
              price={food.price}
            />
          ))}
        </div>
      </div>


  );
};

export default FoodList;
