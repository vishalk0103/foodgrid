import React, { useEffect, useState } from "react";
import AddressList from "./AddressList";
import AddressForm from "./AddressForm";
import useHttp from "../Hooks/useHttp";
import AddressButton from "./AddressButton";
import { useSelector } from "react-redux";

const Address = () => {
  const user = useSelector(state=>state.auth)
  const { sendRequest } = useHttp();
  const [addForm, setAddForm] = useState(false);
  const [loadedAddress, setLoadedAddress] = useState([]);
  useEffect(() => {
      if (user) {
      sendRequest(
        {
          url: process.env.REACT_APP_BACKEND + `/address/${user.userId}`,
        },
        (loadAddress) => {
          setLoadedAddress(loadAddress.addresses);
        }
      );
    }
    }, [sendRequest]);

  const onHideAddFormHandler = () => {
    setAddForm(false);
  };

  const newAddress = (data) => {
    setLoadedAddress(data);
  };

  const addressDeleteHandler = async () => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND + `/address/${user.userId}`
    );
    const responseData = await response.json();
    setLoadedAddress(responseData.addresses);
  };

  const showFormHandler = () => {
    setAddForm(true);
  };

  return (
    <React.Fragment>
      {loadedAddress.length < 1 && <AddressButton onClick={showFormHandler} />}
      <AddressForm
        show={addForm}
        newAdd={newAddress}
        formShow={setAddForm}
        onHide={onHideAddFormHandler}
      />

      <AddressList
        onAddressDelete={addressDeleteHandler}
        items={loadedAddress}
      />
    </React.Fragment>
  );
};
export default Address;
