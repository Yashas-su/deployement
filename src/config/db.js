const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()
async function connectDatabase(){
    try{
        await mongoose.connect(process.env.db_url);
        console.log("connected to data base !")
    }catch(err){
        console.log(err);
    }
}
module.exports = connectDatabase