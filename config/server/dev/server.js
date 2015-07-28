var express = require('express')
var http = require('http')
var path = require('path')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var expressSession = require('express-session')
var passport = require('passport')
var passportLocal = require('passport-local')
var appRoot = require('app-root-path')
var app = express()


global.appRoot = path.resolve(__dirname);

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(expressSession({ 
	 secret: process.env.SESSION_SECRET || 'secret',
	 resave: false,
	 saveUninitialized: false

}));

// app.use(passport, initialize());
// app.use(passport, session());


app.use(express.static(path.join(appRoot + '/public')));

app.get('/', function (req, res) {
 	res.sendfile(appRoot +'/app/index.html');
})


app.listen(3000)

module.exports = app;