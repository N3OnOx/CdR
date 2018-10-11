var express = require('express');
var Family = require('../models/family');
const app = express();

// Actualizar una construccion de una familia 
app.put('/constructions/updateConstruction/:id/:construction', (req, res) => {
    // Id de la familia obtenido por parametro
    let id = req.params.id;
    // Construccion pasada por parametro para actualizar
    let construction = req.params.construction;

    // Buscamos una familia por el id pasado por parametro
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

        // Metemos todas las construcciones de un usuario en un array para trabajar con el.
        let arrayConstructions = familiaDB.construction;

        // Recorremos construccion por construccion hasta llegar a la construccion pasada por parametro
        for (var i = 0; i < arrayConstructions.length; i++) {

            // Comparamos si la construccion de la posicion i del array es la construccion pasada por parametro
            if (arrayConstructions[i][0] == construction) {

                // Recogemos en un array los niveles que tiene esa construccion
                let nLevels = arrayConstructions[i][3].length;

                // Comprobamos si el nivel de la construccion pasada por parametro es menor que el numero maximo de niveles de esa construccion
                if (arrayConstructions[i][2] < nLevels) {
                    // Si es menor, recogemos algunos valores en variables para trabajar mas comodamente

                    // Recogemos en una variable el nivel actual de la construccion pasada por parametro
                    let actualLevel = arrayConstructions[i][2];

                    // Recogemos en una variable el valor que costará avanzar la construccion al siguiente nivel
                    let valueConstruction = arrayConstructions[i][3][actualLevel + 1].valor;
                    // Dividimos el valor de los recursos que se necesitan para actualizar la construccion y metemos en un array cada recurso que se necesite.
                    let arrayValueConstruction = valueConstruction.split(";");

                    let check = true;
                    // Recorremos el array de valores de construccion
                    for (var j = 0; j < arrayValueConstruction.length; j++) {
                        // Por cada valor tenemos el nombre de un recurso y una cantidad de ese recurso, lo dividimos e introducimos ambos valores en un array de dos posiciones
                        let objeto = arrayValueConstruction[j].split(":");

                        console.log('Yo tengo: ' + familiaDB.resources[getResourcePosition(objeto[0])][1] + ' de ' + objeto[0]);
                        console.log('Valor: ' + objeto[1] + ' de ' + objeto[0]);
                        // Comprobamos si tenemos recursos suficientes para actualizar la construccion, comparamos si el valor de la actualizacion (objeto) es mayor que el valor que tenemos de ese recurso 
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