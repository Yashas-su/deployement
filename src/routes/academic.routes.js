const express = require("express")
const router = express.Router();
const academicControllers = require("../controllers/academic.controllers");
const authMiddleware = require("../middleware/auth.middle");

router.post("/attendenc",academicControllers.markAttendence)
router.get("/attendence",academicControllers.getAttendence)
router.get("/timetable/:userid",academicControllers.getTimetable)
router.post("/timetable",academicControllers.createTimetable)
router.put("/timetable",academicControllers.updateTimetable)
router.get("/announcements",academicControllers.getAnnouncements)
router.post("/announcements/create",academicControllers.createAnnouncements)

module.exports = router