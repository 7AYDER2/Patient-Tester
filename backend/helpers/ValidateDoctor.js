const joi = require('joi');

// You should change it after ali told you its correct table

function validateRegisterDoctor(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required(),
        username: Joi.string().trim().min(2).max(200).required(),
        password: Joi.string().trim().min(6).required(),
        isAdmin: Joi.bool(),
    });
    return schema.validate(obj);
}

// Validate login User 
function validateLoginDoctor(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required(),
        password:Joi.string().trim().min(6).require(),
    })
    return schema.validate(obj);
}

// Validate update User 
function validateUpdateDoctor(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required(),
        username:Joi.string().trim().min(2).max(200),
        password:Joi.string().trim().min(6),
        isAdmin:Joi.bool(),
    })
    return schema.validate(obj);
}

module.exports = {
    validateRegisterDoctor,
    validateLoginDoctor,
    validateUpdateDoctor
}