const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique : true
    },

    dateOfBirth:{
        type:Date,
        required:true
    },

    gender:{
        type:String,
        enum: [M , F , NB , O],
        required:true
    },

    phone : {
        type : String,
        required : false
    }

})
const User = mongoose.model('User', userSchema);

module.exports = User;