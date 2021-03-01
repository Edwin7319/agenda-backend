const mongoose = require('mongoose');

const dbConecction = async () => {
    try {
        await mongoose
            .connect(
                process.env.DB_CONECCTION,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                }
            );
    } catch (e) {
        console.error({
            mensaje: 'Error al conectar a base de datos',
            error: e,
        });
        throw new Error('Error al inicializar conexion con base de datos');
    }
}

module.exports = {
    dbConecction
};