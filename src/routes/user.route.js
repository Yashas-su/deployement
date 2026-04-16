const express = require('express')
const router = express.Router();
const userController = require("../controllers/user.controllers")

router.get('/:id/get/',userController.getUser)//done
router.post("/:id/update",userController.updateUser)//done
router.get("/:id/delete",userController.deleteUser)//done





module.exports = router;