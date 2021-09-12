import React,{useState} from "react";
import "./TopBanner.css";
import Navbar from "./Navbar";
import Search from "./Search";

const TopBanner = (props) => {

  return (
    <React.Fragment>
      <section>

        <div className="container-fluid px-0 topBanner" id='topBanner'>
          <Navbar />
          <div className="container">
            <div className="row ">
            <Search/>           

            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default TopBanner;
