var client = require('./EsClient.js');
var order_slop = 120;

/**
 * Module function for intelligent search.
 * @function
 * @alias success
 */
module.exports.search = function(searchData, callback) {
  console.log(searchData, 'elasticsearch')
  var array = searchData.split(" ");
  var clauses = [];
  for (var i = 0; i <= array.length - 1; i++) {
    var ob = 
    {
      "span_multi": {
        "match": {
          "fuzzy": {
            "content": {
              "fuzziness": 1,
              "value": array[i]
            }
          }
        }
      }
    }
    clauses.push(ob);
  }
  console.log(clauses);
  if(clauses.length == 1){
      client.search({
      index: 'casereport',
      type: '_doc',
      body: {
        query: {
          bool: {
            should: 
            {
              match: {
                "content": {
                  "query": searchData,
                  "fuzziness": 1,
                  "prefix_length": 1
                }
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
  }else{
    console.log("多个单词")
    client.search({
      index: 'casereport',
      type: '_doc',
      body: {
        "query": {
          "bool": {
            "should":[
              {
                "span_near" : {
                    "clauses" : clauses,
                    "slop" : order_slop,
                    "in_order" : true
                }
              }
              // "query": "immunohistochemical cytokeratins"
            ]
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
}

/**
 * Module function for simple multi-keyword search.
 * @function
 * @alias success
 */
module.exports.search_simple = function(searchData, callback) {
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

/**
 * Module function for delete index in ElasticSearch.
 * @function
 * @alias success
 */
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

/**
 * Module function for create index in ElasticSearch.
 * @function
 * @alias success
 */
module.exports.create = function(indexName, callback) {
  client.indices.create({
        "index": indexName,
        "body": {
          "settings": {
            "analysis": {
              "analyzer": {
                  "my_analyzer": {
                      "type":         "custom",
                      "tokenizer":    "my_tokenizer",
                      "filter":       ["asciifolding", "lowercase", "snowball", "stop", "stemmer"],
                      "stopwords":    "_english_"
                }
              },
              "filter": {
                "ngrams_filter": {
                    "type": "ngram",
                    "min_gram": 3,
                    "max_gram": 8
                },
              },
              "tokenizer": {
                "my_tokenizer": {
                  "type": "ngram",
                  "min_gram": 2,
                  "max_gram": 25,
                  "token_chars": [
                    "letter",
                    "digit"
                  ]
                }
              }
            }
          },
          "mappings" : {
            "_doc": {
              "properties": {
                  "id": {
                      "type": "text"
                  },
                  "content": {
                      "type": "text",
                      "analyzer": "my_analyzer"
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
