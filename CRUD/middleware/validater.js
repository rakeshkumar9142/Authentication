const joi = require('joi');

exports.signupSchema = joi.object({
    email: joi.string()
        .min(6)
        .max(60)
        .required()
        .email({ tlds: { allow: ['com', 'net'] } }),

    password: joi.string()
        .required()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+])[A-Za-z\\d!@#$%^&*()_+]{8,}$"))
        .messages({
            'string.pattern.base': 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
        })
});

exports.signinSchema = joi.object({
    email: joi.string()
        .min(6)
        .max(60)
        .required()
        .email({ tlds: { allow: ['com', 'net'] } }),

    password: joi.string()
        .required()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+])[A-Za-z\\d!@#$%^&*()_+]{8,}$"))
        .messages({
            'string.pattern.base': 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
        })
});
