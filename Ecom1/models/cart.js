const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
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
    ]
}, {
    timestamps : true
})

module.exports = mongoose.model('Cart',CartSchema);