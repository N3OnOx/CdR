var express = require('express');
var Family = require('../models/family');
const app = express();

// Actualizar una construccion de una familia
app.put('/constructions/updateConstruction/:id/:construction', (req, res) => {
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

        let arrayConstructions = familiaDB.construction;

        for (var i = 0; i < arrayConstructions.length; i++) {
            if (arrayConstructions[i][0] == construction) {
                let nLevels = arrayConstructions[i][3].length;
                if (arrayConstructions[i][2] < nLevels) {
                    let actualLevel = arrayConstructions[i][2];
                    let valueConstruction = arrayConstructions[i][3][actualLevel].valor;
                    let arrayValueConstruction = valueConstruction.split(";");
                    let check = true;
                    for (var j = 0; j < arrayValueConstruction.length; j++) {
                        let objeto = arrayValueConstruction[j].split(":");
                        console.log('Yo tengo: ' + familiaDB.resources[getResourcePosition(objeto[0])][1] + ' de ' + objeto[0]);
                        console.log('Valor: ' + objeto[1] + ' de ' + objeto[0]);
                        if (objeto[1] > familiaDB.resources[getResourcePosition(objeto[0])][1]) {
                            check = false;
                            console.log(check);
                            break;
                        }
                        console.log(check);
                    }
                    if (check) {
                        for (var k = 0; k < arrayValueConstruction.length; k++) {
                            let objeto = arrayValueConstruction[k].split(":");
                            let position = getResourcePosition(objeto[0]);
                            let newValue = familiaDB.resources[position][1] - objeto[1];
                            console.log('Vas a restar ' + objeto[1] + ' a ' + objeto[0]);
                            familiaDB.updateOne({
                                    "$set": {
                                        ['resources.' + position + '.1']: newValue
                                    }
                                },
                                function(err, raw) {
                                    if (err) return handleError(err);
                                    //console.log('The raw response from Mongo was ', raw);
                                    console.log("Recurso " + objeto[0] + " actualizado con éxito");
                                }
                            );
                        }

                        let newLevelConstruction = arrayConstructions[i][2] + 1;

                        familiaDB.updateOne({
                                "$set": {
                                    ['construction.' + i + '.2']: newLevelConstruction
                                }
                            },
                            function(err, raw) {
                                if (err) return handleError(err);
                                //console.log('The raw response from Mongo was ', raw);
                            }
                        );
                        console.log('Familia actualizada con éxito');
                        res.status(200).json({
                            ok: true,
                            message: 'Familia actualizada con éxito'
                        });
                    } else {
                        res.status(500).json({
                            ok: false,
                            message: 'No tienes recursos suficientes'
                        });
                    }
                } else {
                    res.status(500).json({
                        ok: false,
                        message: 'Max level of construction'
                    });
                }
            }
        }
    });
});

function getResourcePosition(resource) {
    let resourcePosition;
    if (resource == "gold") {
        resourcePosition = 0;
    } else if (resource == "food") {
        resourcePosition = 1;
    } else if (resource == "wood") {
        resourcePosition = 2;
    } else if (resource == "steel") {
        resourcePosition = 3;
    } else if (resource == "iron") {
        resourcePosition = 4;
    } else if (resource == "stone") {
        resourcePosition = 5;
    } else if (resource == "wine") {
        resourcePosition = 6;
    } else if (resource == "poblation") {
        resourcePosition = 7;
    }
    return resourcePosition;
}


module.exports = app;