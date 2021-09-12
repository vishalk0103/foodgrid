import React, { useState, useContext } from "react";
import AddressItem from "./AddressItem";
import AddressButton from "./AddressButton";
import { AuthContext } from "../store/Auth-context";

const AddressList = (props) => {
  const auth = useContext(AuthContext);
  if (props.items.length <1) {
    return <AddressButton setShowForm={props.setShowForm} />;
  }
  

  return (
    <React.Fragment>

      {props.items.map((item) => (
        <AddressItem
          key={item._id}
          id={item._id}
          address={item.address}
          flatNo={item.flatNo}
          city={item.city}
          landmark={item.landmark}
          pincode={item.pincode}
          onDelete={props.onAddressDelete}
        />
      ))}
    </React.Fragment>
  );
};

export default AddressList;
