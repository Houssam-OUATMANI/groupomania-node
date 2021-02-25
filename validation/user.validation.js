const Joi = require('joi')


function  userValidation(body) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(25),
        email : Joi.string().email().required(),
        password : Joi.string().min(8).max(25).required()
    })

    return schema.validate(body)
}


module.exports = userValidation