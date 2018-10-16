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


// Desactivar familia temporalmente
app.put('/families/state/:id', (req, res) => {
    let id = req.params.id;

    // Buscamos la familia por un id pasado por parametro
    Family.findById(id, (err, familiaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!familiaDB) {
            return res.status(400).json({
                ok: false,
                message: 'No existe una familia con ese ID'
            });
        }

        // Comprobamos el estado de la familia y lo cambiamos al estado contrario (true o false)
        if (familiaDB.state === true) {
            familiaDB.state = false;
        } else {
            familiaDB.state = true;
        }

        // Guardamos el nuevo estado de la familia
        familiaDB.save(function(err, res) {
            if (err) {
                throw new Error(err);
            }
        });

        res.status(200).json({
            ok: true,
            message: 'Familia actualizada ' + familiaDB.name + ' con éxito --> Estado: ' + familiaDB.state
        });
    })
});




module.exports = app;