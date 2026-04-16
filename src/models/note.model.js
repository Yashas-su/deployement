const mongoose = require("mongoose");
const { Schema } = mongoose;
const noteSchema = mongoose.Schema({
    userid : {
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    subjectid : {
        type: Schema.Types.ObjectId, 
        ref: 'subject'
    },
    title : {
        type  : String,
        required : true
    },
    fileurl : {
        type : String,
    }
},{
    timestamps : true
})
const noteModel = mongoose.model('note',noteSchema)
module.exports = noteModel