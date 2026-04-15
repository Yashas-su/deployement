const mongoose = require("mongoose");
const { Schema } = mongoose;
const timetableSchema = mongoose.Schema({
    userid : {
            type: Schema.Types.ObjectId,
            ref: 'user'
    },
    scheduele : [{
        day : {
            type  : String,
            required  : true
        },
        subjectid : {
            type: Schema.Types.ObjectId,
            ref: 'subject'
        },
        startTime : {
            type : String,
            required : true
        },
        endTime : {
            type  : String,
            required : true
        }
    }

]},
{timestamps  : true})
const timetableModel = mongoose.model('timetable',timetableSchema)
module.exports = timetableModel