import React from 'react'
import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { CartActions } from "../../store/Cart-slice";

const CartItem = (props) => {
  const dispatch= useDispatch()
  const price = `${props.totalPrice}`;
  const removeItemFromCart=()=>{
    dispatch(CartActions.removeItemFromCart(props.id))
  }
  const onAddItemHandler=()=>{
    dispatch(
      CartActions.addItemToCart({
        id:props.id,
        title:props.name,
        price:props.price
      })
    )
  }

  return (
    <React.Fragment>

      <div className='container' >
      <div className={` ${classes.row}`}>
      <div className='d-flex justify-content-between '>

        <div className='col-md-6 d-flex'>
        <img className='mt-1 me-1' src={props.image} height='15px' />
        <p>{props.name}</p>
        </div>
 

        <div className={`col-md-4 d-flex ${classes.actions}`}>
        <button onClick={removeItemFromCart}>−</button>
        <span className={classes.amount}>{props.amount}</span>
        <button onClick={onAddItemHandler}>+</button>
   
        <small className={`ms-2 d-flex ${classes.price}`}><span>Rs.</span> {props.price}</small>
   
       
      </div>
        </div>
        {/* <div className={classes.summary}> */}
          
    
        {/* </div> */}
   
      </div>
      </div>
      </React.Fragment>

  );
};

export default CartItem;
