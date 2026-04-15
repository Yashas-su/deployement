const attendenceModel = require("../models/attendence.model");
const timetableModel = require("../models/timetable.model")
const announcementModel = require("../models/announcement.model")

async function markAttendence(req,res){
    const data = req.body
    const attendence = await attendenceModel.create(
    {
    userid : data.userid,
    subjectid : data.subjecid,
    totalclasses : data.totalclasses,
    attendendclasses : data.attendendclasses
    })

    return res.status(200).json({
    message : "attendence marked successfully",
    attendence  : attendence
    })

}

async function getAttendence(req,res){  
    const userId  = req.params.userid
    const attendence = await attendenceModel.findOne({
        userid : userId
    })
    if(!attendence){
        return res.status(409).json({
            message : "failed to get attendence"
        })
    }
    return res(200).json({
        message : "attendence fetched successfully",
        attendence : attendence
    })
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

async function getTimetable(req,res){
    const userId  = req.params.userid
    const timetable = await timetableModel.findOne({
        userid : userId
    })   
    if(!timetable){
        return res.status(409).json({
            message : "failed to get timetable"
        })
    }
    return res(200).json({
        message : "timetable fetched successfully",
        timetable : timetable
    })


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