const {check} = require('express-validator');

const CREATE_MIDDLEWARE = [
    check('name')
        .not().isEmpty().withMessage('El campo nombre es requerido'),
    check('email')
        .not().isEmpty().withMessage('El campo correo es requerido')
        .isEmail().withMessage('El correo enviado es requerido'),
    check('password')
        .isLength({min: 6}).withMessage('La contraseña debe etener al menos 6 caracteres')
        .not().isEmpty().withMessage('El campo contraseña es requerido'),
];

const LOGIN_MIDDLEWARE = [
    check('email')
        .not().isEmpty().withMessage('El campo correo es requerido')
        .isEmail().withMessage('El correo enviado es requerido'),
    check('password')
        .isLength({min: 6}).withMessage('La contraseña debe etener al menos 6 caracteres')
        .not().isEmpty().withMessage('El campo contraseña es requerido'),
];

module.exports = {
    CREATE_MIDDLEWARE,
    LOGIN_MIDDLEWARE,
}