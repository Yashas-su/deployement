const mongoose = require ("mongoose");
const { Schema } = mongoose;
const profileSchema = mongoose.Schema({
    userid:{
    type: Schema.Types.ObjectId,
    ref: 'user'
    },
    phoneno:{
        type:String,
        required:true,
        unique:true
    },
    avatar:{
        type:String,
    },
    college:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})
const profileModel=mongoose.model('profile',profileSchema)
module.exports=profileModel
