var express = require('express');
var User = require('../models/user');
var Family = require('../models/family');
const app = express();

// Obtener todas las familias
app.get('/families', (req, res) => {
    Family.find({})
        .populate('user')
        .exec((err, familias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                familias
            });
        })
});
module.exports = app;