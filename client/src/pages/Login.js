import React, { useState, useContext } from "react";
import Spinner from "../components/shared/components/UIElement/Spinner";
import NavBarNew from "../components/shared/components/UIElement/NavbarNew";
import { AuthContext } from "../components/store/Auth-context";
import { Link } from "react-router-dom";
import style from "./Auth.module.css";
import { useHttpClient } from "../components/store/Http-hook";
import { TopModal } from "../components/shared/components/UIElement/Modal";
import useForm from "../components/store/useForm";

const Login = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const {
    value: email,
    hasError: emailHasError,
    isValidate: emailIsValidate,
    onChangeHandler: emailOnChangeHandler,
    onBlurHanlder: emailBlurHandler,
    reset: eReset,
  } = useForm((value) => value.trim() !== "" && value.includes("@"));

  const {
    value: password,
    hasError: passwordHasError,
    isValidate: passIsValid,
    onChangeHandler: passwordOnChangeHandler,
    onBlurHanlder: passwordBlurHandler,
    reset: pReset,
  } = useForm((value) => value.trim() !== "");
  let formIsValid = false;
  if (emailIsValidate && passIsValid) {
    formIsValid = true;
  }
  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND + "/user/login",
        "POST",
        JSON.stringify({
          email: email,
          password: password,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      auth.login(responseData.userId, responseData.token);
    } catch (err) {}
  };

  const emailClass = emailHasError ? style.invalid : "";
  const passClass = passwordHasError ? style.invalid : "";

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
              <form
                onSubmit={loginSubmitHandler}
                className={style.form}
                noValidate
              >
                <h1 className={style.h1}>Sign In</h1>
                <div className={`container px-0 mx-0 ${emailClass}`}>
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={emailOnChangeHandler}
                    onBlur={emailBlurHandler}
                    value={email}
                    name="email"
                  />
                  {emailHasError && (
                    <p className={style["error-text"]}>Please Enter Email!</p>
                  )}
                </div>
                <div className={`container px-0 mx-0 ${passClass}`}>
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={passwordOnChangeHandler}
                    value={password}
                    onBlur={passwordBlurHandler}
                    name="password"
                  />
                  {passwordHasError && (
                    <p className={style["error-text"]}>
                      Please Enter Password!
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!formIsValid}
                  className={`mb-3 mt-2 ${!formIsValid && style.disButton} ${
                    style.button
                  }`}
                >
                  Sign In
                </button>
                <Link
                  to="/signup"
                  className={`${style.btn} ${style.NewAccBtn}`}
                >
                  Create new account
                </Link>
              </form>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default Login;
