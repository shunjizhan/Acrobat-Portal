var elasticsearch=require('elasticsearch');

var client = new elasticsearch.Client( {
  hosts: [
    'https://search-acrobate-6oayszlzcxx2isu4cxe2sea3qy.us-east-2.es.amazonaws.com'
  ]
});

module.exports.search = function(searchData, callback) {
  console.log(searchData, 'elasticsearch')
  client.search({
    index: 'casereport',
    type: '_doc',
    body: {
      query: {
        bool: {
          should: {
            match: {
              "content": searchData
            }
          }
        }
      }
    }
  }).then(function (resp) {
    callback(resp.hits.hits);
  }, function (err) {
      callback(err.message)
      console.log(err.message);
  });
}

module.exports.delete = function(searchData, callback) {
  client.indices.delete({
      index: '_all'
  }, function(err, res) {

      if (err) {
          console.error(err.message);
      } else {
          console.log('Indexes have been deleted!');
      }
  }).then(function (resp) {
    callback(resp.hits.hits);
  }, function (err) {
      callback(err.message)
      console.log(err.message);
  });
}

module.exports.create = function(indexName, callback) {
  client.indices.create({
        "index": indexName,
        "body": {
          "settings": {
            "analysis": {
              "analyzer": {
                  "my_analyzer": {
                      "type":         "standard",
                      "tokenizer":    "standard",
                      "filter":       [ "asciifolding", "lowercase", "snowball", "stop"],
                      "max_token_length": 5,
                      "stopwords": "_english_"
                }
              }
            }
          }
       }
    }, function (err, response) {
      console.log(err);
    }).then(function (resp) {
    callback(resp.hits.hits);
  }, function (err) {
      callback(err.message)
      console.log(err.message);
  });
}
