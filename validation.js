const Joi = require("@hapi/joi");

//check whether user fulfil all the registeration conditions
const registerValidation = (data)=>{
    const schema =Joi.object({
        name : Joi.string().min(6).required(),
        email : Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

//check whether user fulfil all the login conditions
const loginValidation = (data)=>{
    const schema =Joi.object({
        name : Joi.string().min(6),
        email : Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
