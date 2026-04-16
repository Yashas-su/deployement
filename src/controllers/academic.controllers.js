const attendenceModel = require("../models/attendence.model");
const timetableModel = require("../models/timetable.model")
const announcementModel = require("../models/announcement.model")
const subjectModel = require("../models/subject.model")

async function markAttendence(req, res) {
  try {
    const data = req.body

    const attendence = await attendenceModel.findOneAndUpdate(
      {
        userid: data.userid,
        subjectid: data.subjectid,
      },
      {
        $inc: {
          totalclasses: data.totalclasses || 0,
          attendendclasses: data.attendendclasses || 0,
        },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    ).populate("subjectid", "name code") // ✅ IMPORTANT FIX

    return res.status(200).json({
      message: "attendance marked successfully",
      attendence,
    })
  } catch (err) {
    return res.status(500).json({
      message: "error marking attendance",
      error: err.message,
    })
  }
}

async function getAttendence(req, res) {
  try {
    const userId = req.user.id

    const attendence = await attendenceModel
      .find({ userid: userId })
      .populate("subjectid", "name code")

    if (attendence.length === 0) {
      return res.status(404).json({
        message: "no attendance found",
        attendence: [],
      })
    }

    return res.status(200).json({
      message: "attendance fetched successfully",
      attendence,
    })
  } catch (err) {
    return res.status(500).json({
      message: "failed to get attendance",
      error: err.message,
    })
  }
}
async function createTimetable(req,res) {
const data = req.body
const timetable = await timetableModel.create({
    userid : data.userid,
    scheduele : data.scheduele
}
)
return res.status(200).json({
    message : "timetable created successfully",
    timetable : timetable
})
}

async function getTimetable(req, res) {
  try {
    const userId = req.user.id

    const timetable = await timetableModel
      .findOne({ userid: userId })
      .populate("scheduele.subjectid", "name code") // or schedule if renamed

    return res.status(200).json({
      message: "timetable fetched successfully",
      timetable,
    })
  } catch (err) {
    return res.status(500).json({
      message: "failed to get timetable",
      error: err.message,
    })
  }
}

async function updateTimetable(req,res){
    const data = req.body
    const timetable = await timetableModel.findOneAndUpdate({
        userid : data.userid
    },{
        scheduele : data.scheduele
    },{
        new : true
    } )
    if(!timetable){
        return res.status(409).json({
            message : "failed to update timetable"
        })
    }   
    return res.status(200).json({
        message : "timetable updated successfully",
        timetable : timetable
    })  
}

async function getAnnouncements(req,res){

    const announcement = await announcementModel.find()

    if(!announcement){
        res.status(409).json({
            message : "no announcements"
        })
    }
    res.status(200).json({
        message  : "announcement fetched successfully",
        announcement : announcement
    })
    
}
 
async function createAnnouncements(req,res){
    const {title,description ,target}= req.body
    const announcement = await announcementModel.create({
        title : title,
        description : description,
        target : target
    })
    res.status(200).json({
        message : "created successfully",
        announcement : announcement
    })
}


module.exports ={markAttendence,getAttendence,createTimetable,getTimetable,updateTimetable,getAnnouncements,createAnnouncements}