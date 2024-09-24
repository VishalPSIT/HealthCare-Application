const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Address = require('./address.js')
const jwt = require('jsonwebtoken')


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
},
    
refreshToken : {
    type : String
}

});

hospitalSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

hospitalSchema.methods.generateToken = async function () {
  const hospitalAccessToken = jwt.sign({hospital : this}, process.env.ACCESS_TOKEN_SECRET, {expiresIn : process.env.ACCESS_TOKEN_EXPIRY})
  const hospitalRefreshToken = jwt.sign({id : this._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn : process.env.REFRESH_TOKEN_EXPIRY})
  this.refreshToken = hospitalRefreshToken
  await this.save()
  return {hospitalAccessToken, hospitalRefreshToken}
}

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
