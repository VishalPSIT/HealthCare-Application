const mongoose = require('mongoose');

const pendingScheduleSchema = new mongoose.Schema({

  day : {
    type: String ,
    enum : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
  },

  start: {
    type: Number,
    required: true
  },

  end: {
    type: Number,
    required: true
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
  },

  appointmentLimit: {
    type: Number,
    required: true
  },

  fees : { type : Number, required : true },

  isUpdate : { type : Boolean, required : true, default : false },

  isAdd : {type : Boolean, required : true, default : false },

  isDelete : { type : Boolean, required : true, default : false },

  consentByDoctor : { type : Boolean, required : true, default : false },
  
  consentByHospital : { type : Boolean, required : true, default : false },

  scheduleId : { type : mongoose.Schema.Types.ObjectId, default : null }

});

const PendingSchedule = mongoose.model('PendingSchedule', pendingScheduleSchema);

module.exports = PendingSchedule;
