const {check} = require('express-validator');

const CREATE_USER_VALIDATION = [
    check('name')
        .notEmpty().withMessage('El campo nombre es requerido'),
    check('email')
        .notEmpty().withMessage('El campo correo es requerido')
        .isEmail().withMessage('El correo enviado es requerido'),
    check('password')
        .isLength({min: 6}).withMessage('La contraseña debe etener al menos 6 caracteres')
        .notEmpty().withMessage('El campo contraseña es requerido'),
];

const LOGIN_USER_VALIDATION = [
    check('email')
        .notEmpty().withMessage('El campo correo es requerido')
        .isEmail().withMessage('El correo enviado es requerido'),
    check('password')
        .isLength({min: 6}).withMessage('La contraseña debe etener al menos 6 caracteres')
        .notEmpty().withMessage('El campo contraseña es requerido'),
];

module.exports = {
    CREATE_USER_VALIDATION,
    LOGIN_USER_VALIDATION,
}