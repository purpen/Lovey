
/**
 * Main application entry file.
 */

var express = require('express')
  , fs = require('fs')
  , passport = require('passport');

// Load configurations
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , auth = require('./lib/middlewares/authorization')
  , mongoose = require('mongoose');

// Bootstrap db connection
mongoose.connect(config.db);


// Bootstrap models
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function (file) {
	require(models_path + '/' + file);
});

// Bootstrap passport config
require('./config/passport')(passport, config);

var app = express();
// express settings
require('./config/express')(app, config, passport)

// Bootstrap routes
require('./config/routes')(app, passport, auth)

// Start the app by listening on <port>
var port = process.env.PORT || 3000;
app.listen(port)

console.log('Express app started on port ' + port);
