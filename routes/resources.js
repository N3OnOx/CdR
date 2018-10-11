var express = require('express');
var Family = require('../models/family');
const app = express();

// Actualizar recurso de una familia
app.put('/resources/actualizarRecurso/:id/:resource/:quantity', (req, res) => {
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

function updateResourcesPerMinute(req, res) {
    // Buscamos todas las familias del servidor
    Family.find({})
        .populate('user')
        .exec((err, familias) => {
            // Recorremos familia por familia
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

                    // Comprobamos que la familia está activa
                    if (familiaDB.state === true) {
                        // Introducimos todas las construcciones de esa familia en un array
                        let arrayConstructions = familiaDB.construction;

                        // Recorremos todas las construcciones de esa familia
                        for (var j = 0; j < arrayConstructions.length; j++) {

                            // Obtenemos el numero de niveles que tiene una construcción
                            let nLevels = arrayConstructions[j][3].length;

                            // Obtenemos el nivel actual de la construcción
                            let levelConst = familiaDB.construction[j][2];

                            // Recorremos todos los niveles de esa construcción en busca del nivel actual de esa construcción
                            for (var i = 1; i <= nLevels; i++) {

                                // Comparamos buscando el nivel de la construcción
                                if (levelConst == i) {
                                    // Cuando asociamos nuestro nivel de construccion con un nivel posible de esa construcción
                                    // entonces declaramos las siguientes variables para trabajar cómodamente

                                    // Recogemos en una variable el nombre de la construcción 
                                    let construction = arrayConstructions[j][0];
                                    // Recogemos en una variable el beneficio que nos está aportando esa construcción en función en el nivel que esté
                                    let benefits = familiaDB.construction[j][3][i - 1].benefits;

                                    // Recogemos en una variable el valor que tendremos del recurso una vez actualicemos su valor más el beneficio 
                                    let value = familiaDB.resources[getResourcePosition(familiaDB.construction[j][1])][1] + benefits;

                                    // Recogemos en una variable el nombre del recurso que vamos a actualizar
                                    let resource = familiaDB.resources[getResourcePosition(familiaDB.construction[j][1])][0];

                                    // Recogemos en una variable la posicion que se encuentra el recurso a actualizar en el array
                                    let resourcePosition = getResourcePosition(resource);
                                    //console.log(construction)
                                    //console.log(value)
                                    //console.log(resource)
                                    //console.log(resourcePosition);

                                    // Actualizamos el recurso de la familia introduciendo la posicion del recurso en el array y el valor actualizado.
                                    familiaDB.updateOne({
                                            "$set": {
                                                ['resources.' + resourcePosition + '.1']: value
                                            }
                                        },
                                        function(err, raw) {
                                            if (err) {
                                                console.log("Error")
                                            };
                                            //console.log('The raw response from Mongo was ', raw);
                                            console.log('Family: ' + familiaDB.name + '---> ' + resource + ': ' + value + '  ||--> ' + construction.toUpperCase() + ' está produciendo ' + benefits + ' de ' + resource + ' al minuto.')
                                        }
                                    );
                                    // El siguiente console log es para comprobar uno por uno la actualizacion de recursos en caso de que falle
                                    //console.log('User:' + familiaDB.user + ' Family: ' + familiaDB.name + '---> ' + resource + ': ' + value + '  ||--> ' + construction.toUpperCase() + ' está produciendo ' + benefits + ' de ' + resource + ' al minuto.')
                                }
                            }
                        };
                    }
                });
            });
        });
};
setInterval(updateResourcesPerMinute, 60000);
updateResourcesPerMinute();

// Traductor de recursos a numero de posicion en array de recursos
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