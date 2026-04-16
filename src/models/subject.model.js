const mongoose = require("mongoose");
const { Schema } = mongoose;
const subjectSchema = mongoose.Schema({
    name  : {
        type  : String,
        required : true
    },
    code : {
        type : String,
        unique : true,
        required : true
    }
},
    {timestamps:true}
)
const subjectModel = mongoose.model('subject',subjectSchema)
module.exports = subjectModel