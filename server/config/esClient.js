var elasticsearch=require('elasticsearch');
var config = require('./app.json');

var client = new elasticsearch.Client( {
  hosts: [
    config.elasticSearchHost
  ]
});

module.exports = client;