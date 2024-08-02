// hospital.js
const mongoose = require('mongoose');
const addressSchema = require('./address');

const hospitalSchema = new mongoose.Schema({

  hospital_name: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true,
    enum: ['hospital', 'clinic']
  },

  beds_available: {
    type: Number,
    required: false,
    default : 0
  },

  address: {
    type: addressSchema,
    required: true
  }
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
