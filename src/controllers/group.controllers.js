const groupModel = require("../models/group.model")
const profileModel = require("../models/profile.model")
const mongoose = require("mongoose")


async function createGroup(req, res) {
  try {
    const { name, phoneno } = req.body

    if (!name || !phoneno || phoneno.length === 0) {
      return res.status(400).json({
        message: "name and phoneno required"
      })
    }

    const group = await groupModel.create({
      name,
      members: []
    })

    const addedUsers = new Set()

    for (let i = 0; i < phoneno.length; i++) {
      const phone = phoneno[i]

      const profile = await profileModel.findOne({ phoneno: phone })

      if (!profile) continue

      const userId = profile.userid.toString()

      if (addedUsers.has(userId)) continue
      addedUsers.add(userId)

      // ✅ IMPORTANT FIX
      group.members.push({ userid: userId })
    }

    // ✅ ADD CREATOR
    if (req.user?.id && !addedUsers.has(req.user.id)) {
      group.members.push({ userid: req.user.id })
    }

    await group.save()

    return res.status(201).json({
      message: "group created successfully",
      group
    })

  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: "server error"
    })
  }
}

async function getGroup(req, res) {
  try {
    const userId = req.user.id

    console.log("REQ.USER:", req.user)

    const groups = await groupModel.find({
      "members.userid": userId
    })

    console.log("FOUND GROUPS:", groups)

    return res.status(200).json({
      message: "groups fetched successfully",
      group: {
        group: groups
      }
    })

  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: "server error"
    })
  }
}

module.exports = {createGroup,getGroup}