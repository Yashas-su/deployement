const mongoose = require("mongoose");
const { Schema } = mongoose;
const walletSchema=mongoose.Schema({
    userid:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    balance:{
        type:Number,
        required:true
    },
    transaction:[{
        transactionid:{
        type: Schema.Types.ObjectId,
        ref: 'transcation'
        }
    }]
},{
    timestamps:true
})
const walletModel=mongoose.model('wallet',walletSchema)
module.exports=walletModel
