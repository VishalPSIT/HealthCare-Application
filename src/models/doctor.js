const mongoose = require('mongoose');

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
        required: false
    },

    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
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
    }

});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
