var config = require('./app.json');
var host = config.mongoHost;
var port = config.mongoPort;
var username = config.mongoUsername;
var password = config.mongoPassword;

module.exports = {

    'url' : 'mongodb://'+username+':'+password+'@'+ host + ':' + port  + '/hahaha' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot

};
