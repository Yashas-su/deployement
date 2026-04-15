const mongoose = require('mongoose');
const { Schema } = mongoose;
const announcementSchema = mongoose.Schema({
    title : {
        type : String,
        required  : true
    },
    description : {
        type : String,
        required : true
    },
    target : {
        type : String,
        enum : ['all','course','user']
    }
},{
    timestamps : true
})
const announcementModel = mongoose.model('announcement',announcementSchema)
module.exports = announcementModel