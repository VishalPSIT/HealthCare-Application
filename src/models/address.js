// address.js
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    
  address: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  state: {
    type: String,
    required: true
  },

  zip_code: {
    type: String,
    required: true
  }
});

const Address = new mongoose.model('Address', addressSchema)
module.exports = Address;
