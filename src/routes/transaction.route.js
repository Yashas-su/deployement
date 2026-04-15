const express = require("express")
const router=express.Router()
const transactionController=require("../controllers/transaction.controllers")
const authMiddleware = require("../middleware/auth.middle")

router.post("/send",authMiddleware,transactionController.sendMoney)//done
router.get("/history",authMiddleware,transactionController.transactionHistory)//done
router.post("/request",transactionController.requestMoney)//done
router.get("/:userid/requests",transactionController.getAllRequest)//done
router.put("/request/:requestid",transactionController.acceptOrDeclineRequest)//done

// router.post("/qr-pay",transactionController.sendMoneyQr) ===>//as if now not neccessary can be done by /send

module.exports=router;