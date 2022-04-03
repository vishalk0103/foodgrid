import React, { useState, useContext } from "react";
import { Navbar } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import style from "./Navbar.module.css";
import ProfileSidebar from "./ProfileSidebar";
import NeedHelpModal from "./NeedHelpModal";
import { useSelector } from "react-redux";

const NavBarNew = () => {
  const user = useSelector((state) => state.auth);

  const [profileShowSett, setProfileShowSett] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const onShowProfileHandler = () => {
    setProfileShowSett(true);
  };
  const onHideProfileHandler = () => {
    setProfileShowSett(false);
  };
  const onShowHelpModal = () => {
    setShowHelpModal(true);
  };
  const onHideHelpModal = () => {
    setShowHelpModal(false);
  };

  return (
    <React.Fragment>
      <NeedHelpModal show={showHelpModal} onHide={onHideHelpModal} />
      {user.token && (
        <ProfileSidebar show={profileShowSett} onHide={onHideProfileHandler} />
      )}
      <Navbar className={style.navbar}>
        <div className="container-fluid px-0">
          <Navbar.Brand className="">
            <NavLink to="/" className={`brand-logo  ${style["brand--logo"]}`}>
              Food<span className={style.middleBrand}>Grid</span>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Text className={style.menu}>
            <Link to="/checkout">
              <img
                className={style.helpIcon}
                src="https://img.icons8.com/clouds/2x/shopping-cart-loaded.png"
                height="40px"
              />
            </Link>
            {user.token && (
              <div onClick={onShowProfileHandler}>
                <img
                  className="pr-3"
                  src="https://img.icons8.com/bubbles/2x/user.png"
                  height="40px"
                />
              </div>
            )}
            {!user.token && (
              <Link to="/login">
                <img
                  className="pr-3"
                  src="https://img.icons8.com/bubbles/2x/user.png"
                  height="40px"
                />
              </Link>
            )}
          </Navbar.Text>
        </div>
      </Navbar>
    </React.Fragment>
  );
};

export default NavBarNew;
