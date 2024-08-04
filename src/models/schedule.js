const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({

  is_verified : {
    type : Boolean,
    required : true,
    default: false
  },

  Status_message :{
    type : String,
    required : true,
    enum : ['Pending Verification','Declined by Doctor','Verified'],
    default : 'Pending'
  },

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
  },

  fees : {
    type : Number,
    required : true
  }

});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
