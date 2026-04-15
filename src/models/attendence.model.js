const mongoose = require("mongoose");
const { Schema } = mongoose;
const attendenceSchema = mongoose.Schema({
    userid :{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    subjectid : {
        type: Schema.Types.ObjectId,
         ref: 'subject'
    },
    totalclasses : {
        type : Number,
        required : true
    },
    attendendclasses : {
        type : Number,
        required : true,
    }
},{
    timestamps : true
})
const attendenceModel = mongoose.model('attendence',attendenceSchema)
module.exports = attendenceModel
