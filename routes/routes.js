var express = require('express');
const app = express();


app.use(require('../routes/families'));


module.exports = app;