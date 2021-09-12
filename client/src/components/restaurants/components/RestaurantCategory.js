import React from 'react'
import { Container, Col, Row } from "react-bootstrap";
import style from "./RestaurantItem.module.css";

const RestaurantCategory=()=>{
    return(
        <React.Fragment>
                <Container className={style.allCategory}>
        <div className={` d-flex`}>
          <h5 className={style.cateText}>Cuisines & Categories</h5>
   
        </div>
        <Row className="justify-content-md-center">
          <Col xs lg="2" className={`d-flex ${style.cate1} ${style.category}`}>
            <h5 className="text-white">
              <b>Vegeterian</b>
            </h5>
          </Col>
          <Col xs lg="2" className={`d-flex ${style.cate2} ${style.category}`}>
            <h5 className="text-white">
              <b>Chicken</b>
            </h5>
          </Col>
          <Col xs lg="2" className={`d-flex ${style.cate3} ${style.category}`}>
            <h5 className="text-white">
              <b>Alcohol</b>
            </h5>
          </Col>
          <Col
            xs
            lg="2"
            className={`d-flex ${style.cate4} ${style.category} ${style.removeCate}`}
          >
            <h5 className="text-white">
              <b>Smoothies</b>
            </h5>
          </Col>
        </Row>
      </Container>
        </React.Fragment>
    )
}
export default RestaurantCategory;