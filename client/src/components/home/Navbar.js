import React, { useState, useContext } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import NeedHelpModal from "../shared/components/UIElement/NeedHelpModal";
import ProfileSidebar from "../shared/components/UIElement/ProfileSidebar";
import { AuthContext } from "../store/Auth-context";
import UserContext from "../store/User-context";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
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
      <ProfileSidebar show={showUser} onHide={onHideUserHandler} />

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
                        className="px-4"
                        className="help-icon px-2"
                        src="https://image.flaticon.com/icons/png/512/3799/3799744.png"
                      />
                      <span>NEED HELP?</span>
                    </Link>
                  </li>
                </div>
                <span className="text-white middle-sign bg-white mx-2"></span>
                <div>
                  <li className="nav-item">
                    {auth.isLoggedIn && (
                      <Link
                        to="/"
                        className="nav-link  text-white bolder"
                        onClick={onShowUserHandler}
                      >
                        <img
                          className="me-2 profile-logo"
                          src="https://image.flaticon.com/icons/png/128/3745/3745332.png"
                        />
                        <span style={{ textTransform: "uppercase" }}>
                          {user.username}
                        </span>
                      </Link>
                    )}
                    {!auth.isLoggedIn && (
                      <Link to="/login" className="nav-link  text-white bolder">
                        <img
                          className="profile-logo me-2"
                          src="https://image.flaticon.com/icons/png/128/3745/3745332.png"
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
