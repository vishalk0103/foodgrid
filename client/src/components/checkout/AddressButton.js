import React,{useState,useContext} from "react";
import {TopModal} from '../shared/components/UIElement/Modal'
import { Link } from "react-router-dom";
import style from "./AddressButton.module.css";
import {AuthContext} from '../store/Auth-context'

const AddressButton = (props) => {
  const auth= useContext(AuthContext)
  const [loginModal,setLoginModal]=useState(false)
  const onShowForm = () => {
    props.setShowForm(true);
  };
  const onShowLogin=()=>{
    setLoginModal(true)
  }
  const onHideLogin=()=>{
    setLoginModal(false)
  }
  const onCloseLoginModal=()=>{
    setLoginModal(false)
  }
  return (
    <React.Fragment>
       
       <TopModal
    show={loginModal}
    onHide={onHideLogin}
    title={<div ><h4 className={style.modalHeader}>Please Log In.</h4></div>}
    >
      <div>
        <div className='d-flex justify-content-center'>
          <button  className='btn btn-dark me-2' ><Link className='text-white' to='/login' >Login</Link></button>
          <button className='btn btn-danger ms-2' onClick={onCloseLoginModal}>Close</button>
        </div>
      </div>
    </TopModal>

      <div className={`${style['add--btn']}`}>
      <h3 className='mx-4 py-3'>Select delivery address</h3>
        <div className={`${style.addressBtn}`}>
          <div className={` ${style.addressButton}`}>
            <h5 className="mt-3 mx-3">Add new address</h5>
           {auth.isLoggedIn && <button className="btn btn-dark mt-4 mx-3" onClick={ onShowForm } >
              ADD NEW
            </button>}
           {!auth.isLoggedIn && <button className="btn btn-dark mt-4 mx-3" onClick={ onShowLogin } >
              ADD NEW
            </button>}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddressButton;
