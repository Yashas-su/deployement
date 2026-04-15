const mongoose = require("mongoose")
const { Schema } = mongoose;
const insightSchema = mongoose.Schema({
    userid :{
    type : Schema.Types.ObjectId, 
    ref : 'user'
    },
    summary : {
        type : String,
        required : true
    },
    suggestion : {
        type : String,
    }

},{
    timestamps : true
})
const insightModel = mongoose.model('insight',insightSchema)
module.exports = insightModel;
