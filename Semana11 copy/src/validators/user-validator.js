

const joi = require('joi');

const userValidationSchema = joi.object({
    nome: joi
        .string()
        .alphanum()
        .min(3).message('O nome deve ter no mínimo 3 caracteres')
        .max(10).message('O nome deve ter no máximo 10 caracteres')
        .required(),

    email: joi
        .string()
        .email()
        .required(),

    senha: joi
        .string()
        // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')) // exemplo com exp regular
        .min(6).message('A senha deve ter no mínimo 3 caracteres')
        .max(10).message('A senha deve ter no máximo 10 caracteres')
        .required(),

    endereco: joi.object({
        rua: joi.string().required(),
        numero: joi.number().required(),
        bairro: joi.string().required(),
        cidade: joi.string().required(),
        estado: joi.string().required(),
        cep: joi.string().required(),
    })// .required()   // a omissao do required o torna opcional
})

module.exports = { userValidationSchema }