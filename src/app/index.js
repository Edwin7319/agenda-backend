const express = require('express');


require('dotenv').config();

// creando servidor
const app = express();

// directorio publico
app.use(express.static('public'));

// lectura de body
app.use(express.json());

// rutas
app.use('/auth', require('./modules/auth/routes/auth-route'));

// escuchar
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});