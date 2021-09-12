import React, { useState, useEffect } from "react";
import NavBarNew from "../../shared/components/UIElement/NavbarNew";
import Spinner from "../../shared/components/UIElement/Spinner";
import { useParams } from "react-router";
import FoodList from "../components/FoodList";
import FoodItemsHeader from "../components/FoodItemsHeader";
import Footer from "../../home/components/footer";
import Cart from "../components/Cart";
import style from "./Foods.module.css";

const Foods = (props) => {
  const [loadedFoods, setLoadedFoods] = useState();
  const [restaurant, setResaurant] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const restId = useParams().restId;
  useEffect(() => {
    setIsLoading(true);
    try {
      const fetchFoods = async () => {
        const response = await fetch(
          process.env.REACT_APP_BACKEND+`/foods/restaurant/${restId}`
        );
        const responseData = await response.json();
        setLoadedFoods(responseData.foods);
        setResaurant(responseData.rest);
        setIsLoading(false);
      };
      fetchFoods();
    } catch (err) {
      console.log(err);
    }
  }, [restId]);

  return (
    <React.Fragment>
      <NavBarNew />
      {isLoading && <Spinner />}
      {!isLoading && <FoodItemsHeader restaurant={restaurant}  />}
      {!isLoading && loadedFoods && (
        <FoodList foods={loadedFoods}/>
      )}
        <div className='mt-3'>
      {!isLoading && <Footer  />}
      </div>
    </React.Fragment>
  );
};
export default Foods;
