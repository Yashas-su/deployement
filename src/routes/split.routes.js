const splitController = require("../controllers/split.controllers")

const express = require("express")
const router = express.Router();

// POST   /create          → Create split expense
// GET    /:groupId        → Get splits for group
// PUT    /pay/:splitId    → Mark as paid

router.post("/create",splitController.createSplit);
router.get("/:groupid/get",splitController.getSplit);
router.put("/pay/:splitid/member/:userid",splitController.paySplit)

module.exports = router