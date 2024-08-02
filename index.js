const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const {connectDb} = require("./config/database.js");

//configuring env
dotenv.config({
    path: "./config/config.env"
})

// constructing express app
const app = express();

// middlewares.
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))
app.use(cookieParser);
app.use(cors);

//connecting database.
connectDb();

// geting port
const port = process.env.PORT || 8080; 

// express app listening at 3000 || 8080 port.
app.listen(port,()=>{
    console.log(`server runnig at https://localhost/${port}`);
})


