import React from "react";
import { Link } from "react-router-dom";
import "./HomeItems.css";

const HometItems = () => {
  return (
<>
      <div class="container px-0 mt-5 mb-5 ">
        <div class="row mx-0 justify-content-evenly">
          <h2 className="mb-5 item-title">Popular Cuisines</h2>
          <a className="col-sm-3 d-flex homeItem1 itemCon" href="#topBanner">
            <div>
              <h5 className="text-white cns">
                <b>Indian</b>
              </h5>
            </div>
          </a>
          <a className="col-sm-3 d-flex homeItem2 itemCon" href="#topBanner">
            <div>
              <h5 className="text-white cns">
                <b>Italian</b>
              </h5>
            </div>
          </a>

          <a className="col-sm-3 d-flex homeItem3 itemCon" href="#topBanner">
            <div>
              <h5 className="text-white cns">
                <b>Vietnamese</b>
              </h5>
            </div>
          </a>

          <a className="col-sm-3 d-flex homeItem4 itemCon" href="#topBanner">
            <div>
              <h5 className="text-white cns">
                <b>Chinese</b>
              </h5>
            </div>
          </a>

          <a class="col-sm-3 d-flex homeItem5 itemCon" href="#topBanner">
            <div>
              <h5 className="text-white cns">
                <b>Japanese</b>
              </h5>
            </div>
          </a>
        </div>
      </div>
      </>

  );
};

export default HometItems;
