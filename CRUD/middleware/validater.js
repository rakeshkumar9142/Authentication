const joi = require('joi');

exports.signupSchema = joi.object({
    email : joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
        tlds : {allow : ['com','net']},
    }),
    password : joi.string()
    .required()
    .pattern(new RegExp(`/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i`))
})