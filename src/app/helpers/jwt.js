const jwt = require('jsonwebtoken');

const generateToken = (userId, name) => {
    return new Promise(
        (resolve, reject) => {
            const payload = {userId, name}

            jwt.sign(
                payload,
                process.env.SECRET_JWT,
                {
                    expiresIn: '2h',
                },
                (err, token) => {
                    if(err) {
                        console.error({
                            mensaje: 'No se genero token ',
                            err,
                        });
                        reject(err);
                    }
                    resolve(token);
                }
                );
        }
    )
}

module.exports = {
    generateToken,
}