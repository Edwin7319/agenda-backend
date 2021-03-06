const {request, response} = require('express');
const {validationResult} = require('express-validator');

// el next ejecuta el middleware
const validateFields = (req = request, res = response, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error({
            mensaje: 'Campos no validos',
            errors: errors.mapped(),
        });
        return res
            .status(400)
            .json({
                ok: false,
                errors: errors.mapped(),
            });

    }
    next();
}

module.exports = {
    validateFields,
}