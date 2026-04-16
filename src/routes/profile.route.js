const express = require("express")
const router = express.Router();
const profileController = require("../controllers/profile.controllers")
const authMiddleware = require("../middleware/auth.middle")
router.get("/getme",authMiddleware,profileController.getProfile)  //done
router.put("/update",authMiddleware,profileController.updateProfile) //done

module.exports=router;