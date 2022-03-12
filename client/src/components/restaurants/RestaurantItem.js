import React from 'react'
import style from './RestaurantItem.module.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'

const RestaurantItems=(props)=>{
    const location=useParams().location;
  return(
    <React.Fragment>
    <Link to={`/${location}/restaurants/${props.id}`} >
         <div className={`card mb-3 px-0 ${style.listCard}`}>
            <div className={`row shadow-sm mx-0 ${style.row}`}>
                <div className={ `col-md-4 px-0 ${style.listImg}`}>
                    <img src={props.image} alt={props.name} class={`img-fluid ${style.imgFluid}`} />
                </div>
                <div class="col-md-4">
                    <div class="card-body">
                        <h5 className={`${style.restname} card-title mt-5`}>
                   {props.name}
                        </h5>
                    </div>
                </div>
                <div class="col-md-4 d-flex ">
                    <div className={`card-body ${style.deliD}`}>
                        <h6 class="card-title text-dark">
                        ₹{props.deliveryFee} Delivery Fee.
                        </h6>
                        <p class="card-text text-danger">
                   <h6>Free delivery over Rs.500</h6>
                        </p>
                    </div>
            
                </div>
            </div>
        </div> 

        </Link>
    </React.Fragment>
  )
}

export default RestaurantItems;