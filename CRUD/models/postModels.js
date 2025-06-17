const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title : {
        type : String,
        required : [true,"Title is Required"],
        trim : true,
    },
    discription : {
        type : String,
        required : [true,"Discription is Required"],
        trim : true,
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    }
},{
    timestamps : true,
})

module.exports = mongoose.model("Post",postSchema);