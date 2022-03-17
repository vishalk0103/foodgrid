import React, { useState } from "react";
import { Card } from "react-bootstrap";
import style from "./FoodItemsHeader.module.css";
import Map from "../shared/Map";
import Modals from "../shared/Modal";
import "mapbox-gl/dist/mapbox-gl.css";

const FoodItemsHeader = (props) => {
  const [viewMap, setViewMap] = useState(false);
  const onViewMapHandler = () => {
    setViewMap(true);
  };
  const onHideMapHandler = () => {
    setViewMap(false);
  };

  return (
    <React.Fragment>
      <Modals
        heading={<h4 className="text-center">{props.restaurant.address}</h4>}
        show={viewMap}
        onHide={onHideMapHandler}
      >
        <Map location={props.restaurant.coordinate} />
      </Modals>

      <Card className={style.header}>
        <Card.Img
          className={style.headImg}
          variant="top"
          src={props.restaurant.image}
        />
        <Card.Body className={`mb-0 ${style["header--body"]}`}>
          <Card.Text>
            <div className="d-flex mb-0  justify-content-between">
              <h3 className="mb-0">{props.restaurant.name}</h3>
              <button
                onClick={onViewMapHandler}
                className="btn btn-outline-success "
              >
                View on Map
              </button>
            </div>
            <div
              className={`d-flex justify-content-between ${style["header-detail"]}`}
            >
              <div className="d-flex mt-2">
                <b>
                  <p className="text-dark">Opens At 10:00 AM</p>
                </b>
                <span className="mx-2">|</span>
                <p>
                  <b>
                    <span className="text-danger">
                      {props.restaurant.address}
                    </span>
                  </b>
                </p>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default FoodItemsHeader;
