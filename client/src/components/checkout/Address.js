import React, { useEffect, useState, useContext } from "react";
import AddressList from "./AddressList";
import AddressForm from "./AddressForm";
import { AuthContext } from "../store/Auth-context";
import useHttp from "../store/useHttp";
import AddressButton from "./AddressButton";

const Address = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttp();
  const [addForm, setAddForm] = useState(false);
  const [loadedAddress, setLoadedAddress] = useState([]);

  useEffect(() => {
    sendRequest(
      {
        url: process.env.REACT_APP_BACKEND + `/address/${auth.userId}`,
      },
      (loadAddress) => {
        setLoadedAddress(loadAddress.addresses);
      }
    );
  }, [sendRequest]);

  const onHideAddFormHandler = () => {
    setAddForm(false);
  };

  const newAddress = (data) => {
    setLoadedAddress(data);
  };

  const addressDeleteHandler = async () => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND + `/address/${auth.userId}`
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
