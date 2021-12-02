import React, { useState, useEffect } from "react";
import NavBarNew from "../../shared/components/UIElement/NavbarNew";
import Spinner from "../../shared/components/UIElement/Spinner";
import RestaurantList from "../components/RestaurantList";
import NoRestaurant from "../components/No-restaurants";
import { useParams } from "react-router";

const Restaurants = (props) => {
  const location = useParams().location;
  const [loadedRestaurants, setLoadedRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const sendRequest = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND + `/restaurants/location/${location}`
        );

        const responseData = await response.json();
        setLoadedRestaurants(responseData.restaurants);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    sendRequest();
  }, [location]);

  return (
    <React.Fragment>
      <NavBarNew />

      {loadedRestaurants.length === 0 && !isLoading && <NoRestaurant />}
      {isLoading && <Spinner />}
      {!isLoading && loadedRestaurants.length > 0 && (
        <RestaurantList items={loadedRestaurants} />
      )}
    </React.Fragment>
  );
};

export default Restaurants;
