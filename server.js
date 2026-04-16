const app = require("./src/app");
const connectDatabase = require("./src/config/db")
const cors = require('cors');
app.use(cors({
origin : 'https://deploy-t1of.onrender.com',
credentials : true
}));
app.listen(3000,()=>{
    console.log("server running")
})
connectDatabase();
