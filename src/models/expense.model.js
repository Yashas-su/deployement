const mongoose = require("mongoose");
const { Schema } = mongoose;
const expenseSchema=mongoose.Schema({
    userid:{
       type: Schema.Types.ObjectId, 
       ref: 'user'
    },
    amount:{
        type : Number,
        required : true
    },
    category:{
        type : String,
        enum : ['food','transport','shop','others']
    },
    note:{
        type : String,
        required  :true
    }
},
{
    timestamps: true
})
const expenseModel = mongoose.model('expense',expenseSchema)
module.exports = expenseModel