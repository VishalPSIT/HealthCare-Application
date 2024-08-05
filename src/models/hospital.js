const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Address = require('./address.js')

const hospitalSchema = new mongoose.Schema({

  hospital_name: {
    type: String,
    required: true
  },

  email : {
    type : String,
    required : true
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
    address_id : mongoose.Schema.Types.ObjectId,
    // ref: 'Address',
  },

  password : {
    type : String,
    required : true
}

});

hospitalSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
