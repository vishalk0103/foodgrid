import React, { useEffect, useState ,useContext } from "react";
import {useHistory} from 'react-router-dom'
import Sidebar from "../shared/components/UIElement/SideBar";
import style from "./AddressForm.module.css";
import Validation from "../shared/components/UIElement/Validation";
import { AuthContext } from "../store/Auth-context";
import Spinner from '../shared/components/UIElement/Spinner'

const AddressForm = (props) => {
  const auth=useContext(AuthContext)
  const [isLoading,setIsLoading] = useState(false)
  const [formValue, setFormValue] = useState({
    address: "",
    flatNo: "",
    city: "",
    landmark: "",
    pincode: "",
  });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const onAddFormSubHandler = async (e) => {
    e.preventDefault();
    setErrors(Validation(formValue));
    if (
      formValue.address.length === 0 ||
      formValue.flatNo.length === 0 ||
      formValue.city.length === 0 ||
      formValue.landmark.length === 0 ||
      formValue.pincode.length < 1
      ) {
      return;
    }
        setIsLoading(true)
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: formValue.address,
          flatNo: formValue.flatNo,
          city: formValue.city,
          landmark: formValue.landmark,
          pincode: formValue.pincode,
          user:auth.userId
        }),
      };
      await fetch(process.env.REACT_APP_BACKEND+`/address`, requestOptions)
    const response =await fetch(process.env.REACT_APP_BACKEND+`/address/${auth.userId}`)
    const responseData= await response.json()
    props.newAdd(responseData.addresses)
    props.formShow(false)
    setIsLoading(false)
      
    } catch (err) {
      setIsLoading(false)
      console.log(err);
    }

    setFormValue({
      address: "",
      flatNo: "",
      city: "",
      landmark: "",
      pincode: "",
    });
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
        {isLoading && <Spinner/>}
       {!isLoading && <div className={`container ${style.content}`}>
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
                    onChange={onChange}
                    value={formValue.address}
                    name="address"
                  />
                  {errors.address && (
                    <p className="text-danger">{errors.address}</p>
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
                    onChange={onChange}
                    value={formValue.flatNo}
                    name="flatNo"
                  />
                  {errors.flatNo && (
                    <p className="text-danger">{errors.flatNo}</p>
                  )}
                </div>
              </div>
              <div className={`row g-3 align-items-center mb-4 ${style.city}`}>
                <div className="col-3">
                  <label className={style.label} htmlFor="city">
                    City
                  </label>
                </div>
                <div className="col-8">
                  <input
                    className="form-control"
                    type="text"
                    onChange={onChange}
                    value={formValue.city}
                    name="city"
                  />
                  {errors.city && <p className="text-danger">{errors.city}</p>}
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
                    onChange={onChange}
                    value={formValue.landmark}
                    name="landmark"
                  />
                  {errors.landmark && (
                    <p className="text-danger">{errors.landmark}</p>
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
                    onChange={onChange}
                    value={formValue.pincode}
                    name="pincode"
                  />
                  {errors.pincode && (
                    <p className="text-danger">{errors.pincode}</p>
                  )}
                </div>
              </div>
              <div className={style.button}>
               
                 <button className={`btn btn-success ${style.addBtn}`}>
                    Save
                  </button>
         
              </div>
            </form>
          </div>}
        </Sidebar>
      ))}
    </React.Fragment>
  );
};
export default AddressForm;
