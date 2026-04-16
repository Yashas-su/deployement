const profileModel = require("../models/profile.model");
const userModel = require("../models/user.model");
const walletModel = require("../models/wallet.model")

async function getUser(req,res){
const id = req.params.id;
console.log(id)
const user = await userModel.findById({
    _id : id
})
if(!user){
    return res.status(400).json({
        message : "user not found"
    })
}
res.status(200).json({
    message : "user fetched successfully",
    username  : user.name,
    email : user.email,
    role : user.role

})
}

async function updateUser(req,res){
const id = req.params.id;
const data = req.body
console.log(data)
const user = await userModel.findOneAndUpdate({
    _id : id
},
{
    $set : {
        name : data.name,
        role : data.role,
        email : data.email
    }

})
if(!user){
    return res.status(400).json({
        message : "user not found"
    })
}
res.status(200).json({
    message : "user data updated successfully",
    username  : data.name,
    email : data.email,
    role : data.role

})
}

async function deleteUser(req,res){
const id = req.params.id;
const user = await userModel.findOneAndDelete({
    _id : id
})
const wallet = await walletModel.findOneAndDelete({
    userid : id
})
const profile = await profileModel.findOneAndDelete({
    userid : id
})
if(!user){
    return res.status(400).json({
        message : "user not found"
    })
}
res.status(200).json({
    message : "user deleted successfully",
    username  : user.name,
    email : user.email,
    role : user.role,
    wallet : wallet,
    profile : profile,
    user : user

})
}

module.exports = {getUser,updateUser,deleteUser}