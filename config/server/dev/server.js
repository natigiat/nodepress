var express = require('express')
var http = require('http')
var path = require('path')
var appRoot = require('app-root-path')
var app = express()


global.appRoot = path.resolve(__dirname);


app.use(express.static(path.join(appRoot + '/public')));

app.get('/', function (req, res) {
 	res.sendfile(appRoot +'/app/index.html');
})


app.listen(3000)

module.exports = app;