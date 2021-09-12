const mongoose= require('mongoose')

const foodSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:String,
        require:true
    },
    type:{
        type:String,
        required:true
    },
    restaurant:{
        type:mongoose.Types.ObjectId,
        ref:'Restaurant',
        required:true
    }
})

const Food= mongoose.model('Food',foodSchema);

module.exports= Food;