import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import NavBarNew from "../../shared/components/UIElement/NavbarNew";
import UserNavbar from "../components/UserNavbar";

import "./Account.css";
import Validation from "../../shared/components/UIElement/Validation";
import Footer from '../../home/footer'
import UserContext from "../../store/User-context";
import Sidebar from "../../shared/components/UIElement/SideBar";
import useForm from "../../shared/components/FormElement/Form-hook";
import { FormSelect } from "react-bootstrap";

const Account = () => {
  const {
    value:enteredName,
    valueIsValid:enteredNameIsValid,
    hasError:nameHasError,
    inputBlurHandler:nameBlurHandler,
    inputChangeHandler:nameChangeHandler,
    reset:nameReset
  }= useForm((value) => value.trim() !== "")

  const {
    value:enteredEmail,
    valueIsValid:enteredEmailIsValid,
    hasError:emailHasError,
    inputBlurHandler:emailBlurHandler,
    inputChangeHandler:emailChangeHandler,
    reset:emailReset
  }= useForm(value=>value.trim()!==''&& value.includes('@') && value.includes('.'))

  const {
    value:enteredpass,
    valueIsValid:enteredpassIsValid,
    hasError:passHasError,
    inputBlurHandler:passBlurHandler,
    inputChangeHandler:passChangeHandler,
    reset:passReset
  }= useForm(value=> value.trim()!=='')


  const { username, setUsername } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const { email, setEmail } = useContext(UserContext);
  const [showEdit, setShowEdit] = useState(true);

  const onHideEdit = () => {
    setShowEdit(false);
  };

  // const onShowEdit = () => {
  //   setShowEdit(true);
  // };

  let formIsValid=false

  if(enteredEmailIsValid && enteredNameIsValid && enteredpassIsValid){
    formIsValid=true
  }

  const onUpdateProfileHandler = (e) => {
    e.preventDefault();
    // setShowEdit(false);
    const newData={
      updatedName:enteredName,
      updatedEmail:enteredEmail,
      updatedPass:enteredpass
    }
    nameReset()
    emailReset()
    passReset()
    console.log(newData)
  };

  const nameClass=nameHasError ? 'invalid' : ''
  
  const emailClass=emailHasError ? 'invalid' : ''
  const passClass=passHasError ? 'invalid' : ''



  return (
    <React.Fragment>
      {["start"].map((placement, idx) => (
        <Sidebar
          show={showEdit}
          onHide={onHideEdit}
          key={idx}
          placement={placement}
          name={placement}
          title={
            <>
              <p className="pt-4">
                <b>Edit Your Profile</b>
              </p>
            </>
          }
        >
          <form onSubmit={onUpdateProfileHandler}>
          <div className={nameClass}>
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              className="form-control"
              type="text"
              name="username"
              value={username}
              onBlur={nameBlurHandler}
              onChange={nameChangeHandler}
              id="username"
            />
            {nameHasError && (
              <p className="text-danger">Please Enter Valid Name!</p>
            )}
            </div>
            <div className={emailClass}>
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={enteredEmail}
              onBlur={emailBlurHandler}
              onChange={emailChangeHandler}
              id="email"
            />
          {emailHasError &&  <p className="text-danger"> Please Enter Valid Email!</p>}
            </div>
            <div className={passClass}>
            <label className="form-label" htmlFor="pass">
              Password
            </label>
            <input
              className="form-control"
              type="text"
              name="pass"
              value={enteredpass}
              onBlur={passBlurHandler}
              onChange={passChangeHandler}
              id="pass"
            />
          {passHasError &&  <p className="text-danger"> Please Enter Valid Password!</p>}
            </div>
            {formIsValid && <button type="submit" className="btn btn-success mt-3">
              Save
            </button>}
          </form>
        </Sidebar>
      ))}
      <NavBarNew />
      <UserNavbar />

      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <div class=" offset-md d-flex justify-content-center">
            <div class="col-xl-6 col-md-12 ">
              <div class="Pcard user-card-full">
                <div class="row rows m-l-0 m-r-0">
                  <div class="pb-5">
                    <div class="card-block">
                      <h4
                        class="m-b-20 p-b-5 b-b-default f-w-600"
                        style={{ textTransform: "capitalize" }}
                      >
                        {username}{" "}
                      </h4>
                      <div class="row">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Email</p>
                          <h6 class="text-muted f-w-400"> {email} </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Orders</p>
                          <h6 class="text-muted f-w-400">0</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="acc--footer">
        <Footer />
      </div>
    </React.Fragment>
  );
};
export default Account;
