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
        required: true,
    },

    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },

    qualification: {
        type: String,
        required: true
    },

    qualification_url : {
        type : String,
        required : true
    },

    experience: {
        type: Number,
        required: true
    }

});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
