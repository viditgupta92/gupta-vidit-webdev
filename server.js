var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

var port = process.env.PORT || 3000;

var connectionString = 'mongodb://127.0.0.1:27017/test';
if(process.env.MLAB_USERNAME) {
    connectionString = process.env.MLAB_USERNAME + ":" +
        process.env.MLAB_PASSWORD + "@ds163698.mlab.com" +
        process.env.MLAB_HOST + ':63698' +
        process.env.MLAB_PORT + '/heroku_jxcv0hvw' +
        process.env.MLAB_APP_NAME;
}

app.listen(port);