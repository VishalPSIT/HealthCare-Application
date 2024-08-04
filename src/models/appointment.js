const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },

      schedule_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Schedule',
        required : true
      },

      token_no : {
        type : Number,
        required : true
      }

},{ timestamps: true })


const Appointment = new mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment