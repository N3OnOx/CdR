var express = require('express');
const app = express();


app.use(require('../routes/families'));
app.use(require('../routes/constructions'));
app.use(require('../routes/resources'));

module.exports = app;