require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const publicPath = path.resolve(__dirname, '../public');


const app = express();

const bodyParser = require('body-parser');

// Public path
app.use(express.static(publicPath));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// Configuración global de rutas
app.use(require('./routes/index'));



mongoose.connect(process.env.URLDB, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});



app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});