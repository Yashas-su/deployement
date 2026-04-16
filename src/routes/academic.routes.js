const express = require("express")
const router = express.Router();
const academicControllers = require("../controllers/academic.controllers");
// const authMiddleware = require("../middleware/auth.middle")
const authMiddleware = require("../middleware/auth.middle");

router.post("/attendence",academicControllers.markAttendence)
router.get("/attendence",authMiddleware,academicControllers.getAttendence)

router.get("/timetable",authMiddleware,academicControllers.getTimetable)
router.post("/timetable",authMiddleware,academicControllers.createTimetable)
router.put("/timetable",academicControllers.updateTimetable)
router.get("/announcements",academicControllers.getAnnouncements)
router.post("/announcements/create",academicControllers.createAnnouncements)

module.exports = router