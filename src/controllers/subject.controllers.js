const subjectModel = require("../models/subject.model")

async function createSubject(req,res){
    const data = req.body
    const subject = await subjectModel.create({
        name : data.name,
        code : data.code
    })

    res.status(200).json({
        message : "subject added succesfully",
        subject : subject
    })
}

module.exports = {createSubject}