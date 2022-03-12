import {useState} from 'react'

const useForm=(validInput)=>{
    const [enteredValue, setEnteredValue ]= useState('');
    const [isTouched, setIsTouched ]= useState(false);

    const valueIsValid= validInput(enteredValue)
    const hasError= !valueIsValid && isTouched;

    const inputChangeHandler=(e)=>{
        setEnteredValue(e.target.value);
    }

    const inputBlurHandler=(e)=>{
        setIsTouched(true)
    }

    const reset=()=>{
        setEnteredValue('')
        setIsTouched(false)
    }

    return {
        value:enteredValue,
        inputBlurHandler,
        inputChangeHandler,
        hasError,
        valueIsValid,
        reset
        
    }

    
}

export default  useForm;