var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Family = require('../models/family');

// Register
router.get('/register', function(req, res) {
    res.render('register');
});

// Login
router.get('/login', function(req, res) {
    res.render('login');
});

// Register User
router.post('/register', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var family = req.body.family;

    // Validation
    req.checkBody('name', 'El nombre es necesario').notEmpty();
    req.checkBody('email', 'El email es necesario').notEmpty();
    req.checkBody('email', 'El email no es válido').isEmail();
    req.checkBody('username', 'El usuario es necesario').notEmpty();
    req.checkBody('password', 'La contraseña es requerida').notEmpty();
    req.checkBody('password2', 'Las contraseñas no coinciden').equals(req.body.password);
    req.checkBody('family', 'La familia es requerida').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        //checking for email and username are already taken
        User.findOne({
            username: {
                "$regex": "^" + username + "\\b",
                "$options": "i"
            }
        }, function(err, user) {
            User.findOne({
                email: {
                    "$regex": "^" + email + "\\b",
                    "$options": "i"
                }
            }, function(err, mail) {
                if (user || mail) {
                    res.render('register', {
                        user: user,
                        mail: mail
                    });
                } else {

                    var newUser = new User({
                        name: name,
                        email: email,
                        username: username,
                        password: password,
                    });

                    var newFamily = new Family({
                        user: newUser,
                        name: family,
                    });

                    newUser.family = newFamily._id;

                    Family.createFamily(newFamily, function(err, user) {
                        if (err) throw err;
                        console.log(newFamily);
                    });
                    User.createUser(newUser, function(err, user) {
                        if (err) throw err;
                    });

                    req.flash('success_msg', 'El usuario ha sido registrado y puede iniciar sesión');
                    res.redirect('/users/login');
                }
            });
        });
    }
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'Este usuario no está registrado' });
            }

            User.comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Contraseña incorrecta' });
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
    function(req, res) {
        res.redirect('/');
    });

router.get('/logout', function(req, res) {
    req.logout();

    //Podriamos lanzar un mensaje indicando que el usuario ha sido desconectado
    //req.flash('success_msg', 'Has sido desconectado');

    res.redirect('/users/login');
});

module.exports = router;