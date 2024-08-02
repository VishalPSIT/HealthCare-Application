const mongoose = require('mongoose');
const Doctor = require('./doctor.js'); 
const Hospital = require('./hospital.js');

const scheduleSchema = new mongoose.Schema({

  day: {
    type: Date,
    required: true
  },

  start_time: {
    type: String,
    required: true
  },

  end_time: {
    type: String,
    required: true
  },

  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },

  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  
// Max appointment a doctor can take in given schedule.
  appointment_limit: {
    type: Number,
    required: true
  }

});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
