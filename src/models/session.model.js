const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const { refreshToken } = require('../controllers/user.controllers');

const sessionSchema = mongoose.Schema({
    userid: {
        type :  mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    refreshTokenHash : {
        type: String,
        required  : true
    },
    ip  : {
        type : String,
        required : true
    },
    userAgent : {
        type : String,
        required : true
    },
    revoked :  {
        type  : Boolean,
        default : false
    }
},
{
    timestamps : true
})

const sessionModel = mongoose.model('session',sessionSchema)
module.exports = sessionModel