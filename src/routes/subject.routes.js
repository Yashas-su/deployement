const express = require("express")
const router = express.Router();
const subjectControllers = require("../controllers/subject.controllers")

router.post("/create",subjectControllers.createSubject)

module.exports = router