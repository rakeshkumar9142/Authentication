const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email : {
       type : String,
       unique : true,
       required : [true, 'Email is Required']
    },
    password : {
       type : String,
       required : [true,'Password is required']
    }
},
 {
    timestamps : true
 }
)

module.exports = mongoose.model('User',UserSchema);