const {response, request} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/user-model');
const {generateToken} = require('../../helpers/jwt');

const createUser = async (req = request, res = response) => {

    const {email, password} = req.body;
    try {

        const userFind = await User.findOne({email});

        if (userFind) {
            return res.status(400)
                .json({
                    ok: false,
                    mensaje: 'El correo ya se encuentra registrado',
                });
        }

        const newUser = new User(req.body);

        // encriptar
        const salt = await bcrypt.genSaltSync(10);
        newUser.password = await bcrypt.hash(password, salt);

        const userSaved = await newUser.save();

        // generar token
        const token = await generateToken(userSaved._id, userSaved.name);

        res.status(201)
            .json({
                ok: true,
                userSaved,
                token,
            });
    } catch (e) {
        console.error({
            mensaje: 'Error al guardar usuario',
            error: e,
        });
        res.status(500)
            .json({
                ok: false,
                mensaje: 'Error al guardar usuario',
            });
    }
}

const loginUser = async (req = request, res = response) => {

    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400)
                .json({
                    ok: false,
                    mensaje: 'No existe un usuario relacionado al correo',
                });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400)
                .json({
                    ok: false,
                    mensaje: 'Contraseña no coincide',
                });
        }

        // generar token
        const token = await generateToken(user._id, user.name);

        res.json({
            ok: true,
            user,
            token,
        });
    } catch (e) {
        console.error({
            mensaje: 'Error al loguear usuario',
            error: e,
        });
        res.status(500)
            .json({
                ok: false,
                mensaje: 'Error al loguear usuario',
            });
    }
}

const renewToken = async (req = request, res = response) => {
    try {
        const {user} = req;
        // generar token
        const token = await generateToken(user._id, user.name);
        res.status(200)
            .json({
                ok: true,
                user,
                token,
            });
    } catch (e) {
        console.error({
            mensaje: 'Error al renovar token',
            error: e,
        });
        res.status(500)
            .json({
                ok: false,
                mensaje: 'Error al renovar token',
            });
    }
}


module.exports = {
    createUser,
    loginUser,
    renewToken,
}