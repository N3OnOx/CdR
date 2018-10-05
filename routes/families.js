var express = require('express');
var User = require('../models/user');
var Family = require('../models/family');
var Construction = require('../models/construction');
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

// Actualizar recurso de una familia
app.put('/families/actualizarRecurso/:id/:resource/:quantity', (req, res) => {
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

        if (resource == 'iron') {
            familiaDB.resources.metals.iron = familiaDB.resources.metals.iron + quantity;
        } else if (resource == 'silver') {
            familiaDB.resources.metals.silver = familiaDB.resources.metals.silver + quantity;
        } else if (resource == 'steel') {
            familiaDB.resources.metals.steel = familiaDB.resources.metals.steel + quantity;
        } else if (resource == 'copper') {
            familiaDB.resources.metals.copper = familiaDB.resources.metals.copper + quantity;
        } else if (resource == 'gold') {
            familiaDB.resources.metals.gold = familiaDB.resources.metals.gold + quantity;
        } else if (resource == 'wood') {
            familiaDB.resources.wood = familiaDB.resources.wood + quantity;
        } else if (resource == 'leather') {
            familiaDB.resources.lether = familiaDB.resources.lether + quantity;
        } else if (resource == 'wine') {
            familiaDB.resources.wine = familiaDB.resources.wine + quantity;
        } else if (resource == 'food') {
            familiaDB.resources.food = familiaDB.resources.food + quantity;
        }

        familiaDB.save((err, familiaGuardada) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.status(200).json({
                ok: true,
                familia: familiaGuardada
            });
        });
    });
});

// Actualizar una construccion de una familia
app.put('/families/updateConstruction/:id/:construction', (req, res) => {
    let id = req.params.id;
    let construction = req.params.construction;

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

        if (construction == 'foundry') {
            if (familiaDB.constructions.foundry < 6) {
                familiaDB.constructions.foundry = familiaDB.constructions.foundry + 1;
            }
        }

        familiaDB.save((err, familiaGuardada) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.status(200).json({
                ok: true,
                familia: familiaGuardada
            });
        });
    });
});

function updateResourcesPerHour(req, res) {

    Family.find({})
        .populate('user')
        .exec((err, familias) => {
            familias.forEach(familia => {
                let id = familia._id;
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

                    var idcons = familiaDB.constructionID;
                    Construction.findById(idcons)
                        .populate('user')
                        .exec((err, constructionDB) => {
                            if (err) {
                                return res.status(400).json({
                                    ok: false,
                                    err
                                });
                            }

                            let nivelConst = familiaDB.construction.foundry;
                            if (nivelConst == 1) {
                                familiaDB.resources.food = familiaDB.resources.food + constructionDB.foundry.nivel.one.benefits;
                                familiaDB.save();
                                console.log('User: ' + familiaDB.name + ' ||--> Recurso obtenido: ' + familiaDB.resources.food + ' de comida.')
                            }
                        })
                });
            });
        });
};
setInterval(updateResourcesPerHour, 60000);
updateResourcesPerHour();



module.exports = app;