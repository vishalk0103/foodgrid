import React, { useState, useEffect } from "react";
import NavBarNew from "../components/shared/NavbarNew";
import Spinner from "../components/shared/Spinner";
import { useParams } from "react-router-dom";
import FoodList from "../components/foods/FoodList";
import FoodItemsHeader from "../components/foods/FoodItemsHeader";
import Footer from "../components/home/footer";
import useHttp from "../components/Hooks/useHttp";

const Foods = () => {
  const [loadedFoods, setLoadedFoods] = useState();
  const [restaurant, setResaurant] = useState([]);
  const { restId } = useParams();
  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    sendRequest(
      { url: process.env.REACT_APP_BACKEND + `/foods/restaurant/${restId}` },
      (data) => {
        setLoadedFoods(data.foods);
        setResaurant(data.rest);
        console.log(data);
      }
    );
  }, [sendRequest]);

  return (
    <React.Fragment>
      <NavBarNew />
      {isLoading && <Spinner />}
      {!isLoading && <FoodItemsHeader restaurant={restaurant} />}
      {!isLoading && loadedFoods && <FoodList foods={loadedFoods} />}
      <div className="mt-3">{!isLoading && <Footer />}</div>
    </React.Fragment>
  );
};
export default Foods;
