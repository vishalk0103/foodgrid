import React, { useState ,useContext} from "react";
import { Navbar } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import style from "./Navbar.module.css";
import ProfileSidebar from "./ProfileSidebar";
import NeedHelpModal from "./NeedHelpModal";
import { AuthContext } from "../../../store/Auth-context";


const NavBarNew = () => {
  const auth=useContext(AuthContext)

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
      <ProfileSidebar show={profileShowSett} onHide={onHideProfileHandler} />
      <Navbar className={style.navbar}>
        <div className="container-fluid px-0">
          <Navbar.Brand className="">
            <NavLink to="/" className={`brand-logo  ${style['brand--logo']}`}>
              {/* <img
                className="px-4"
                className={`brand-logo ${style['brand--logo']}`}
                src="https://upload.wikimedia.org/wikipedia/en/thumb/9/92/SkipTheDishes_logo.svg/1920px-SkipTheDishes_logo.svg.png"
              />
             */}
             Food<span className={style.middleBrand}>Grid</span>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Text className={style.menu}>
            <Link to="/checkout">
              <img
                className={style.helpIcon}
                src="https://image.flaticon.com/icons/png/128/34/34568.png"
                height="30px"
              />
            </Link>
           {auth.isLoggedIn && <div onClick={onShowProfileHandler} > 
              <img
                className="pr-3"
                src="https://image.flaticon.com/icons/png/128/3745/3745332.png"
                height="40px"
              />
            </div>}
         {!auth.isLoggedIn &&   <Link  to='/login'>
              <img
                className="pr-3"
                src="https://image.flaticon.com/icons/png/128/3745/3745332.png"
                height="40px"
              />
            </Link>}
          </Navbar.Text>
        </div>
      </Navbar>
    </React.Fragment>
  );
};

export default NavBarNew;
