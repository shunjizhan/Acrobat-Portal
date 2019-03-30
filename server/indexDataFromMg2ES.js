const mongoose = require("mongoose");
const elasticsearch=require('elasticsearch');
const CaseReport = require("./models/mongo/case_report");

var client = new elasticsearch.Client( {
  hosts: [
    'https://search-acrobate-6oayszlzcxx2isu4cxe2sea3qy.us-east-2.es.amazonaws.com'
  ]
});

const dbRoute = "mongodb://shunhahaha:z132465798@ds123050.mlab.com:23050/hahaha";

mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

CaseReport.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    // console.log(data)
    var body = [];
    data.forEach(function(row, id) {
             body.push({ index:  { _index: 'casereport', _type: '_doc', _id: (id+1) } });
             body.push({ id: row._id, content: row.text});
        })  
    

    client.indices.create({
        "index": 'casereport',
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
    });
    console.log("create index");
    client.indices.putMapping({
       "index": "casereport",
       "type": "_doc",
       "body": {
          "_doc": {
              "properties": {
                  "id": {
                      "type": "text"
                  },
                  "content": {
                      "type": "text",
                      'analyzer': 'my_analyzer',
                      'search_analyzer': "simple"
                  }
              }
          }
       }
    }, function (err, response) {
      console.log(err);
       // from this point on, if you don't get any error, you may call bulk.
    });
    console.log("put mappings");

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


