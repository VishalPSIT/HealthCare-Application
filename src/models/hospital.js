const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({

  hospital_name: {
    type: String,
    required: true
  },

  email : {
    type : String,
    required : true,
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
    ref: 'Address',
    required: true
  },

  password : {
    type : String,
    required : true
}

});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
