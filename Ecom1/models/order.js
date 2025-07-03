const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId : {
        typ : String,
        required : true,
        unique : true
    },
    products : [
        {
            type : String,
        },
        {
            quantity : {
                type : Number,
                default : 1,
            }
        }
    ],
    amount : {
        type : Number,
        required : true
    },
    address  :{
        type  : String,
        required : true
    },
    status : {
      type : String,
      default : 'Pending'
    }
}, {
    timestamps : true
})

module.exports = mongoose.model('Order',orderSchema);