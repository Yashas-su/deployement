const express = require("express")
const router=express.Router();
const walletController=require("../controllers/wallet.controllers")
const authController = require("../middleware/auth.middle")

router.get("/balance",authController,walletController.getBalance)//done
router.get("/:id/",walletController.getWallet)//done
router.get("/:id/transactions/",walletController.getTransaction)//done

module.exports = router;