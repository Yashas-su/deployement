// step 1 import mongoose
const mongoose = require("mongoose");
const { Schema } = mongoose;

// step 2 create schema
const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['student','parent','admin'],
        default : 'student'
    },
    profile : {
        type: Schema.Types.ObjectId,
        ref: 'profile'
    },
    wallet : {
        type: Schema.Types.ObjectId,
        ref: 'wallet'
    }
}, 
{
timestamps: true
}
)

// step 3 create model
const userModel = mongoose.model('user',userSchema)

// step 4 export model
module.exports = userModel