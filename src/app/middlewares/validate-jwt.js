const {request, response} = require('express');
const jwt = require('jsonwebtoken');

const validateJwt = (req = request, res = response, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401)
            .json({
                ok: false,
                mensaje: 'No existe token de autenticacion',
            });
    }

    try {

        const {userId, name} = jwt.verify(
            token,
            process.env.SECRET_JWT,
        );

        req.user = {_id: userId, name};

    } catch (e) {
        console.error({
            mensaje: 'Error al validar token',
            error: e,
        });
        return res.status(401)
            .json({
                ok: false,
                mensaje: 'Error al validar token',
            });
    }

    next();
}

module.exports = {
    validateJwt,
}