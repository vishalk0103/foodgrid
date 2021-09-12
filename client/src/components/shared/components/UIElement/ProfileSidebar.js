import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Sidebar from "./SideBar";
import { AuthContext } from "../../../store/Auth-context";
import UserContext from "../../../store/User-context";
import NeedHelpModal from "./NeedHelpModal";

const ProfileSidebar = (props) => {
  const history = useHistory();
  const [showHelpModal, setShowHelpModal] = useState(false);
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const logoutHandler = () => {
    history.go("/login");
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
                src="https://image.flaticon.com/icons/png/512/503/503849.png"
                height="25px"
              />
              <Link className="px-3" to={`/${auth.userId}/profile/account`}>
                Account Setting
              </Link>
            </div>

            <div className="d-flex sett-option">
              <img
                src="https://image.flaticon.com/icons/png/128/32/32223.png"
                height="25px"
              />
              <Link to={`/${auth.userId}/profile/orders`} className="px-3">
                Order History
              </Link>
            </div>

            <div className="d-flex sett-option">
              <img
                src="https://image.flaticon.com/icons/png/512/2869/2869352.png"
                height="25px"
              />
              <a className="px-3">Purchase A Gift Card</a>
            </div>

            <div className="d-flex sett-option" onClick={onShowHelpModal}>
              <img
                src="https://image.flaticon.com/icons/png/128/18/18436.png"
                height="25px"
              />
              <a className="px-3">Need Help?</a>
            </div>
          </div>
          <div className="profile-footer">
            <hr />
            <footer className="d-flex">
              <img
                src="https://image.flaticon.com/icons/png/512/154/154348.png"
                height="25px"
              />
              <h5 className="text-muted px-3" onClick={logoutHandler}>
                <Link to="/" onClick={auth.logout}>
                  Log Out
                </Link>
              </h5>
            </footer>
          </div>
        </Sidebar>
      ))}
    </React.Fragment>
  );
};

export default ProfileSidebar;
