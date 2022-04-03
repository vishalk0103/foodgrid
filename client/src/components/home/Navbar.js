import React, { useState, useContext } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import NeedHelpModal from "../shared/NeedHelpModal";
import ProfileSidebar from "../shared/ProfileSidebar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.auth);
  const [modalShow, setModalShow] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const onShowHelpHandler = () => {
    setModalShow(true);
  };

  const onHideHelpHandler = () => {
    setModalShow(false);
  };

  const onShowUserHandler = () => setShowUser(true);
  const onHideUserHandler = () => setShowUser(false);

  return (
    <React.Fragment>
      {user.token && (
        <ProfileSidebar show={showUser} onHide={onHideUserHandler} />
      )}
      <NeedHelpModal show={modalShow} onHide={onHideHelpHandler} />

      <section className="nav-cs">
        <nav className="navbar navbar-expand-lg navbar-transparent bg-transparent">
          <h4 className="brand-logo mx-5 ">
            Food<sapn className="brand-middle">Grid</sapn>
          </h4>
          <div className="container navbar-custom d-flex">
            <NavLink className="navbar-brand" to="/"></NavLink>
            <div id="navbarNav">
              <ul className="navbar-nav">
                <div>
                  <li className="nav-item">
                    <Link
                      className="nav-link active text-white bolder"
                      onClick={onShowHelpHandler}
                      to="/"
                    >
                      <img
                        className="help-icon px-1"
                        src="https://img.icons8.com/fluency-systems-regular/2x/ffffff/poll-topic.png"
                      />
                      <span>NEED HELP?</span>
                    </Link>
                  </li>
                </div>
                <span className="text-white middle-sign bg-white mx-2"></span>
                <div>
                  <li className="nav-item">
                    {user.token && (
                      <Link
                        to="/"
                        className="nav-link  text-white bolder"
                        onClick={onShowUserHandler}
                      >
                        <img
                          className="me-2 profile-logo"
                          src="https://img.icons8.com/bubbles/2x/user.png"
                        />
                        <span style={{ textTransform: "uppercase" }}>
                          {user.username}
                        </span>
                      </Link>
                    )}
                    {!user.token && (
                      <Link to="/login" className="nav-link  text-white bolder">
                        <img
                          className="profile-logo me-2"
                          src="https://img.icons8.com/bubbles/2x/user.png"
                        />
                        <span>LOGIN</span>
                      </Link>
                    )}
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </React.Fragment>
  );
};

export default Navbar;
