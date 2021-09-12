import React,{useEffect, useState ,useContext} from 'react'
import AddressList from './AddressList'
import AddressForm from './AddressForm'
import { AuthContext } from '../store/Auth-context'
import Spinner from '../shared/components/UIElement/Spinner'

const Address=()=>{
    const auth= useContext(AuthContext)
    const [isLoading,setIsLoading] = useState(false)
    const [loadedAddress,setLoadedAddress]=useState([])
    useEffect(()=>{
        setIsLoading(true)
        try{
        const sendRequest=async ()=>{
            const response= await fetch(process.env.REACT_APP_BACKEND+`/address/${auth.userId}`)
            const responseData=await response.json()
            setLoadedAddress(responseData.addresses)
            setIsLoading(false)
        }
        sendRequest()
    }catch(err){

        console.log(err)
    }
    },[])
    const [addForm, setAddForm] = useState(false);
    const onHideAddFormHandler = () => {
      setAddForm(false);
    };
    const newAddress=(data)=>{
        setLoadedAddress(data)
    }
    const addressDeleteHandler=async ()=>{
        const response= await fetch(process.env.REACT_APP_BACKEND+`/address/${auth.userId}`)
        const responseData=await response.json()
        setLoadedAddress(responseData.addresses)
    }

    
    return(
        <React.Fragment>
             {auth.isLoggedIn &&  <AddressForm newAdd={newAddress} formShow={setAddForm} show={addForm} onHide={onHideAddFormHandler} /> }
            <AddressList onAddressDelete={addressDeleteHandler} setShowForm={setAddForm} items={loadedAddress}/>
        </React.Fragment>
    )
}
export default  Address;