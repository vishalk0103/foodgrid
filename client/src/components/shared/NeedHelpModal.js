import React from "react";
import Modals from "./Modal";
import { Link } from "react-router-dom";

const NeedHelpModal = (props) => {
  return (
    <React.Fragment>
      <Modals
        heading={<h4 className="text-center">Need Help?</h4>}
        onClose="Close"
        show={props.show}
        onHide={props.onHide}
      >
        <>
          <div className="profile-sidebar pt-5">
            <div className="d-flex help-option">
              <Link to="/" className=" px-3">
                Missing Items
              </Link>
            </div>

            <div className="d-flex help-option">
              <Link to="/" className="px-3">
                Incorrect Items
              </Link>
            </div>

            <div className="d-flex help-option">
              <Link to="/" className="px-3">
                Poorely Packaged Items
              </Link>
            </div>

            <div className="d-flex help-option">
              <Link to="/" className="px-3">
                Wrong Temperature
              </Link>
            </div>

            <div className="d-flex help-option">
              <Link to="/" className="px-3">
                Accessibility Support
              </Link>
            </div>

            <div className="d-flex help-option">
              <Link to="/" className="px-3">
                Need Something Else?
              </Link>
            </div>
          </div>
        </>
      </Modals>
    </React.Fragment>
  );
};

export default NeedHelpModal;
