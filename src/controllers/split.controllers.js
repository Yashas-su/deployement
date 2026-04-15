const groupModel = require("../models/group.model");
const splitModel = require("../models/split.model");
const trasactionModel = require("../models/transaction.model");
const walletModel = require("../models/wallet.model")

async function createSplit(req,res){
    const data = req.body
    const split = await splitModel.create({
        groupid : data.groupid,
        totalamount : data.totalamount,
        splitdetails : data.splitdetails
    })
    if(!split){
        return res.status(409).json({
            message : "split creation failed"
        })
    }
    return res.status(201).json({
        message : "split created successfully",
        split : split
    })
}

async function getSplit(req,res){
const groupId = req.params.groupdid
const split = await splitModel.findOne({
    groupid :groupId
})
if(!split){
    return res.status(409).json({
        message : "group does not exist"
    })
}
return res.status(200).json({
    message : "split data fetched successfully",
    split : split
}
)
}

async function paySplit(req,res){
const splitId = req.params.splitid
const userId = req.params.userid
const split = await splitModel.findOne({
    _id : splitId,
})
if(!split){
    return res.status(409).json({
        message : "split does not exist"
    })
}
const wallet = await walletModel.findOne({
    userid :  userId
})
if(!wallet){
    return res.status(409).json({
        message : "wallet doesnt not exist"
    })
}

async function findSplitAmount(userId){
    const payers = await split.splitdetails
    for (let index = 0; index <payers.length; index++) {
        if(payers[index].userid == userId){
            return payers[index].amount
        }
        return res.status(409).json({
            message : "you dont have the split payment"
        })

}
}
const splitAmount = await findSplitAmount(userId)
}

module.exports = {createSplit,getSplit,paySplit}