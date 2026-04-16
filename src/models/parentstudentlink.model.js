const mongoose = require("mongoose");
const { Schema } = mongoose;
const parentstudnentslinkSchema=mongoose.Schema({
    parentid:{
        type: Schema.Types.ObjectId, 
        ref: 'parent'
    },
    studentid:{
        type: Schema.Types.ObjectId, 
        ref: 'student'
    },
    permission: {
            viewexpenses : {
                type : Boolean
            },
            viewacademics : {
                type : Boolean
            }
    }
},{
    timestamps:true
})
const parentstudnentslinkModel=mongoose.model('parentstudnentslink',parentstudnentslinkSchema)