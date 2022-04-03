import React, { useState } from "react";

const useForm = (validation) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValidate = validation(value);
  const hasError = !isValidate && isTouched;

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const onBlurHanlder = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue("");
    setIsTouched(false);
  };
  return {
    value,
    isValidate,
    hasError,
    onChangeHandler,
    onBlurHanlder,
    reset,
  };
};

export default useForm;
