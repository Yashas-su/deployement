const express = require("express")
const router = express.Router();
const groupController=require("../controllers/group.controllers")
const authMiddleware = require("../middleware/auth.middle")
router.post("/create",groupController.createGroup)//tested
router.get("/get",authMiddleware,groupController.getGroup)//tested
// router.post("/:groupid/add-member",groupController.addGroupMember)//tested

module.exports=router;