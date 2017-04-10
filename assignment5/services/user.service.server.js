module.exports = function(app, model) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var bcrypt = require("bcrypt-nodejs");

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use('local',new LocalStrategy(localStrategy));
    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post  ('/api/login', passport.authenticate('local'), login);
    app.post  ('/api/logout', logout);
    app.post  ('/api/register', register);
    app.get ('/api/loggedin', loggedin);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));

    var userModel = require('../model/user/user.model.server');

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err){
                    res.sendStatus(400).send(err);
                });
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(function (user) {
                if(user){
                    return done(null, user);
                }else{
                    // var email = profile.emails[0].value;
                    var displayName = profile.displayName.split(" ");
                    var newFacebookUser = {
                        username : displayName[0],
                        firstName: displayName[0],
                        lastName: displayName[1],
                        facebook: {
                            id: profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newFacebookUser);
                }
            },
            function (err) {
                if(err){
                    return done(err);
                }
            })
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if(err){
                        return done(err);
                    }
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    app.get("/api/user", findUser);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", loggedInAndSelf, updateUser);
    app.post("/api/user", createUser);
    app.delete("/api/user/:uid", loggedInAndSelf, deleteUser);

    var userModel = model.userModel;

    function loggedInAndSelf(req, res, next) {
        var loggedIn = req.isAuthenticated();
        var userId = req.params.uid;
        var self = userId == req.user._id;
        if(self && loggedIn){
            next();
        }else{
            res.sendStatus(400).send("You are not the same person");
        }
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password){
            findUserByCredentials(req,res);
        }
        else if(username){
            findUserByUsername(req,res);
        }
        else{
            res.json(req.user);
        }
    }
    
    function findUserByUsername(req,res) {
        userModel
            .findUserByUsername(req.query.username)
            .then(function (user){
                res.send(user);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }

    function findUserByCredentials(req, res){
        var username = req.query['username'];
        var password = req.query['password'];
        userModel
            .findUserByCredentials(username, password)
            .then(function (user){
                res.send(user);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }

    function findUserById(req, res){
        var userId = req.params.uid;
        userModel
            .findUserById(userId)
            .then(function (user){
                res.send(user);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }

    function updateUser(req, res) {
        var userId = req.params.uid;
        var newUser = req.body;
        userModel
            .updateUser(userId, newUser)
            .then(function (status){
                res.send(status);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }
    
    function createUser(req,res) {
        var newUser = req.body;
        userModel
            .createUser(newUser)
            .then(function (user){
                res.send(user);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }

    function deleteUser(req,res) {
        var userId = req.params.uid;
        userModel
            .deleteUser(userId)
            .then(function (status){
                res.send(status);
            }, function(err){
                console.log(err);
                res.sendStatus(500).send(err);
            });
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }
        );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }
};