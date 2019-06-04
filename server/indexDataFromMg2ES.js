const mongoose = require("mongoose");
const elasticsearch=require('elasticsearch');
const CaseReport = require("./models/mongo/case_report");
const esclient = require("./config/esClient");
var client = new elasticsearch.Client( {
  hosts: [
    "https://search-acrobate-6oayszlzcxx2isu4cxe2sea3qy.us-east-2.es.amazonaws.com"
  ]
});
const dbRoute = require('./config/mg_database.js').url;

mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

CaseReport.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    console.log(data)
    var body = [];
    data.forEach(function(row, id) {
         body.push({ index:  { _index: 'casereport', _type: '_doc', _id: (id+1) } });
         body.push({ id: row._id, pmID: row.pmID, content: row.text});
    })  
    

    client.indices.create({
        "index": 'casereport',
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
              "tokenizer": {
                "my_tokenizer": {
                  "type": "ngram",
                  "min_gram": 3,
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
                      "analyzer": "my_analyzer",
                      "search_analyzer": "my_analyzer"
                  }
              }
            }
          }
       }
    }, function (err, response) {
      console.log(err);
    });
    console.log("create index");

    client.bulk({
        body: body
    }, function (err, resp) {
            if (err) 
            {
                console.log(err);
                return;
            }
            else 
            { 
                console.log("All Is Well");
            }
       });
});


