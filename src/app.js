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
    origin: "http://localhost:5173", // frontend URL
    credentials: true, 
  }))

app.use(express.json());
app.use(cookieParser())

app.use('/api/auth',authRoute) //done
app.use('/api/user',userRoute) //done
app.use('/api/profile',profileRoute) //done
app.use('/api/wallet',walletRoute) //done
app.use('/api/transaction',transactionRoute) //done
app.use('/api/group',groupRoute) //done
app.use('/api/split',splitRoute) //needs receiver while paying
app.use("/api/academic",academicRoute)
app.use("/api/subject",subjectRoute)
// app.use('/api/expense',expenseRoute)
// app.use('/api/insight',insightRoute)
// app.use('/api/parent',parentRoute)


module.exports = app