import React, { useState, useContext } from "react";
import style from "./AddressItem.module.css";
import { TopModal } from "../shared/Modal";

const AddressItem = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal,setShowModal]=useState(false)
  const addressDeleteHandler = async () => {
    setIsLoading(true);
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: null,
      };
      await fetch(
        `${process.env.REACT_APP_BACKEND}/address/${props.id}`,
        requestOptions
      );
      props.onDelete(props.id);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  const onDeliverHandler=()=>{
    setShowModal(true)
  }
  const onHideDeliver=()=>{
    setShowModal(false)
  }

  return (
    <React.Fragment>
    <TopModal
    show={showModal}
    onHide={onHideDeliver}
    >
    <h4 className={`${style.deliHeader} text-center`}>Currently Unavailable!</h4>
    </TopModal>



      <div
        className={`d-flex justify-content-center shadow  ${style["address--main"]} `}
      >
        <div className="row">
    
              <h3 className="mt-3 d-flex justify-content-center">
                Select Delivery Address
              </h3>
              <div className="">
                <div className="d-flex  justify-content-center">
                  {props.address},
                </div>
                <div className="d-flex  justify-content-center">
                  {props.flatNo},
                </div>
                <div className="d-flex  justify-content-center">
                  {props.city},
                </div>
                <div className="d-flex  justify-content-center">
                  {props.landmark},
                </div>
                <div className="d-flex justify-content-center">
                  {props.pincode}
                </div>
              </div>
            <div className={`mb-4 mt-3 ${style["delivery--btn"]}`}>
                <button className="btn btn-success " onClick={onDeliverHandler} >Deliver</button>
               {!isLoading && <button
                  onClick={addressDeleteHandler}
                  className="btn btn-danger mx-2 "
                >
                  Delete
                </button>}
               {isLoading && <button
                  className="btn btn-danger mx-2 " disabled
                >
                  Deleting...
                </button>}
              </div>
          
        </div>
      </div>
    </React.Fragment>
  );
};
export default AddressItem;
