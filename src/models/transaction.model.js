const mongoose = require("mongoose");
const { Schema } = mongoose;
const transactionSchema=mongoose.Schema({
    senderid:{
        type:String,
        required:true,
    },
    receiverid:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        enum:['upi','qr','split','group']
    },
    status:{
        type:String,
        enum:['pending','completed']
    }

},{
    timestamps:true
})
const transactionModel=mongoose.model('transaction',transactionSchema)
module.exports=transactionModel