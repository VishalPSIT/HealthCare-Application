const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique : true
    },

    dateOfBirth:{
        type:Date,
        required:true
    },

    gender:{
        type:String,
        enum: ["M" , "F" , "NB" , "O"],
        required:true
    },

    phone : {
        type : String,
        required : false
    },
    
    refreshToken : {
        type : String
    }


})

userSchema.methods.generateToken = async function () {
    const userAccessToken = jwt.sign({user : this}, process.env.ACCESS_TOKEN_SECRET, {expiresIn : process.env.ACCESS_TOKEN_EXPIRY})
    const userRefreshToken = jwt.sign({id : this._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn : process.env.REFRESH_TOKEN_EXPIRY})
    this.refreshToken = userRefreshToken
    await this.save()
    return {userAccessToken, userRefreshToken}
  }

const User = mongoose.model('User', userSchema);

module.exports = User;