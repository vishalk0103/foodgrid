import React, { useState, useContext } from "react";
import NavBarNew from "../shared/components/UIElement/NavbarNew";
import { AuthContext } from "../store/Auth-context";
import style from "./Login.module.css";
import { Link } from "react-router-dom";
import Validation from "../shared/components/UIElement/Validation";
import Spinner from "../shared/components/UIElement/Spinner";
import { useHistory } from "react-router";
import { TopModal } from "../shared/components/UIElement/Modal";
import { useHttpClient } from "../store/Http-hook";

const Signup = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [signValue, setSignValue] = useState({
    username: "",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setSignValue({ ...signValue, [e.target.name]: e.target.value });
  };
  const onSingupFormSubmit = async (e) => {
    e.preventDefault();
    setErrors(Validation(signValue));
    if (
      signValue.username.length === 0 ||
      signValue.email.length === 0 ||
      signValue.password.length === 0
    ) {
      return;
    }

    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND+`/user/signup`,
        "POST",
        JSON.stringify({
          username: signValue.username,
          email: signValue.email,
          password: signValue.password,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      auth.login(responseData.userId, responseData.token);
      history.push('/')
    } catch (err) {}
  };
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
                <input
                  type="text"
                  placeholder="Name"
                  onChange={onChange}
                  value={signValue.username}
                  name="username"
                />
                {errors.username && (
                  <p className="text-danger">{errors.username}</p>
                )}
                <input
                  type="email"
                  placeholder="Email"
                  onChange={onChange}
                  value={signValue.email}
                  name="email"
                />
                {errors.email && <p className="text-danger">{errors.email}</p>}
                <input
                  type="password"
                  placeholder="Password"
                  onChange={onChange}
                  value={signValue.password}
                  name="password"
                />
                {errors.password && (
                  <p className="text-danger p-0 m-0">{errors.password}</p>
                )}
                <button type="submit" className={`mb-3 mt-2 ${style.button}`}>
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
