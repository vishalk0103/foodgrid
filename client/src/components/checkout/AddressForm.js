import React, { useState } from "react";
import Sidebar from "../shared/SideBar";
import style from "./AddressForm.module.css";
import Spinner from "../shared/Spinner";
import useForm from "../Hooks/useForm";
import { useSelector } from "react-redux";

const AddressForm = (props) => {
  const user = useSelector((state) => state.auth);
  const {
    value: address,
    hasError: addHasError,
    isValidate: addIsValid,
    onChangeHandler: addressChangeHandler,
    onBlurHanlder: addressBlurHandler,
  } = useForm((value) => value.trim() !== "");
  const {
    value: flatNo,
    hasError: flatNoHasError,
    isValidate: flatNoIsValid,
    onChangeHandler: flatNoChangeHandler,
    onBlurHanlder: flatNoBlurHandler,
  } = useForm((value) => value.trim() !== "");
  const {
    value: city,
    hasError: cityHasError,
    isValidate: cityIsValid,
    onChangeHandler: cityChangeHandler,
    onBlurHanlder: cityBlurHandler,
  } = useForm((value) => value.trim() !== "");
  const {
    value: landmark,
    hasError: landmarkHasError,
    isValidate: landmarkIsValid,
    onChangeHandler: landmarkChangeHandler,
    onBlurHanlder: landmarkBlurHandler,
  } = useForm((value) => value.trim() !== "");
  const {
    value: pincode,
    hasError: pincodeHasError,
    isValidate: pincodeIsValid,
    onChangeHandler: pincodeChangeHandler,
    onBlurHanlder: pincodeBlurHandler,
  } = useForm((value) => value.trim() !== "");
  const [isLoading, setIsLoading] = useState(false);

  let formIsValid = false;
  if (
    addIsValid &&
    flatNoIsValid &&
    cityIsValid &&
    landmarkIsValid &&
    pincodeIsValid
  ) {
    formIsValid = true;
  }

  const onAddFormSubHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: address,
          flatNo: flatNo,
          city: city,
          landmark: landmark,
          pincode: pincode,
          user: user.userId,
        }),
      };
      await fetch(process.env.REACT_APP_BACKEND + `/address`, requestOptions);
      const response = await fetch(
        process.env.REACT_APP_BACKEND + `/address/${user.userId}`
      );
      const responseData = await response.json();
      props.newAdd(responseData.addresses);
      props.formShow(false);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      {["end"].map((placement, idx) => (
        <Sidebar
          className={style["address--form"]}
          show={props.show}
          onHide={props.onHide}
          key={idx}
          placement={placement}
          name={placement}
          title={
            <h4>
              <b>Add address</b>
            </h4>
          }
        >
          {isLoading && <Spinner />}
          {!isLoading && (
            <div className={`container ${style.content}`}>
              <form onSubmit={onAddFormSubHandler}>
                <div
                  className={`row g-3 align-items-center mb-4 ${style.address}`}
                >
                  <div className="col-3">
                    <label className={style.label} htmlFor="address">
                      Address
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      type="text"
                      onChange={addressChangeHandler}
                      value={address}
                      onBlur={addressBlurHandler}
                      name="address"
                    />
                    {addHasError && (
                      <p className="text-danger">Please Enter Address.</p>
                    )}
                  </div>
                </div>
                <div
                  className={`row g-3 align-items-center mb-4 ${style.flatNo}`}
                >
                  <div className="col-3">
                    <label className={style.label} htmlFor="flatNO">
                      Door / Flat No
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      type="text"
                      onChange={flatNoChangeHandler}
                      value={flatNo}
                      onBlur={flatNoBlurHandler}
                      name="flatNo"
                    />
                    {flatNoHasError && (
                      <p className="text-danger">Please Enter FlatNo.</p>
                    )}
                  </div>
                </div>
                <div
                  className={`row g-3 align-items-center mb-4 ${style.city}`}
                >
                  <div className="col-3">
                    <label className={style.label} htmlFor="city">
                      City
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      type="text"
                      onChange={cityChangeHandler}
                      value={city}
                      onBlur={cityBlurHandler}
                      name="city"
                    />
                    {cityHasError && (
                      <p className="text-danger">Please Enter City.</p>
                    )}
                  </div>
                </div>
                <div
                  className={`row g-3 align-items-center mb-4 ${style.landmark}`}
                >
                  <div className="col-3">
                    <label className={style.label} htmlFor="landmark">
                      Landmark
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      type="text"
                      onChange={landmarkChangeHandler}
                      value={landmark}
                      onBlur={landmarkBlurHandler}
                      name="landmark"
                    />
                    {landmarkHasError && (
                      <p className="text-danger">Please Enter Landmark.</p>
                    )}
                  </div>
                </div>
                <div
                  className={`row g-3 align-items-center mb-4 ${style.pincode}`}
                >
                  <div className="col-3">
                    <label className={style.label} htmlFor="pincode">
                      Pincode
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      type="number"
                      onChange={pincodeChangeHandler}
                      value={pincode}
                      onBlur={pincodeBlurHandler}
                      name="pincode"
                    />
                    {pincodeHasError && (
                      <p className="text-danger">Please Enter Pincode.</p>
                    )}
                  </div>
                </div>
                <div className={style.button}>
                  <button
                    disabled={!formIsValid}
                    className={`btn btn-success ${style.addBtn}`}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          )}
        </Sidebar>
      ))}
    </React.Fragment>
  );
};
export default AddressForm;
