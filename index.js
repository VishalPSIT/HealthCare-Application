const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const {connectDb} = require("./config/database.js");
dotenv.config({
    path: "./config/config.env"
})

const app = express();


app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))
app.use(cookieParser);
app.use(cors);

connectDb();

const port = process.env.PORT || 8080; 
app.listen(port,()=>{
    console.log(`server runnig at https://localhost/${port}`);
})


