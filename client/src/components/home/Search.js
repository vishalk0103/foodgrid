import React, { useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [checkValue, setCheckValue] = useState(true);
  const onChange = (e) => {
    setLocation(e.target.value.trim().toLowerCase());
    if (location.length < 0) {
      return setCheckValue(false);
    } else {
      return setCheckValue(true);
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (location.length < 1) {
      return setCheckValue(false);
    }
    setCheckValue(true);
    navigate(`${location}/restaurants`);
  };
  return (
    <React.Fragment>
      <div className="col-md-7 offset-md-2 search-sec">
        <h1 className="text-center ">DO WHAT FEEDS YOU.</h1>

        <form onSubmit={formSubmitHandler}>
          <div class="input-group ">
            <span className="input-group-text bg-white" id="basic-addon1">
              <img
                className="bg-white "
                src="https://img.icons8.com/ios-filled/2x/marker.png"
              />
            </span>
            <input
              type="text"
              placeholder="Enter Your Address"
              name="location"
              class="form-control"
              style={{ textTransform: "capitalize" }}
              aria-describedby="basic-addon1"
              autoFocus
              value={location}
              onChange={onChange}
            />
          </div>

          <div class="mb-3">
            {checkValue && (
              <button type="submit" className=" btn btn-s">
                FIND RESTAURANTS IN YOUR AREA
              </button>
            )}
            {!checkValue && (
              <button type="submit" className=" btn btn-valid btn-danger">
                PLEASE ENTER CITY.
              </button>
            )}
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
export default Search;
