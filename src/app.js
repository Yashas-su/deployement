const express = require("express");
const academicRoute = require("./routes/academic.routes")
const userRoute = require('./routes/user.route')
const profileRoute = require("./routes/profile.route")
const authRoute = require("./routes/auth.route")
const walletRoute = require("./routes/wallet.route")
const transactionRoute = require("./routes/transaction.route")
const groupRoute = require("./routes/group.route")
const splitRoute = require("./routes/split.routes")
const subjectRoute = require("./routes/subject.routes")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "https://deploy-t1of.onrender.com",
    credentials: true, 
}));

app.use(express.json());
app.use(cookieParser());

// Health check — fixes "Cannot GET /"
app.get("/", (req, res) => res.json({ status: "API is running ✅" }));

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/profile', profileRoute)
app.use('/api/wallet', walletRoute)
app.use('/api/transaction', transactionRoute)
app.use('/api/group', groupRoute)
app.use('/api/split', splitRoute)
app.use("/api/academic", academicRoute)
app.use("/api/subject", subjectRoute)

module.exports = app;
