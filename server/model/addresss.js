const mongoose=require('mongoose')

const addressSchema=new mongoose.Schema({
    address:{
        type:String,
        require:true
    },
    flatNo:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    landmark:{
        type:String,
        require:true
    },
    pincode:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        require:true
    }
})

const Address=mongoose.model('Address',addressSchema)

module.exports= Address