const mongoose  = require("mongoose");



exports.connectDb = async()=>{
    try{

        await mongoose.connect(process.env.DB_URL);
        console.log("db connected successfully");

    }
    catch(e){

        console.log("couldn't connect to database");

    }
}