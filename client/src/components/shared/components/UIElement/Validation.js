const Validation=(values)=>{
    let errors={};

    if(!values.address){
        errors.address="Address is required.";
    }
    if(!values.flatNo){
        errors.flatNo = 'Door / Flat No is required';
    }
    if(!values.city){
        errors.city="City is required."
    }
    if(!values.landmark){
        errors.landmark="Landmark is required."
    }
    if(!values.pincode){
        errors.pincode="Pincode is required."
    }
    if(!values.username){
        errors.username="Username is required"
    }
    if(!values.email){
        errors.email="Email is required"
    }
    if(!values.password){
        errors.password="Password is required"
    }
    return errors;
}

export default Validation;