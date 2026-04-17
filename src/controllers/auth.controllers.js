const dotenv = require("dotenv")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const profileModel = require("../models/profile.model")
const walletModel = require("../models/wallet.model")
const sessionModel = require("../models/session.model")
dotenv.config()

const salt = bcrypt.genSaltSync(10);

async function registerUser(req, res) {
  try {
    console.log(req.body)
    const { name, email, password, role, phoneno, college, course, year } = req.body

    const isalreadyRegistered = await userModel.findOne({
      $or: [{ email }, { phoneno }]
    })

    if (isalreadyRegistered) {
      return res.status(401).json({
        message: 'user already exists',
        useremail: email
      })
    }

    const hashpassword = bcrypt.hashSync(password, salt);

    const newUser = await userModel.create({
      name,
      email,
      password: hashpassword,
      role
    })

    console.log(newUser)

    const profileOfNewUser = await profileModel.create({
      userid: newUser._id,
      phoneno,
      college,
      course,
      year
    })

    console.log(profileOfNewUser)

    const walletofNewUser = await walletModel.create({
      userid: newUser._id,
      balance: 0.00
    })

    console.log(walletofNewUser, newUser._id)

    await userModel.findOneAndUpdate(
      { _id: newUser._id },
      { $set: { profile: profileOfNewUser._id, wallet: walletofNewUser._id } }
    )

    const refreshToken = jwt.sign(
      { id: newUser._id },
      process.env.jwt_key,
      { expiresIn: '7d' }
    )

    const refreshTokenHash = bcrypt.hashSync(refreshToken, salt);

    const session = await sessionModel.create({
      userid: newUser._id,
      refreshTokenHash,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    })

    const accessToken = jwt.sign(
      { id: newUser._id, sessionid: session._id },
      process.env.jwt_key,
      { expiresIn: '15d' }
    )

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.status(201).json({
      message: "user registered successfully",
      name,
      email,
      token: accessToken
    })

  } catch (err) {
    console.error("Register error:", err)
    return res.status(409).json({
      message: 'error while registering user try again later',
      error: err.message
    })
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "invalid email or password",
        email
      })
    }

    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        message: "invalid email or password",
        email
      })
    }

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.jwt_key,
      { expiresIn: '7d' }
    )

    const refreshTokenHash = bcrypt.hashSync(refreshToken, salt);

    const session = await sessionModel.create({
      userid: user._id,
      refreshTokenHash,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    })

    const accessToken = jwt.sign(
      { id: user._id, sessionid: session._id },
      process.env.jwt_key,
      { expiresIn: '15d' }
    )

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
      message: "login successful",
      user,
      token: accessToken
    })

  } catch (err) {
    console.error("Login error:", err)
    return res.status(500).json({
      message: "error during login, try again later",
      error: err.message
    })
  }
}

async function refreshToken(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      return res.status(401).json({ message: "no refresh token" })
    }

    const user = jwt.verify(refreshToken, process.env.jwt_key)

    const session = await sessionModel.findOne({ userid: user.id })
    console.log(session)

    if (!session) {
      return res.status(400).json({ message: "invalid refresh token" })
    }

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.jwt_key,
      { expiresIn: '15m' }
    )

    const newRefreshToken = jwt.sign(
      { id: user.id },
      process.env.jwt_key,
      { expiresIn: '15d' }
    )

    const newRefreshTokenHash = bcrypt.hashSync(newRefreshToken, salt)
    session.refreshTokenHash = newRefreshTokenHash;
    await session.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
      message: "token regenerated successfully",
      token: accessToken
    })

  } catch (err) {
    console.error("Refresh token error:", err)
    return res.status(500).json({
      message: "error while refreshing token",
      error: err.message
    })
  }
}

async function logout(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      return res.status(401).json({ message: "no refresh token" })
    }

    const refreshTokenHash = bcrypt.hashSync(refreshToken, salt);

    const session = await sessionModel.findOne({
      refreshTokenHash,
      revoked: false
    })

    if (!session) {
      return res.status(400).json({ message: 'invalid refresh token' })
    }

    session.revoked = true;
    await session.save();

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    })

    return res.status(200).json({ message: 'logged out successfully' })

  } catch (err) {
    console.error("Logout error:", err)
    return res.status(500).json({
      message: "error during logout",
      error: err.message
    })
  }
}

module.exports = { registerUser, refreshToken, logout, loginUser }
