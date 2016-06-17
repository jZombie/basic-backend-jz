var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var cors         = require('cors');
//var config       = require('../config/appConfig');


var index        = require('./routes/index');
var helloWorld   = require('./routes/helloWorld');
var app          = express();



/*app.get('/', function (req, res) {
  res.send('Hello World!');
});*/

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/', helloWorld);

require('express-custom-response')(__dirname + '/responses');


app.listen(3000, function () {
  console.log('Batmin listening on port 3000!');
});

module.exports = app;
