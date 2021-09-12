const mongoose=require('mongoose')

const restaurantSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    deliveryFee:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    foods:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Food',
            required:true
        }
    ],
        coordinate:{
        type:{
            type:String,
            enum:['Point'],

        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
})

const Restaurant = mongoose.model('Restaurant',restaurantSchema)

module.exports= Restaurant