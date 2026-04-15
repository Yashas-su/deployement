const mongoose = require("mongoose");
const { Schema } = mongoose;
const paymentrequestSchema = mongoose.Schema({
    fromuser:{
        type:String,
        required:true
    },
    touser:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['pending','paid','rejected']
    }
},{
    timestamps:true
})
const paymentrequestModel=mongoose.model('paymentrequest',paymentrequestSchema)
module.exports = paymentrequestModel