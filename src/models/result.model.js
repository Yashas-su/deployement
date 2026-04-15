const mongoose = require("mongoose");
const { Schema } = mongoose;
const resultSchema = mongoose.Schema({
userid : {
    type  : Schema.Types.ObjectId,
    ref : 'user'
},
subjectid:{
    type: Schema.Types.ObjectId, 
    ref: 'subject'
},
marks : {
    type  : Number,
    required : true
},
grade  : {
    type : String,
    required : true
},
examtype : {
    type : String,
    required : true
}
}, {
    timestamps : true
})
const resultModel = mongoose.model("result",resultSchema)
module.exports = resultModel