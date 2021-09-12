import React from "react";
import NavBarNew from "../../shared/components/UIElement/NavbarNew";
import UserNavbar from "../components/UserNavbar";
// import style from "./Account.module.css";
import Footer from "../../home/components/footer";
import "./Account.css";

const Favorite = () => {
  return (
    <React.Fragment>
      <NavBarNew />
      <UserNavbar />
      {/* <div className={` container-fluid mt-3 d-flex justify-content-center `}>
          <div className={` row col-md-6 `}>
            <div className={`shadow p-3 bg-white rounded ${style.account}`}>
              <div className="d-flex justify-content-center mt-5">
               
        <h4> No Favorite items.</h4>
              </div>
            
          </div>
        </div>
        </div>
        <div className={style['acc--footer']} >
        <Footer />
        </div> */}
        <div class="page-content page-container" id="page-content">
    <div class="padding">
        <div class="offset-md d-flex justify-content-center">
            <div class="col-xl-6 col-md-12 ">
                <div class="Pcard user-card-full">
                    <div class="row rows m-l-0 m-r-0">
                       
                        <div class="pb-5">
                            <div class="card-block">
                       
                                <div class="row">
                                    <div class="col-sm-12 d-flex justify-content-center">
                                        <h5>No Favorite items.</h5>
                                      
                                    </div>
                            
                                </div>
                              
                             
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
      <div className="acc--footer">
        <Footer />
      </div>
    </React.Fragment>
  );
};
export default Favorite;
