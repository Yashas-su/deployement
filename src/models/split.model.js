const mongoose = require("mongoose");
const { Schema } = mongoose;
const splitSchema=mongoose.Schema({
    groupid:{
        type:String,
        required:true
    },

    totalamount:{
        type:Number,
        required:true
    },
    splitdetails: [{
        userid : {
        type: Schema.Types.ObjectId,
        ref: 'user'
        },
        amount:{
            type : Number,
            required : true
        },
        paid:{
            type:String,
            enum :['pending','paid'] ,
            default : 'pending'
        }
    }]
},
{
    timestamps:true
})
const splitModel=mongoose.model('split',splitSchema)
module.exports=splitModel