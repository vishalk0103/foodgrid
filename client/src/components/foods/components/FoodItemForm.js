import React,{useRef} from 'react'
import Input from '../../shared/components/FormElement/Input'
import style from './FoodItemForm.module.css'

const FoodItemForm=(props)=>{
    const amountInputRef=useRef()
    const formSubmitHandler=(e)=>{
        e.preventDefault()
        const enteredAmount= amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if(enteredAmount.trim().length <1){
            return;
        }
        props.onAddCartItem(enteredAmountNumber)
    }
    return(
        <React.Fragment>
              <form className={`mt-2 ${style.form}`} onSubmit={formSubmitHandler} >
            <Input ref={amountInputRef} className={style.input} label='Amount' input={{
                
                id:'amount',
                type:'number',
                min:'1',
                max:'5',
                step:'1',
                defaultValue:'1'
            }}/>
            <button ><span> Add</span></button>
        </form>
        </React.Fragment>
    )
}

export default FoodItemForm;