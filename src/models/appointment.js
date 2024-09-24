const mongoose = require("mongoose")
const Schedule = require("./schedule")

const appointmentSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },

      date : { 
        type : Date, required : true
      },

      start: {
        type: Number,
        required: true
      },
    
      end: {
        type: Number,
        required: true
      },

      token_no : {
        type : Number,
        required : true
      },

      doctor: {
        doctorName : { type : String, required : true },
        speciality : { type : String, required : true },
        gender : { type : String, required : true },
        UID : { type : String, required : true },
        qualification : { type : String, required : true },
        experience : { type : Number, default : 0 }
      },

      hospital: {
        hospitalName : { type : String, required : true },
        type: { type: String, required: true, enum: ['hospital', 'clinic'] },
        address: { 
          addressLine1 : { type : String, required : true }, 
          city : { type : String, required : true }, 
          state : { type : String, required : true }, 
          zipCode : { type : String, required : true } 
        },
      }

},{ timestamps: true })


const Appointment = new mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment