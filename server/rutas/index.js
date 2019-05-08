const express = require('express');
const app = express();


app.use(require('./cliente'));
//este es el nombre del archivo, no la url de la peticion

module.exports = app;