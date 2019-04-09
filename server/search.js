var elasticsearch=require('elasticsearch');

var client = new elasticsearch.Client( {
  hosts: [
    'https://search-acrobate-6oayszlzcxx2isu4cxe2sea3qy.us-east-2.es.amazonaws.com'
  ]
});

module.exports.search = function(searchData, callback) {
  console.log(searchData, 'elasticsearch')
  var array = searchData.split(" ");
  var clauses = [];
  for (var i = 0; i <= array.length - 1; i++) {
    var ob = {
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
    console.log(array[i],'loop里');
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
                    "slop" : 120,
                    "in_order" : true
                }
              }
              // ,{
              //   "match": {
              //     "content": {
              //       "query": "immunohistochemical cytokeratins",
              //       "analyzer": "standard",
              //       "minimum_should_match": "99%"
              //     }
              //   }
              // }
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

module.exports.search2 = function(searchData, callback) {
  console.log(searchData, 'elasticsearch')
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
                      "max_token_length": 128,
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
