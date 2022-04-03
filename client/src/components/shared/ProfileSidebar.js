import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import NeedHelpModal from "./NeedHelpModal";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../store/Auth-slice";

const ProfileSidebar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showHelpModal, setShowHelpModal] = useState(false);
  const user = useSelector((state) => state.auth);
  const logoutHandler = () => {
    dispatch(AuthActions.logout());
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
      {["end"].map((placement, idx) => (
        <Sidebar
          show={props.show}
          onHide={props.onHide}
          key={idx}
          placement={placement}
          name={placement}
          title={
            <>
              <h5 className="pt-4">
                <b style={{ textTransform: "capitalize" }}>{user.username}</b>
              </h5>
            </>
          }
        >
          <div className="profile-sidebar">
            <div className="d-flex sett-option">
              <img
                src="https://img.icons8.com/glyph-neue/2x/arrow.png"
                height="25px"
              />
              <Link className="px-3" to={`/${user.userId}/profile/account`}>
                Account Setting
              </Link>
            </div>

            <div className="d-flex sett-option">
              <img
                src="https://img.icons8.com/glyph-neue/2x/arrow.png"
                height="25px"
              />
              <Link to={`/${user.userId}/profile/orders`} className="px-3">
                Order History
              </Link>
            </div>

            <div className="d-flex sett-option">
              <img
                src="https://img.icons8.com/glyph-neue/2x/arrow.png"
                height="25px"
              />
              <a className="px-3">Purchase A Gift Card</a>
            </div>

            <div className="d-flex sett-option" onClick={onShowHelpModal}>
              <img
                src="https://img.icons8.com/glyph-neue/2x/arrow.png"
                height="25px"
              />
              <a className="px-3">Need Help?</a>
            </div>
          </div>
          <div className="profile-footer">
            <hr />
            <footer className="d-flex">
              <img
                src="https://img.icons8.com/external-bartama-glyph-64-bartama-graphic/2x/external-off-miscellaneous-elements-glyph-bartama-glyph-64-bartama-graphic.png"
                height="25px"
              />
              <h5 className="text-muted px-3" onClick={logoutHandler}>
                <Link to="/">Log Out</Link>
              </h5>
            </footer>
          </div>
        </Sidebar>
      ))}
    </React.Fragment>
  );
};

export default ProfileSidebar;
