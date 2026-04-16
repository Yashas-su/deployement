const mongoose = require("mongoose");
const { Schema } = mongoose;
const groupSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    members: [{
  userid: Schema.Types.ObjectId
}]
},{
    timestamps:true
})
const groupModel=mongoose.model('group',groupSchema)
module.exports=groupModel