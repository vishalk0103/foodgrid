import React from "react";
import style from "./RestaurantItem.module.css";
import RestaurantItems from "./RestaurantItem";
import Footer from '../home/footer'
import RestaurantCategory from "./RestaurantCategory";
import NoRestaurant from './No-restaurants'

const RestaurantList = (props) => {
  if(props.items.length ===0){
    return <NoRestaurant/>
  }
  return (
    <React.Fragment>
      <RestaurantCategory />
      <div className={`col-md-7 pb-1 offset-3 ${style.listItem}`}>
        <h4 className="mb-4">Local Restaurants Nearby</h4>
        {props.items.map((restaurant) => (
          <RestaurantItems
            id={restaurant._id}
            key={restaurant._id}
            name={restaurant.name}
            image={restaurant.image}
            deliveryFee={restaurant.deliveryFee}
            location={restaurant.location}
          />
        ))}
      </div>
      <div className={style.resFooter}>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default RestaurantList;
