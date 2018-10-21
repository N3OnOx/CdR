let { getResourcePosition } = require('../utilities/utilities');
var express = require('express');
var Family = require('../models/family');
const app = express();

////////////////////////////////////
// Enviar recursos al cliente
////////////////////////////////////
app.get('/resources/getResources/:id', (req, res) => {
    let id = req.params.id;

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
                message: 'No existe la familia'
            });
        }
        let resources = [familiaDB.resources[0][1], familiaDB.resources[1][1], familiaDB.resources[2][1], familiaDB.resources[3][1], familiaDB.resources[4][1]];
        res.send(resources);
    });
});

//////////////////////////////////////
// Actualizar recurso de una familia
//////////////////////////////////////
app.put('/resources/updateResource/:id/:resource/:quantity', (req, res) => {
    let id = req.params.id;
    let resource = req.params.resource;
    let quantity = Number(req.params.quantity);

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
                err
            });
        }

        familiaDB.updateOne({
                "$set": {
                    ['resources.' + getResourcePosition(resource) + '.1']: quantity
                }
            },
            function(err, raw) {
                if (err) return handleError(err);
                //console.log('The raw response from Mongo was ', raw);
                res.json({
                    ok: true,
                    message: 'Recurso actualizado con éxito'
                })
            }
        );
    });
});


module.exports = app;