var Family = require('../models/family');

//////////////////////////////////////////////////////
// Actualizar automaticamente los recursos por minuto
//////////////////////////////////////////////////////
setInterval(updateResourcesPerMinute, 60000);
updateResourcesPerMinute();

function updateResourcesPerMinute(req, res) {
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

                    //Si la familia está activa se procede a actualizar recursos
                    if (familiaDB.state === true) {
                        let arrayConstructions = familiaDB.construction;

                        //Recorremos una por una las construcciones de la familia seleccionada
                        for (var j = 0; j < arrayConstructions.length; j++) {
                            let levelConst = familiaDB.construction[j][2];
                            if (levelConst > 0 && arrayConstructions[j][4] == "resource") {
                                //console.log()
                                let construction = arrayConstructions[j][0];
                                let benefits = familiaDB.construction[j][3][familiaDB.construction[j][2]].benefits;
                                let value = familiaDB.resources[getResourcePosition(familiaDB.construction[j][1])][1] + benefits;
                                let resource = familiaDB.resources[getResourcePosition(familiaDB.construction[j][1])][0];
                                let resourcePosition = getResourcePosition(resource);
                                //console.log(construction)
                                //console.log(value)
                                //console.log(resource)
                                //console.log(resourcePosition);
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
                        };
                    }
                });
            });
        });
};

function getTimeConstruction(id) {
    var query = Family.findById(id);
    console.log(query);
    return query;
}

///////////////////////////////////////////////////
// Obtener la posicion de un recurso en el array
///////////////////////////////////////////////////
function getResourcePosition(resource) {
    let resourcePosition;
    if (resource == "food") {
        resourcePosition = 0;
    } else if (resource == "wine") {
        resourcePosition = 1;
    } else if (resource == "wood") {
        resourcePosition = 2;
    } else if (resource == "iron") {
        resourcePosition = 3;
    } else if (resource == "stone") {
        resourcePosition = 4;
    }
    return resourcePosition;
}

module.exports = {
    getResourcePosition,
    updateResourcesPerMinute,
    getTimeConstruction
};