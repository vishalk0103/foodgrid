import React, { useState, useEffect } from "react";
import NavBarNew from "../components/shared/NavbarNew";
import Spinner from "../components/shared/Spinner";
import RestaurantList from "../components/restaurants/RestaurantList";
import { useParams } from "react-router";
import useHttp from "../components/Hooks/useHttp";

const Restaurants = () => {
  const location = useParams().location;
  const [loadedRestaurants, setLoadedRestaurants] = useState([]);

  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    const loadData = (restaurants) => {
      setLoadedRestaurants(restaurants.restaurants);
    };
    sendRequest(
      {
        url:
          process.env.REACT_APP_BACKEND + `/restaurants/location/${location}`,
      },
      loadData
    );
  }, [sendRequest]);

  return (
    <React.Fragment>
      <NavBarNew />
      {isLoading && <Spinner />}
      {!isLoading && <RestaurantList items={loadedRestaurants} />}
    </React.Fragment>
  );
};

export default Restaurants;
