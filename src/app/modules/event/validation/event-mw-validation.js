const {check} = require('express-validator');
const {isValidDate} = require('./../../../helpers/validate-date');

const CREATE_EVENT_VALIDATION = [
    check('title')
        .notEmpty().withMessage('El campo nombre es requerido'),
    check('startDate')
        .notEmpty().withMessage('El fecha de inicio es requerido')
        .custom(isValidDate).withMessage('La fecha de inicio no es valida'),
    check('endDate')
        .not().isEmpty().withMessage('El fecha de fin es requerido')
        .custom(isValidDate).withMessage('La fecha de fin no es valida'),
    check('notes')
        .optional({checkFalsy: true})
        .isLength({min: 3, max: 255}).withMessage('El campo notes debe tener de 3 a 255 caracteres'),
];

module.exports = {
    CREATE_EVENT_VALIDATION,
}