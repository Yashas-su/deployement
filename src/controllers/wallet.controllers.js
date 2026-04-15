const walletModel = require("../models/wallet.model")

// async function getWallet(req,res){

// const id = req.params.id
// const wallet = await walletModel.findOne({
//     _id : id,
// })
// if(!wallet){
//     return res.status(409).json({
//         message : "wallet doesnt exist"
//     })
// }

// return res.status(200).json({
//     message : "wallet fetched successfully",
//     wallet : wallet
// })
// }

async function getWallet(req, res) {
  try {
    const userId = req.user.id;

    const wallet = await walletModel.findOne({ userid: userId });

    if (!wallet) {
      return res.status(404).json({
        message: "wallet not found"
      });
    }

    return res.status(200).json({
      balance: wallet.balance
    });

  } catch (err) {
    return res.status(500).json({
      message: "error",
      error: err.message
    });
  }
}

async function getBalance(req, res) {
  const userId = req.user.id; // or req.user._id depending on your JWT

  const wallet = await walletModel.findOne({
    userid: userId
  });

  if (!wallet) {
    return res.status(404).json({
      message: "wallet doesnt exist"
    });
  }

  return res.status(200).json({
    message: "wallet balance fetched successfully",
    balance: wallet.balance
  });
}

async function getTransaction(req,res){
    const id = req.params.id
    const wallet = await walletModel.findOne({
        _id : id
    })
    if(!wallet){
       return res.status(409).json({
            message : "wallet doesn't exist"
        })
    }
    return res.status(200).json(
    {
        message : "transaction fetched successfully",
        transaction : wallet.transaction
    }
    )
}

module.exports = { getWallet , getBalance , getTransaction }
