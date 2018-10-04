var express = require('express');
var Family = require('../models/family');
var Construction = require('../models/construction');
const app = express();


// Actualizar familia
app.put('/families/updateConstruction/:id/:construction', (req, res) => {
    let id = req.params.id;
    let construction = req.params.construction;

    Construction.findById(id, (err, familiaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!familiaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (construction == 'iron') {
            familiaDB.resources.metals.iron = familiaDB.resources.metals.iron + quantity;
        }

        familiaDB.save((err, familiaGuardada) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.send("WHEEE");
        });


    });

});


module.exports = app;