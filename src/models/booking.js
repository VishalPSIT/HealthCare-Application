const mongoose = require('mongoose');
const Hospital = require('./hospital.js'); 
const User = require('./user.js'); 

const bookingSchema = new mongoose.Schema({
  day: {
    type: Date,
    required: true
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
