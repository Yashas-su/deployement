const mongoose = require("mongoose");
const timetableSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  schedule: [
    {
      day: {
        type: String,
        required: true
      },
      subjectid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
        required: true
      },
      startTime: {
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true
      },
      room: {
        type: String,
        required: true
      },
      type: {
        type: String,
        enum: ["lecture", "lab", "tutorial"],
        required: true
      }
    }
  ]
});
const timetableModel = mongoose.model('timetable',timetableSchema)
module.exports = timetableModel


