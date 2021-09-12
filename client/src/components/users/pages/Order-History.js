import React from 'react'
import NavBarNew from '../../shared/components/UIElement/NavbarNew';
import UserNavbar from '../components/UserNavbar';
// import style from './Account.module.css'
import Footer from "../../home/components/footer";
import './Account.css'
const OrderHistory=()=>{
    return(
        <React.Fragment>
        <NavBarNew/>
        <UserNavbar/>
 
        <div class="page-content page-container" id="page-content">
    <div class="padding">
        <div class=" offset-md d-flex justify-content-center">
            <div class="col-xl-6 col-md-12 ">
                <div class="Pcard user-card-full">
                    <div class="row rows m-l-0 m-r-0">
                       
                        <div class="pb-5">
                            <div class="card-block">
                        
                                <div class="row">
                                    <div class="col-sm-12 d-flex justify-content-center">
                                  <h5>  You haven't made any orders yet.</h5>
                          
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
    )
}
export default OrderHistory;