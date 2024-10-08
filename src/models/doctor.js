const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const doctorSchema = new mongoose.Schema({

    doctor_name: {
        type: String,
        required: true
    },

    specialty: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    phone: {
        type: String,
        required: true,
    },

    password : {
        type : String,
        required : true
    },

    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },

    UID : {
        type: String,
        required: true
    },

    qualification: {
        type: String,
        required: false
    },

    qualification_url : {
        type : String,
        required : false
    },

    experience: {
        type: Number,
        required: false
    },

    isProfileCompleted : {
        type : Boolean,
        required : true,
        default : false
    },

    isVerified : {
        type : Boolean,
        required : true,
        default : false
    },
    
    refreshToken : {
        type : String
    }

});


doctorSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  }
doctorSchema.methods.generateToken = async function () {
    const doctorAccessToken = jwt.sign({doctor : this}, process.env.ACCESS_TOKEN_SECRET, {expiresIn : process.env.ACCESS_TOKEN_EXPIRY})
    const doctorRefreshToken = jwt.sign({id : this._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn : process.env.REFRESH_TOKEN_EXPIRY})
    this.refreshToken = doctorRefreshToken
    await this.save()
    return {doctorAccessToken, doctorRefreshToken}
}

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
