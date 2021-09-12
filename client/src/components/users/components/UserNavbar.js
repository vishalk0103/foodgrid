import React, { useContext } from "react";
import style from "./Usernavbar.module.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../store/Auth-context";

const UserNavbar = (props) => {
  const auth = useContext(AuthContext);
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center mt-4">
        <h1>
          <b>Account Settings</b>
        </h1>
      </div>
      <Navbar  variant="light">
        <Container className={`d-flex justify-content-center ${style.userNav}`}>
          <Nav className={`${style.navitems} mt-3`}>
            <NavLink
              to={`/${auth.userId}/profile/account`}
              className="col-md-3 text-center "
              activeClassName={style.active}
            >
              My Account
            </NavLink>

            <NavLink
              className="col-md-3 text-center"
              to="orders"
              activeClassName={style.active}
            >
              Orders
            </NavLink>
            <NavLink
              to="favorites"
              className="col-md-3 text-center"
              activeClassName={style.active}
            >
              Favorites
            </NavLink>
            <NavLink
              to="payments"
              className="col-md-3 text-center"
              activeClassName={style.active}
            >
              Payments
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};
export default UserNavbar;
