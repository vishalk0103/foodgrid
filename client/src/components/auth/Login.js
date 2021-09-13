import React, { useState, useContext } from "react";
import Spinner from "../shared/components/UIElement/Spinner";
import NavBarNew from "../shared/components/UIElement/NavbarNew";
import { AuthContext } from "../store/Auth-context";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import style from "./Auth.module.css";
import Validation from "../shared/components/UIElement/Validation";
import {useHttpClient} from '../store/Http-hook'
import { TopModal } from "../shared/components/UIElement/Modal";

const Login = () => {
  const history=useHistory()
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const [logValue, setLogValue] = useState({
    email: "",
    password: "",
  });
  const [userAddress, setUserAddress] = useState();

  const onChange = (e) => {
    setLogValue({ ...logValue, [e.target.name]: e.target.value });
  };
  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    setErrors(Validation(logValue));
    if (logValue.email.length === 0 || logValue.password.length === 0) {
      return;
    }

    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND+'/user/login',
        "POST",
        JSON.stringify({
          email: logValue.email,
          password: logValue.password
        }),
        {
          "Content-Type": "application/json",
        }
      );
      auth.login(responseData.userId, responseData.token)
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <NavBarNew />
             {isLoading && <Spinner />}
   <TopModal show={error} onHide={clearError}
        title={<div className='text-dark' >{error}</div>}
      >
         <div className='d-flex justify-content-end'><button className='btn btn-dark' onClick={clearError}>Close</button></div>
      </TopModal>
    {!isLoading &&  <div
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
              <input
                type="email"
                placeholder="Email"
                onChange={onChange}
                value={logValue.email}
                name="email"
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
              <input
                type="password"
                placeholder="Password"
                onChange={onChange}
                value={logValue.password}
                name="password"
              />
        
              <button type="submit" className={`mb-3 mt-2 ${style.button}`}>
                Sign In
              </button>
              <Link to="/signup" className={`${style.btn} ${style.NewAccBtn}`}>
                Create new account
              </Link>
            </form>
          </div>
        </div>
      </div>}
    </React.Fragment>
  );
};
export default Login;
