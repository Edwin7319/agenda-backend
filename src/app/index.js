const express = require('express');
const {dbConecction} = require('./database/config');

require('dotenv').config();

// creando servidor
const app = express();

// conexion base de datos mongo
dbConecction()
    .then(
        () => console.log('Base de datos mongo conectada')
    )
    .catch(() => console.error('Error en base de datos'));

// directorio publico
app.use(express.static('public'));

// lectura de body
app.use(express.json());

// rutas
app.use('/auth', require('./modules/auth/routes/auth-route'));

// escuchar
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});