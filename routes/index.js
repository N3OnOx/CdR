var express = require('express');
var router = express.Router();
var Family = require('../models/family')

// Homepage
router.get('/', ensureAuthenticated, function(req, res) {
    let id = req.user.family;
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
                message: 'No existe familia en la bbdd'
            });
        }
        res.render('index', {
            username: req.user.username,
            familia: familiaDB
        });
    });

});

// Web2 Page
router.get('/web2', ensureAuthenticated, function(req, res) {

    let id = req.user.family;
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
                message: 'No existe familia en la bbdd'
            });
        }
        let nivel = familiaDB.construction[0][3].length;
        res.render('web2', {
            tiempo: 10,
            familyId: req.user.family,
            maxLevel: nivel,
            level: familiaDB.construction[0][2]
        });
    });

});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = router;