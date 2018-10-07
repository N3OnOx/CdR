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
                let nLevels = arrayConstructions[i][2].length;
                if (arrayConstructions[i][1] < nLevels) {
                    let valorConstruction = arrayConstructions[i][1] + 1;
                    familiaDB.updateOne({
                            "$set": {
                                ['construction.' + i + '.1']: valorConstruction
                            }
                        },
                        function(err, raw) {
                            if (err) return handleError(err);
                            //console.log('The raw response from Mongo was ', raw);
                        }
                    );
                    res.status(200).json({
                        ok: true,
                        message: 'Familia actualizada con éxito'
                    });
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


module.exports = app;