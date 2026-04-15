const transactionModel = require("../models/transaction.model")
const walletModel = require("../models/wallet.model");
const paymentrequestModel = require("../models/paymentrequest.model")
const profileModel = require("../models/profile.model")

async function sendMoney(req,res){
    const id = req.user.id;
    const {phoneno,amount,type,status} = req.body
    const amountt = Number(amount)
    const senderWallet = await walletModel.findOne({
        userid :id
    })
    const receiver = await profileModel.findOne({
        phoneno : phoneno
    })
    if(!receiver){
        res.status(409).json({
            message :  "no user found"
        })
    }

    const receiverWallet = await walletModel.findOne({
        userid : receiver.userid
    })
    if(!senderWallet){
        return res.status(409).json({
            message : "sender doesnt exist"
        })
    }
    if(!receiverWallet){
        return res.status(409).json({
            message : "receiver doesnt exist"
        })
    }
    if(senderWallet.balance<amountt){
        return res.status(409).json({
            message : 'insufficient balance'
        })
    }
    const transaction = await transactionModel.create({
        senderid : id,
        receiverid :receiverWallet.userid,
        amount : amountt,
        type : type
    })
    senderWallet.balance -= amountt
    receiverWallet.balance += amountt
    const senderTransactionid = senderWallet.transaction 
    senderTransactionid.push(transaction._id)
    const receiverTransactionid = receiverWallet.transaction 
    receiverTransactionid.push(transaction._id)
    await senderWallet.save()
    await receiverWallet.save()
    transaction.status = 'completed'
    await transaction.save();
    return res.status(200).json({
        message : "send money successfully",
        transaction : transaction
    })
}

async function transactionHistory(req,res){
    const id = req.user.id
    const wallet = await walletModel.findOne({
        userid : id
    })
    if(!wallet){
        return res.status(409).json({
            message :  "wallet doesnt exist"
        })
    }
    async function fetchTransaction(transactionId){
        const transactionHistory = await transactionModel.findOne(
           { _id : transactionId}
        )
        return transactionHistory
    }
    const AllTranscations = []
    const userTransactionsId = wallet.transaction
    for (let index = 0; index < userTransactionsId.length; index++) {
        const transactionId = userTransactionsId[index];
        console.log(transactionId)
        const userTransactions = await fetchTransaction(transactionId)
        console.log(userTransactions)
        AllTranscations.push(userTransactions)
    }
    return res.status(200).json({
        message : "user transaction fetched successfully",
        transactions  :  AllTranscations
    })
}

async function requestMoney(req,res){
    const data =  req.body
    const senderId = data.senderid
    const receiverid = data.receiverid
    const requestAmount = data.amount
    const paymentRequest = await paymentrequestModel.create(
        { 
            fromuser : senderId ,
            touser : receiverid,
            amount : requestAmount,
            status : 'pending'
        }
    )
    if(!paymentRequest){
        return res.status(409).json({
            message : "failed to create payment request"
        })
    }
    return res.status(200).json({
        message : "payment request created",
        request : paymentRequest
    })
}

async function getAllRequest(req,res){
    const id  = req.params.userid
    const paymentRequest = await paymentrequestModel.find(
        { touser : id }
    )
    if(!paymentRequest){
        return res.status(200).json({
            message : "No payment requests"
        })
    }
    return res.status(200).json({
        message : "requests fetched successfully",
        requests : paymentRequest
    })
}

async function acceptOrDeclineRequest(req,res){
    const requestId = req.params.requestid
    const payOrReject = req.body
    const POR = Number(payOrReject)
    const paymentRequest = await paymentrequestModel.findOne({
        _id : requestId,
        status : 'pending'
    })
    if(!paymentRequest){
        return res.status(409).json({
            message : "no request found"
        })
    }
    const requestSenderWallet = await walletModel.findOne({
        userid : paymentRequest.fromuser
    })
    if(!requestSenderWallet){
        return res.status(409).json({
            message : "request sender wallet not found"
        })
    }
    const requestReceiverWallet = await walletModel.findOne({
        userid : paymentRequest.touser
    })
    if(!requestReceiverWallet){
        return res.status(409).json({
            message : "request receiver wallet not found"
        })
    }
    if(POR === 0){
        paymentRequest.status = 'rejected'
    }
    if(requestReceiverWallet.balance<paymentRequest.amount){
        return res.status(409).json({
            message : "insuffcient balance"
        })
    }
    requestReceiverWallet.balance -= paymentRequest.amount
    requestSenderWallet.balance += paymentRequest.amount
    paymentRequest.status = 'paid'
    const transaction = await transactionModel.create({
        senderid : requestReceiverWallet.userid,
        receiverid : requestSenderWallet.userid,
        amount : paymentRequest.amount,
        status : 'completed',
        type : 'upi'
    })
    requestReceiverWallet.transaction.push(transaction._id)
    requestSenderWallet.transaction.push(transaction._id)
    await requestReceiverWallet.save()
    await requestSenderWallet.save()
    await paymentRequest.save()
    await transaction.save()
    return res.status(200).json({
        message : 'request paid succesfully',
        transaction : transaction
    })

}

module.exports = { sendMoney , transactionHistory ,requestMoney ,getAllRequest ,acceptOrDeclineRequest}