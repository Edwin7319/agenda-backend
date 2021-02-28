const {response, request} = require('express');

const createUser = (req = request, res = response) => {

    const user = req.body;

    res.json({
        ok: true,
        user,
    });
}

const loginUser = (req = request, res = response) => {
    res.json({
        ok: true,
    });
}

const renewToken = (req = request, res = response) => {
    res.json({
        ok: true,
    });
}


module.exports = {
    createUser,
    loginUser,
    renewToken,
}