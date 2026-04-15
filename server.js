const app = require("./src/app");
const connectDatabase = require("./src/config/db")
const cors = require('cors');
app.use(cors({
origin : 'http://localhost:3000',
credentials : true
}));
app.listen(3000,()=>{
    console.log("server running")
})
connectDatabase();