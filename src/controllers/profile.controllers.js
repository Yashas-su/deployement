const profileModel = require('../models/profile.model')
const userModel = require("../models/user.model")
async function getProfile(req,res){
    
    const id = req.user.id
    
    const profile = await profileModel.findOne(
        
        {
            userid : id
        }
       
    )
    const user = await userModel.findById({
        _id : id
    })

    if(!profile){
        return res.status(409).json({
            message : "profile doesnt exist"
        })
    }

    console.log(profile)
    console.log(user)
    res.status(200).json({
        message : "profile fetched successfully",
        profile : profile,
        user : user
    })
}

async function updateProfile(req,res){
    const id = req.user.id
    console.log(id)
    console.log(req.body)
    const {phoneno,college,year,course}  = req.body
    const profile = await profileModel.findOneAndUpdate({
        userid : id
    },{
        $set : {
            phoneno : phoneno,
            college : college,
            year :  year,
            course : course
        }
    })
    if(!profile){
        return res.status(409).json({
            message : "profile doesnt exist",
            profile_id  : id
        })
    }
    return res.status(200).json({
        message : "profile updated succesfully",
        profile : profile
    })
    

}
module.exports = {getProfile ,updateProfile}