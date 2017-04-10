var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    // secret: process.env.SESSION_SECRET
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

// require("./mongo/movies.js")(app);

// require("./assignment/model/models.server.js");
require("./assignment5/model/models.server.js");

// var assignment = require("./assignment/app.js");
var assignment = require("./assignment5/app.js");
assignment(app);

var port = process.env.PORT || 3000;

app.listen(port);