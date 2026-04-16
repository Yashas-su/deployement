const mongoose = require("mongoose");
const { Schema } = mongoose;
const studentSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required  : true,
        unique  : true
    },
    password : {
        type : String,
        required : true,
    },
    section : {
        type : String,
        required : true,
    },
    college : {
        type : String,
        required : true
    },
    phoneno : {
        type: String,
        required : true,
    },
    rollno : {
        type : String,
        required : true
    },
    address : {
        type : String ,
        required : true
    },
    program : {
        type : String,
        enum : ["Btech","Mtech","Bca"],
        default : "Btech"
    },
    image : {
        type : String,
    }, 
})
const studentModel = mongoose.model('student',studentSchema);
module.exports = studentModel;