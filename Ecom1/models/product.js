const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title : {
        type : String,
        required : true,
        unique : true
    },
    discription : {
        type : String,
        required : true,
    },
    img : {
        type : String,
        required : true
    },
    category : {
       type : Array
    }, 
    size : {
        type : String
    },
    color  : {
      type : String
    },
    prize : {
       type : Number,
       required : true
    }
}, {
    timestamps : true
})

module.exports = mongoose.model('Product',ProductSchema);