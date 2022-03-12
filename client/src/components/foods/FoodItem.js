import React from "react";
import style from "./FoodItem.module.css";
import { Container, Row, Col } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { CartActions } from "../store/Cart-slice";

const FoodItem = (props) => {
  const dispatch = useDispatch();
  let img;
  if (props.type === "veg") {
    img = "https://img.icons8.com/color/2x/vegetarian-food-symbol.png";
  } else {
    img = "https://img.icons8.com/color/2x/non-vegetarian-food-symbol.png";
  }
  const addItemToCart = () => {
    dispatch(
      CartActions.addItemToCart({
        id: props.id,
        title: props.title,
        price: props.price,
        image: img,
      })
    );
  };

  return (
    <React.Fragment>
      <Container className={` ${style.listCard} `}>
        <Row className={` justify-content-md-start ${style.row}`}>
          <Col xs lg="3" className={style.listImgs}>
            <img
              src={props.image}
              alt="foodHub"
              onError={(e) => (e.target.style.display = "none")}
              class={`${style.imgFluid}`}
            />
          </Col>
          <Col xs lg="5" className="">
            <img src={img} height="15px" />
            <h5 className=" mt-1">{props.title}</h5>
            <span className={style.price}>Rs. {props.price}</span>
          </Col>
          <Col xs lg="3" className={style["food--form "]}>
            <button className={style.addBtn} onClick={addItemToCart}>
              Add
            </button>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default FoodItem;
