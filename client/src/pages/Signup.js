import React, { useState, useContext } from "react";
import NavBarNew from "../components/shared/components/UIElement/NavbarNew";
import { AuthContext } from "../components/store/Auth-context";
import style from "./Auth.module.css";
import { Link } from "react-router-dom";
import Spinner from "../components/shared/components/UIElement/Spinner";
import { useHistory } from "react-router";
import { TopModal } from "../components/shared/components/UIElement/Modal";
import { useHttpClient } from "../components/store/Http-hook";
import useForm from "../components/store/useForm";

const Signup = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();
  const auth = useContext(AuthContext);
  
  const {
    value: name,
    isValidate: nameIsValidate,
    hasError: nameHasError,
    onChangeHandler: nameChangeHandler,
    onBlurHanlder: nameBlurHandler,
  } = useForm((value) => value.trim() !== "");
  const {
    value: email,
    isValidate: emailIsValidate,
    hasError: emailHasError,
    onChangeHandler: emailChangeHandler,
    onBlurHanlder: emailBlurHandler,
  } = useForm((value) => value.trim() !== "" && value.includes("@"));
  const {
    value: password,
    isValidate: passIsValidate,
    hasError: passHasError,
    onChangeHandler: passChangeHandler,
    onBlurHanlder: passBlurHandler,
  } = useForm((value) => value.trim() !== "");



  let formIsValid = false;
  if (nameIsValidate && passIsValidate && emailIsValidate) {
    formIsValid = true;
  }

  const onSingupFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND + `/user/signup`,
        "POST",
        JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      auth.login(responseData.userId, responseData.token);
      history.push("/");
    } catch (err) {}
  };

  const nameClass = nameHasError && style.invalid;
  const emailClass = emailHasError && style.invalid;
  const passClass = passHasError && style.invalid;

  return (
    <React.Fragment>
      <NavBarNew />
      {isLoading && <Spinner />}
      <TopModal
        show={error}
        onHide={clearError}
        title={<div className="text-dark">{error}</div>}
      >
        <div className="d-flex justify-content-end">
          <button className="btn btn-dark" onClick={clearError}>
            Close
          </button>
        </div>
      </TopModal>
      {!isLoading && (
        <div
          className={`container d-flex justify-content-center mt-5 ${style["main--auth"]}`}
        >
          <div className={`mt-4 ${style.container}`} id="container">
            <div
              className={`form-container ${style["form-container"]} ${style["log-in-container"]} ${style.container}`}
            >
              <form onSubmit={onSingupFormSubmit} className={style.form}>
                <h1 className={style.h1}>Sign Up</h1>
                <div className={`container px-0 ${nameClass}`}>
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                    value={name}
                    name="username"
                  />
                  {nameHasError && (
                    <p className={style["error-text"]}>
                      Please Enter Password!
                    </p>
                  )}{" "}
                </div>
                <div className={`container px-0 ${emailClass}`}>
                  <input
                    type="email"
                    placeholder="Email"
                    onBlur={emailBlurHandler}
                    onChange={emailChangeHandler}
                    value={email}
                    name="email"
                  />
                  {emailHasError && (
                    <p className={style["error-text"]}>
                      Please Enter Password!
                    </p>
                  )}{" "}
                </div>
                <div className={`container px-0 ${passClass}`}>
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={passChangeHandler}
                    onBlur={passBlurHandler}
                    value={password}
                    name="password"
                  />
                  {passHasError && (
                    <p className={style["error-text"]}>
                      Please Enter Password!
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!formIsValid}
                  className={`mb-3 mt-2 ${style.button}`}
                >
                  Sign Up
                </button>
                <Link to="/login" className={`${style.btn} ${style.NewAccBtn}`}>
                  Sign In instead
                </Link>
              </form>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default Signup;
