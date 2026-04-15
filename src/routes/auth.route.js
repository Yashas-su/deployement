const express = require("express")
const authcontroller = require("../controllers/auth.controllers")
const router = express.Router();

router.post("/register",authcontroller.registerUser)
router.get("/refresh-token",authcontroller.refreshToken)
router.get("/logout",authcontroller.logout)
// router.post("/me",getMe)
router.post('/login',authcontroller.loginUser)

module.exports = router; 