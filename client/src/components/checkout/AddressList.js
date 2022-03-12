import React, { useState, useContext } from "react";
import AddressItem from "./AddressItem";

const AddressList = (props) => {
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
