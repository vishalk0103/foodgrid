import React, { useState } from "react";
import "./Account.css";
import { useSelector, useDispatch } from "react-redux";
import Modals from "../../components/shared/Modal";
import useHttp from "../../components/Hooks/useHttp";
import Spinner from "../../components/shared/Spinner";
import { AuthActions } from "../../components/store/Auth-slice";

const Account = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const { sendRequest, isLoading, error } = useHttp();
  const [show, setShow] = React.useState(false);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  let formIsValid = true;
  const onNameChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  if (username.length < 1 || email.length < 1) {
    formIsValid = false;
  }
  const editBtnHandler = () => {
    setShow(true);
  };
  const editModalHideHandler = () => {
    setShow(false);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setShow(false);
    sendRequest(
      {
        url: `http://localhost:8000/api/user/${user.userId}`,
        method: "PATCH",
        body: {
          email: email,
          username: username,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      (responseData) => {
        dispatch(
          AuthActions.login({
            token: responseData.token,
            userId: responseData.userId,
            username: responseData.username,
            email: responseData.email,
          })
        );
      }
    );
  };

  return (
    <React.Fragment>
      <Modals show={show} onHide={editModalHideHandler}>
        <div>
          <form onSubmit={formSubmitHandler} className="editForm">
            <div className="mb-3">
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                value={username}
                onChange={onNameChangeHandler}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={onEmailChangeHandler}
              />
            </div>
            <div className="d-flex justify-content-between mt-3">
              <button
                disabled={!formIsValid || isLoading}
                className="btn btn-dark"
                type="submit"
              >
                {!isLoading ? "Update" : "Updating...."}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={editModalHideHandler}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modals>
      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <div class=" offset-md d-flex justify-content-center">
            <div class="col-xl-6 col-md-12 ">
              <div class="Pcard user-card-full">
                <div class="row rows m-l-0 m-r-0">
                  <div class="pb-5">
                    <div class="card-block">
                      <div className="d-flex justify-content-between header mb-3">
                        <h4
                          class="m-b-20 p-b-5 f-w-600"
                          style={{ textTransform: "capitalize" }}
                        >
                          {user.username}
                        </h4>
                        <button
                          className="btn btn-secondary"
                          onClick={editBtnHandler}
                        >
                          Edit
                        </button>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Email</p>
                          <h6 class="text-muted f-w-400"> {user.email} </h6>
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
    </React.Fragment>
  );
};
export default Account;
