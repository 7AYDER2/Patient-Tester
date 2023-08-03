const Joi = require('joi');

// You should change it after ali told you its correct table

function validateRegisterDoctor(obj) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        image: Joi.string(),
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
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        image: Joi.string(),
    })
    return schema.validate(obj);
}

module.exports = {
    validateRegisterDoctor,
    validateLoginDoctor,
    validateUpdateDoctor
}